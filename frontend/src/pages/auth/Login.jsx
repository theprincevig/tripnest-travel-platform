import { KeyRound, Loader, Loader2, User } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { hasErrors, validateLogin } from "../../errors/newErrors";
import { initialLoginData } from "../../constants/initialData";
import { useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import AuthInput from "../../components/inputs/AuthInput";
import AuthHeader from "../../components/AuthHeader";
import GoogleAuth from "./GoogleAuth";

export default function Login() {
    const { isLoggingIn, login } = useAuthStore();

    const [formData, setFormData] = useState(initialLoginData);
    const [errors, setErrors] = useState(initialLoginData);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoggingIn) return;

        const newErrors = validateLogin(formData);
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            await login(formData);
            setFormData(initialLoginData);
            navigate(from, { replace: true });
            toast.success("Welcome back to the tripnest!");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to login");
        }
    }

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                {isLoggingIn ? (
                    <Loader2 size={30} className="animate-spin" />
                ) : (
                    <>
                        <AuthHeader 
                            heading="Welcome back"
                            tagline="Continue your journey with tripnest"
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
                                icon={<KeyRound size={16} />}
                                label="Password"
                                type="password"
                                value={formData.password}
                                placeholder="enter password"
                                onChange={handleChange("password")}
                                error={errors.password}
                            />

                            <button 
                                type="submit"
                                className="w-full max-w-25 sm:max-w-40 primary-btn mt-8"
                                disabled={isLoggingIn}
                            >
                                { isLoggingIn ? <Loader size={20} className="animate-spin mx-auto" /> : "Login" }
                            </button>
                        </form>

                        <p className="text-[11px] sm:text-sm text-slate-800 mt-3">
                            Don't have an Account?{" "}
                            <Link 
                                to="/register"
                                className="font-[Poppins] font-medium text-primary underline hover:opacity-80 transition-all"
                            >
                                Signup
                            </Link>
                        </p>

                        {/* Login with Google */}
                        <GoogleAuth />
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}