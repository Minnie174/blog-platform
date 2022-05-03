// import {useLocation, Navigate } from "react-router-dom";
//
// export const ToAccess = ({children}) => {
//     const location = useLocation();
//     console.log(location)
//     const auth = true
//
//     if (!auth) {
//         return <Navigate to="/sign-in" state={{from: location}} />
//     }
//
//     return children;
// }