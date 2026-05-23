import { KeyRound, Loader, Loader2, Mail, User } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { hasErrors, validateSignup } from "../../errors/newErrors";
import toast from "react-hot-toast";

import AuthHeader from "../../components/AuthHeader";
import AuthInput from "../../components/inputs/AuthInput";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PasswordStrengthMeter from "../../components/inputs/passwordStrengthMeter";
import GoogleAuth from "./GoogleAuth";

export default function Signup() {
    const initState = {
        username: "",
        email: "",
        password: ""
    }

    const { isSigningUp, signup } = useAuthStore();
    const [formData, setFormData] = useState(initState);
    const [errors, setErrors] = useState(initState);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSigningUp) return;

        const newErrors = validateSignup(formData);
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            await signup(formData);
            setFormData(initState);
            navigate(from, { replace: true });
            toast.success("Welcome to Tripnest!");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to sign up.");
        }
    }

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                {isSigningUp ? (
                    <Loader2 size={30} className="animate-spin" />
                ) : (
                    <>
                        <AuthHeader 
                            heading="Start your journey"
                            tagline="Find unique stays and unforgettable experiences"
                        />

                        <form 
                            onSubmit={handleSubmit}
                            className="w-full max-w-xl text-center"
                        >
                            <AuthInput 
                                icon={<User size={16} />}
                                label="Username"
                                type="text"
                                value={formData.username}
                                placeholder="enter username"
                                onChange={handleChange("username")}
                                error={errors.username}
                            />

                            <AuthInput 
                                icon={<Mail size={16} />}
                                label="Email"
                                type="text"
                                value={formData.email}
                                placeholder="mail@site.com"
                                onChange={handleChange("email")}
                                error={errors.email}
                            />

                            <AuthInput 
                                icon={<KeyRound size={16} />}
                                label="Password"
                                type="password"
                                value={formData.password}
                                placeholder="enter password"
                                onChange={handleChange("password")}
                                error={errors.password}
                            />

                            {/* Password Strength Meter - Only show if password is not empty */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out`}
                                style={{
                                    maxHeight: formData.password ? "200px" : "0px", // adjust according to your PasswordStrengthMeter height
                                }}
                            >
                                <div
                                    className="transform origin-top transition-transform duration-300 ease-in-out"
                                    style={{
                                        transform: formData.password ? "scaleY(1)" : "scaleY(0)",
                                    }}
                                >
                                    <PasswordStrengthMeter password={formData.password} />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-[50%] py-2 mt-8 rounded-xl bg-primary text-white font-[Ramabhadra] shadow-xl inset-shadow-sm hover:bg-blue-600 transition-all active:scale-95 cursor-pointer disabled:bg-gray-400"
                                disabled={isSigningUp}
                            >
                                { isSigningUp ? <Loader size={20} className="animate-spin mx-auto" /> : "Sign up" }
                            </button>

                            <p className="text-sm text-slate-800 mt-3">
                                If Already have an Account?{" "}
                                <Link 
                                    to="/login"
                                    className="font-[Poppins] font-medium text-primary underline hover:opacity-80 transition-all"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>

                        {/* Login with Google */}
                        <GoogleAuth />
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}