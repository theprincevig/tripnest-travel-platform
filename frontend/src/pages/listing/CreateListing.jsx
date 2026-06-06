import { useEffect, useState } from "react";
import { useListingStore } from "../../stores/useListingStore";
import { useNavigate } from "react-router-dom";
import { CloudUpload, Loader } from "lucide-react";
import { hasErrors, validateListing } from "../../errors/newErrors";
import { initialListingData } from "../../constants/initialData";
import toast from "react-hot-toast";

import ListingInput from "../../components/inputs/ListingInput";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ListingCategory from "../../components/inputs/ListingCategory";
import ListingImage from "../../components/inputs/ListingImage";

export default function CreateListing() {
    const { createListing, createListingLoading } = useListingStore();

    const [formData, setFormData] = useState(initialListingData);
    const [errors, setErrors] = useState(initialListingData);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate type
        if (!file.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return;
        }

        // Validate size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5MB");
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setImage(file);
        setPreview(imageUrl);
    }

    const handleChange = (field) => (e) => {
        const value = field === "price"
            ? e.target.value === "" ? "" : Number(e.target.value)
            : e.target.value;

        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateListing({ ...formData, image });
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            await createListing({ ...formData, image});

            setFormData(initialListingData);
            setImage(null);
            setPreview("");

            toast.success("Listing created successfully!");
            navigate("/");
        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to create listing");
        }
    }

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col items-center p-4">
                <form 
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl text-center"
                >
                    <ListingInput 
                        label="Title" 
                        type="text" 
                        value={formData.title}
                        placeholder="Give your title" 
                        onChange={handleChange("title")}
                        error={errors.title}
                    />

                    <ListingInput 
                        label="Description" 
                        type="text" 
                        value={formData.description}
                        placeholder="Enter meaning-full description" 
                        onChange={handleChange("description")}
                        error={errors.description}
                    />

                    <ListingImage 
                        label="Image" 
                        image={image} 
                        setImage={setImage} 
                        preview={preview} 
                        setPreview={setPreview} 
                        error={errors.image} 
                        onUpload={handleImageUpload}
                    />

                    <ListingInput 
                        label="Price" 
                        type="number" 
                        value={formData.price}
                        placeholder="Set your price" 
                        onChange={handleChange("price")}
                        error={errors.price}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <ListingInput 
                            label="Location" 
                            type="text" 
                            value={formData.location}
                            placeholder="Your location" 
                            onChange={handleChange("location")}
                            error={errors.location}
                        />

                        <ListingInput 
                            label="Country" 
                            type="text" 
                            value={formData.country}
                            placeholder="Your country" 
                            onChange={handleChange("country")}
                            error={errors.country}
                        />
                    </div>

                    <ListingCategory 
                        label="Category" 
                        value={formData.category} 
                        onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        error={errors.category}
                    />

                    <button 
                        type="submit"
                        className="primary-btn"
                        disabled={createListingLoading}
                    >
                        { createListingLoading ? <Loader size={20} className="animate-spin mx-auto" /> : "Submit" }
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}