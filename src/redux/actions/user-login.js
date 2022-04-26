import ApiService from "../../utilities/api-service/api-service";

export const LOGIN_USER = 'LOGIN_EXISTING_USER';
export const IS_AUTH = 'US_AUTH'; // получилось ли залогиниться
export const IS_ERROR_LOGIN = 'IS_ERROR_LOGIN';

export const loginUsers = (payload) => ({type: LOGIN_USER, payload}); // данные о пользователе getCurrentUser
export const isAuth = (payload) => ({type: IS_AUTH, payload}); // получилось ли авторизоваться
export const isLogin = (payload) => ({type: IS_ERROR_LOGIN, payload}); // получилось ли залогиниться для серверных ошибок

const api = new ApiService();

export const fetchLogin = (email, password) => async (dispatch) => {
    try {
        const response = await api.loginUser(email, password); // логиним пользователя в системе
        // dispatch(isAuth(true));
        const {user} = response
        // dispatch(isLogin(true));
        // const res2 = await api.loginAgain(); // get current user
        // const {user} = res2
        console.log(user)
        // localStorage.setItem('user', JSON.stringify(user))
        // localStorage.setItem('token', JSON.stringify(user.token));
        // localStorage.setItem('auth', JSON.stringify(true));
        dispatch(getLogin())
        // dispatch(loginUsers(user))
    } catch(e) {
        dispatch(isLogin(false))
    }
}

export const getLogin = () => async (dispatch) => {
    try {
        const response = await api.loginAgain();
        dispatch(isAuth(true));
        const {user} = response;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(user.token));
        localStorage.setItem('auth', JSON.stringify(true));
        dispatch(loginUsers(user));
        dispatch(isLogin(true));
    } catch (e) {
        dispatch(isLogin(false))
    }
}