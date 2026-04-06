import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function RoleRoute({ children, role }) {
    const { authUser } = useAuthStore();

    if (!authUser) return <Navigate to="/login" />

    if (authUser.role !== role) {
        return <Navigate to="/" />
    }

    return children;
}