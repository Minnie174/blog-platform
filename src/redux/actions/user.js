import ApiService from "../../utilities/api-service/api-service";

export const ADD_USER = 'ADD_NEW_USER';
export const REMOVE_USER = 'REMOVE_USER'; // удаляем пользователя
export const IS_ERROR_REGISTRATION = 'IS_ERROR_USER';
export const IS_ERROR_EMAIL = 'IS_ERROR_EMAIL';
export const IS_ERROR_USERNAME = 'IS_ERROR_USERNAME';

export const setNewUser = (payload) => ({type: ADD_USER, payload}); // регаем пользователя, в сторе данные
export const removeUser = (payload) => ({type: REMOVE_USER, payload}); // разлогигимся
export const isErrorUser = (payload) => ({type: IS_ERROR_REGISTRATION, payload}); // получилось ли зарегать
export const isErrorEmail = (payload) => ({type: IS_ERROR_EMAIL, payload});
export const isErrorUsername = (payload) => ({type: IS_ERROR_USERNAME, payload});

const api = new ApiService();

export const fetchRegistration = (username, email, password) => async (dispatch) => { // регистрация
    try {
        const response = await api.registerUser(username, email, password); // запрос-регистрация
        if (response.username) {
            dispatch(isErrorUsername(true))
        }
        if (response.email) {
            dispatch(isErrorEmail(true))
        }
        const { user } = response; // вытаскиваем user'a
        dispatch(setNewUser(user)); // в сторе новые данные
        dispatch(isErrorUser(true));
        localStorage.setItem('token', JSON.stringify(user.token))
        localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
        dispatch(isErrorUser(false));
    }
}
