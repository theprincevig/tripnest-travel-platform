import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute ({ children }) {
  const { authUser, isCheckingAuth } = useAuthStore();
  const location  = useLocation();

  if (isCheckingAuth) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <LoaderCircle size={30} className='animate-spin' />
      </div>
    );
  }

  return authUser ? (
    children 
  ) : (
    <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />
  );
};