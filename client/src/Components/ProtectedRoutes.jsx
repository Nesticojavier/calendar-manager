import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({isAllowed}) {

    if (!isAllowed) {
        return <Navigate to={"/"} replace />;
    }
    return (
        <Outlet/>
    )
}
