import ProfileInput from "../inputs/ProfileInput";
import LanguageSelector from "./LanguageSelector";
import ProfileRadio from "./ProfileRadio";

export default function ProfileCustomization({
    user,
    data,
    errors,
    handleChange,
    handleNestedChange,
    handleLanguageChange
}) {
    return (
        <div className="flex flex-col space-y-8 p-2">
            <div className="flex items-end justify-start gap-5">
                <label>Full Name</label>
                <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <ProfileInput 
                        type="text"
                        value={data.fullName?.firstName}
                        placeholder="First name"
                        onChange={handleNestedChange("fullName", "firstName")}
                        error={errors.fullName?.firstName}
                    />

                    <ProfileInput 
                        type="text"
                        value={data.fullName?.lastName}
                        placeholder="Last name"
                        onChange={handleNestedChange("fullName", "lastName")}
                        error={errors.fullName?.lastName}
                    />
                </div>
            </div>
            
            <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex items-end justify-start gap-5">
                    <label>Date of Birth</label>
                    <ProfileInput 
                        type="date"
                        value={data.dob}
                        onChange={handleChange("dob")}
                        error={errors.dob}
                    />
                </div>

                <div className="flex items-end justify-start gap-5">
                    <label>Phone No.</label>
                    <ProfileInput 
                        type="text"
                        value={data.phone}
                        placeholder="Add your contant"
                        onChange={handleChange("phone")}
                    />
                </div>
            </div>

            <div className="flex items-end justify-start gap-5">
                <label>Gender</label>

                <ProfileRadio 
                    label="Male"
                    radioFor="male"
                    name="gender"
                    value={data.gender}
                    onChange={handleChange("gender")}
                />

                <ProfileRadio 
                    label="Female"
                    radioFor="female"
                    name="gender"
                    value={data.gender}
                    onChange={handleChange("gender")}
                />

                <ProfileRadio 
                    label="Other"
                    radioFor="other"
                    name="gender"
                    value={data.gender}
                    onChange={handleChange("gender")}
                />
            </div>

            <div className="flex items-end justify-start gap-5">
                <label>Address</label>
                <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-10">
                    <ProfileInput 
                        type="text"
                        value={data.address?.city}
                        placeholder="city"
                        onChange={handleNestedChange("address", "city")}
                        error={errors.address?.city}
                    />

                    <ProfileInput 
                        type="text"
                        value={data.address?.state}
                        placeholder="state"
                        onChange={handleNestedChange("address", "state")}
                        error={errors.address?.state}
                    />

                    <ProfileInput 
                        type="text"
                        value={data.address?.country}
                        placeholder="country"
                        onChange={handleNestedChange("address", "country")}
                        error={errors.address?.country}
                    />
                </div>
            </div>

            <div 
                className={`
                    flex items-center justify-start gap-5  
                    ${user?.role === "host"
                        ? "opacity-100" 
                        : "opacity-50 pointer-events-none"
                    }
                `}
            >
                <label htmlFor="languages">Languages</label>
                <LanguageSelector 
                    user={user}
                    data={data}
                    htmlFor="languages"
                    onChange={handleLanguageChange}
                    error={errors.hostProfile?.languages}
                />
            </div>
        </div>
    );
}