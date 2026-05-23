import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useState } from "react";
import { KeyRound, Loader, Loader2 } from "lucide-react";
import { hasErrors, validateChangePassword } from "../../errors/newErrors";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/inputs/AuthInput";
import PasswordStrengthMeter from "../../components/inputs/passwordStrengthMeter";

export default function ChangePassword() {
    const initState = {
        current: "",
        new: "",
        confirm: ""
    };

    const { isResettingPassword, changePassword, logout } = useAuthStore();
    const navigate = useNavigate();

    const [password, setPassword] = useState(initState);
    const [errors, setErrors] = useState(initState);

    const handleChange = (field) => (e) => {
        setPassword(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateChangePassword(password);
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            await changePassword(password.current, password.new);
            await logout();
            setPassword(initState);

            toast.success("Password updated successfully! Now login again.");
            navigate("/login");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to Updating Password.");
        }
    }

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                {isResettingPassword ? (
                    <Loader2 size={30} className="animate-spin" />
                ) : (
                    <>
                        <AuthHeader 
                            heading="Change Password"
                            tagline="Update your password to keep your account secure"
                        />

                        <form 
                            onSubmit={handleSubmit}
                            className="w-full max-w-xl text-center"
                        >
                            <AuthInput 
                                icon={<KeyRound size={16} />}
                                label="Current Password"
                                type="password"
                                value={password.current}
                                placeholder="Enter your current password"
                                onChange={handleChange("current")}
                                error={errors.current}
                            />
                            <AuthInput 
                                icon={<KeyRound size={16} />}
                                label="New Password"
                                type="password"
                                value={password.new}
                                placeholder="Enter new password"
                                onChange={handleChange("new")}
                                error={errors.new}
                            />
                            <AuthInput 
                                icon={<KeyRound size={16} />}
                                label="Confirm Password"
                                type="password"
                                value={password.confirm}
                                placeholder="Enter confirm password"
                                onChange={handleChange("confirm")}
                                error={errors.confirm}
                            />

                            <PasswordStrengthMeter password={password.new} />

                            <button 
                                type="submit"
                                className="primary-btn"
                                disabled={isResettingPassword}
                            >
                                { isResettingPassword ? <Loader size={20} className="animate-spin mx-auto" /> : "CONFIRM" }
                            </button>
                        </form>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}