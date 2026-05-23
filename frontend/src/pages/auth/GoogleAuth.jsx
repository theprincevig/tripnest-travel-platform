import { GoogleLogin } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/useAuthStore';

export default function GoogleAuth() {
    const { googleLogin } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await googleLogin({
                token: credentialResponse.credential
            });

            navigate(from, { replace: true });
            toast.success("Welcome back to the tripnest!");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to Google login");
        }
    }

    return (
        <div className="w-full flex flex-col items-center mt-6">
            {/* Divider */}
            <div className="w-full max-w-xl flex items-center gap-3 mb-5">
                <div className="flex-1 border-t border-zinc-200" />
                <span className="text-sm text-zinc-500">
                    OR
                </span>
                <div className="flex-1 border-t border-zinc-200" />
            </div>

            <GoogleLogin 
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Login failed")}
            />
        </div>
    );
}