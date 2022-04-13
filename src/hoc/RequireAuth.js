import {useLocation, Navigate } from "react-router-dom";

export const RequireAuth = ({children}) => {
    const location = useLocation();
    const auth = true; // прописать логику

    if (!auth) {
        return <Navigate to="/sign-up" state={{from: location}} />
    }

    return children;
}