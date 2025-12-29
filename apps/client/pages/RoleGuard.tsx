import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleGuard({
    children,
    allow,
}: {
    children: JSX.Element;
    allow: string[];
}) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) return <Navigate to="/login" />;

    const hasRole = user.role?.some((r: string) => allow.includes(r));

    if (!hasRole) return <Navigate to="/unauthorized" />;

    return children;
}

