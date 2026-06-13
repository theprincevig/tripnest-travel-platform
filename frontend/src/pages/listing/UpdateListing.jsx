import { useEffect, useState } from "react";
import { initialListingData } from "../../constants/initialData";
import { useListingStore } from "../../stores/useListingStore";
import { Loader, LoaderCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hasErrors, validateListing } from "../../errors/newErrors";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ListingCategory from "../../components/inputs/ListingCategory";
import ImageChanger from "../../components/listings/ImageChanger";
import InputChanger from "../../components/listings/InputChanger";

export default function UpdateListing() {
    const {
        getListing,
        singleListing,
        updateListing,
        clearSingleListing,
        updateListingLoading
    } = useListingStore();

    const [listingData, setListingData] = useState(initialListingData);
    const [errors, setErrors] = useState(initialListingData);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const { listingId } = useParams();

    const activeCurrency = useActiveCurrency();
    const navigate = useNavigate();

    useEffect(() => {
        getListing(listingId);

        return () => clearSingleListing();
    }, [listingId, getListing, clearSingleListing]);

    useEffect(() => {
        if (!singleListing) return;

        setListingData({
            title: singleListing.title,
            description: singleListing.description,
            price: singleListing.price,
            location: singleListing.location,
            country: singleListing.country,
            category: singleListing.category
        });

        if (singleListing.image) {
            setPreview(singleListing.image);
        }
    }, [singleListing]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleChange = (field) => (e) => {
        const value = field === "price"
            ? e.target.value === "" ? "" : Number(e.target.value)
            : e.target.value;

        setListingData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    }

    const handleImageChange = async (e) => {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateListing({ 
            ...listingData,
            image: image || preview 
        });
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            await updateListing(listingId, { ...listingData, image });
            navigate(`/listings/${listingId}`);
            toast.success("Listing updated successfully!");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to update listing");
        }
    };

    return (
        <DashboardLayout>
            <div className="flex justify-center">
                {updateListingLoading ? (
                    <div className="flex items-center justify-center">
                        <LoaderCircle size={35} className="animate-spin" />
                    </div>
                ) : (
                    <form 
                        onSubmit={handleSubmit}
                        className="w-full max-w-5xl space-y-8"
                    >
                        <InputChanger 
                            isTextArea={false}
                            value={listingData.title}
                            placeholder="Give your title"
                            onChange={handleChange("title")}
                            error={errors.title}
                            style="w-full max-w-3xl text-3xl font-[Ramabhadra]"
                        />

                        <ImageChanger 
                            preview={preview}
                            error={errors.image}
                            onUpload={handleImageChange}
                        />

                        <div className="flex flex-col gap-10">
                            <InputChanger 
                                isTextArea={true}
                                value={listingData.description}
                                placeholder="Change your description here..."
                                onChange={handleChange("description")}
                                error={errors.description}
                                rows={4}
                                style="w-full max-w-3xl text-2xl"
                            />

                            <InputChanger 
                                isTextArea={false}
                                type="Number"
                                value={listingData.price}
                                placeholder="Change your listing's price"
                                onChange={handleChange("price")}
                                error={errors.price}
                                symbol={activeCurrency.details.symbol}
                                style="relative w-full max-w-md flex items-center gap-2 text-xl"
                            />

                            <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputChanger 
                                    isTextArea={false}
                                    type="text"
                                    value={listingData.location}
                                    placeholder="Add your listing's location"
                                    onChange={handleChange("location")}
                                    error={errors.location}
                                    style="w-full text-xl"
                                />

                                <InputChanger 
                                    isTextArea={false}
                                    type="text"
                                    value={listingData.country}
                                    placeholder="Your country"
                                    onChange={handleChange("country")}
                                    error={errors.country}
                                    style="w-full text-xl"
                                />
                            </div>
                        </div>

                        <ListingCategory 
                            label="Change category" 
                            value={listingData.category} 
                            onChange={(value) => setListingData(prev => ({ ...prev, category: value }))}
                            error={errors.category}
                        />

                        <div className="flex items-center justify-center gap-5 p-2 mt-8">
                            <Link 
                                to={`/listings/${listingId}`}
                                type="submit"
                                className="default-btn"
                            >
                                Back
                            </Link>

                            <button 
                                type="submit"
                                className="primary-btn"
                                disabled={updateListingLoading}
                            >
                                { updateListingLoading ? <Loader size={20} className="animate-spin mx-auto" /> : "Submit" }
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </DashboardLayout>
    );
}