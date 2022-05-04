import {useLocation, Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const RequireUser = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem('token')) !== null;
    const userData = JSON.parse(localStorage.getItem('user')) || '';
    const name = userData === null ? '' : userData.username
    const info = useSelector(state => state.singleArticle.fullArticle) || ""
    const userName = info.author || ''

    if (!auth) {
        return <Navigate to="/sign-in" state={{from: location}} />
    }

    if (userName) {
        if (name !== userName.username) {
            return <Navigate to="/" state={{from: location}} />
        }
    }

    return children;
}