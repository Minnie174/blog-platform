import {useLocation, Navigate } from "react-router-dom";

export const RequireAuth = ({children}) => {
    const location = useLocation();
    const auth = JSON.parse(localStorage.getItem('token')) !== null; // прописать логику

    if (!auth) {
        return <Navigate to="/sign-in" state={{from: location}} />
    }

    return children;
}