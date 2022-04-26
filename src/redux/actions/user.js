import ApiService from "../../utilities/api-service/api-service";
import {isLogin} from "./user-login";

export const ADD_USER = 'ADD_NEW_USER';
export const REMOVE_USER = 'REMOVE_USER'; // удаляем пользователя
export const IS_ERROR_REGISTRATION = 'IS_ERROR_USER';

export const setNewUser = (payload) => ({type: ADD_USER, payload}); // регаем пользователя, в сторе данные
export const removeUser = (payload) => ({type: REMOVE_USER, payload}); // разлогигимся
export const isErrorUser = (payload) => ({type: IS_ERROR_REGISTRATION, payload}); // получилось ли зарегать

const api = new ApiService();

export const fetchRegistration = (username, email, password) => async (dispatch) => { // регистрация
    try {
        const response = await api.registerUser(username, email, password); // запрос-регистрация
        const { user } = response; // вытаскиваем user'a
        dispatch(setNewUser(user)); // в сторе новые данные
        // dispatch(isLogin(true));
        dispatch(isErrorUser(true)); // ошибка при регистрации
        localStorage.setItem('token', JSON.stringify(user.token))
        localStorage.setItem('user', JSON.stringify(user))
    } catch (e){
        dispatch(isErrorUser(false));
    }
}
