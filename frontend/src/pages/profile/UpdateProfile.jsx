import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { hasErrors, validateProfile } from "../../errors/newErrors";
import { initialProfileData, initialProfileErrors } from "../../constants/initialData";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ProfileCustomization from "../../components/profile/ProfileCustomization";
import UsernameEditor from "../../components/profile/UsernameEditor";
import ProfilePictureUploader from "../../components/profile/ProfilePictureUploader";
import ProfileAboutSection from "../../components/profile/ProfileAboutSection";

export default function UpdateProfile() {
    const { 
        authUser,
        updateProfile,
        isUpdatingProfile 
    } = useAuthStore();

    const [profileData, setProfileData] = useState(initialProfileData);
    const [errors, setErrors] = useState(initialProfileErrors);
    const [picture, setPicture] = useState(null);
    const [preview, setPreview] = useState("");
    const [pictureRemoved, setPictureRemoved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) return;

        setProfileData({
            username: authUser.username,
            fullName: {
                firstName: authUser.fullName?.firstName || "",
                lastName: authUser.fullName?.lastName || ""
            },
            dob: authUser.dob
                ? new Date(authUser.dob).toISOString().split("T")[0]
                : "",
            phone: authUser.phone,
            gender: authUser.gender,
            address: {
                city: authUser.address?.city || "",
                state: authUser.address?.state || "",
                country: authUser.address?.country || ""
            },
            hostProfile: {
                languages: authUser.hostProfile?.languages || [],
                about: authUser.hostProfile?.about || ""
            }
        });

        if (authUser.picture) {
            setPreview(authUser.picture);
        }
    }, [authUser]);

    const handleNestedChange = (parent, field) => (e) => {
        setProfileData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [field]: e.target.value
            }
        }));

        setErrors(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [field]: ""
            }
        }));
    };

    const handleChange = (field) => (e) => {
        setProfileData(prev => ({
            ...prev,
            [field]: e.target.value
        }));

        setErrors(prev => ({
            ...prev,
            [field]: ""
        }));
    };

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleChangePicture = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const pictureUrl = URL.createObjectURL(file);

        setPicture(file);
        setPreview(pictureUrl);
        setPictureRemoved(false);
    };

    const handleRemovePicture = () => {
        setPreview("");
        setPicture(null);
        setPictureRemoved(true);
        toast.success("Profile picture will be removed successfully!");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateProfile({ ...profileData, picture });
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            let pictureSend = undefined;

            if (pictureRemoved) {
                pictureSend = "";
            } else if (picture) {
                pictureSend = picture;
            }

            const updatedUser = await updateProfile({ ...profileData, picture: pictureSend });
            toast.success("Profile updated successfully!");
            navigate(`/users/${updatedUser?.username}`);

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to Update Profile");
        }
    };

    const handleLanguageChange = (language) => {
        setProfileData((prev) => ({
            ...prev,
            hostProfile: {
                ...prev.hostProfile,
                languages: prev.hostProfile.languages.includes(language)
                    ? prev.hostProfile.languages.filter(
                        (lang) => lang !== language
                )
                : [ ...prev.hostProfile.languages, language ]
            },
        }));
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-center">
                {isUpdatingProfile ? (
                    <Loader size={25} className="animate-spin" />
                ) : (
                    <form 
                        onSubmit={handleSubmit}
                        className="w-full max-w-7xl space-y-6 p-4"
                    >
                        <div className="flex flex-col items-center justify-center gap-4 p-2">
                            <ProfilePictureUploader 
                                preview={preview}
                                loading={isUpdatingProfile}
                                onChangePicture={handleChangePicture}
                                onRemovePicture={handleRemovePicture}
                            />

                            <UsernameEditor 
                                data={profileData}
                                error={errors.username}
                                handleChange={handleChange}
                            />

                            <ProfileAboutSection 
                                user={authUser}
                                data={profileData}
                                error={errors.hostProfile?.about}
                                handleNestedChange={handleNestedChange}
                            />
                        </div>

                        <div className="w-full border-t border-zinc-300 text-center mt-8" />

                        <ProfileCustomization 
                            user={authUser}
                            data={profileData}
                            errors={errors}
                            handleChange={handleChange}
                            handleNestedChange={handleNestedChange}
                            handleLanguageChange={handleLanguageChange}
                        />

                        <div className="flex items-center justify-end gap-5">
                            <button 
                                type="submit"
                                onClick={() => navigate(`/users/${authUser?.username}`)}
                                className="default-btn"
                            >
                                Back
                            </button>

                            <button 
                                type="submit"
                                className="primary-btn"
                                disabled={isUpdatingProfile}
                            >
                                {isUpdatingProfile ? <Loader size={22} className="animate-spin" /> : "Confirm"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </DashboardLayout>
    );
}