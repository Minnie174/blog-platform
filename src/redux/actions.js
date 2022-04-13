import ApiService from "../utilities/api-service/api-service";

export const ARTICLE_ACTION_TYPE = 'GET_ARTICLES';
export const ARTICLE_ACTION_LOAD = 'IS_LOADING';
export const ARTICLE_ACTION_PAGE = 'SET_CURRENT_PAGE';
export const ARTICLE_ACTION_LENGTH = 'SET_TOTAL_COUNT';
export const ADD_USER = 'ADD_NEW_USER';
export const REMOVE_USER = 'REMOVE_USER'
export const IS_ERROR_USER = 'IS_ERROR_USER';
export const LOGIN_USER = 'LOGIN_EXISTING_USER';
export const IS_AUTH = 'US_AUTH';

export const getArticles = (payload) => ({type: ARTICLE_ACTION_TYPE, payload});
export const getLoading = (payload) => ({type: ARTICLE_ACTION_LOAD, payload});
export const setCurrentPage = (payload) => ({type: ARTICLE_ACTION_PAGE, payload});
export const setNewUser = (payload) => ({type: ADD_USER, payload});
export const removeUser = (payload) => ({type: REMOVE_USER, payload});
export const isErrorUser = (payload) => ({type: IS_ERROR_USER, payload});
export const loginUser = (payload) => ({type: LOGIN_USER, payload});
export const isAuth = (payload) => ({type: IS_AUTH, payload})

export const fetchDispatch = (limit, query) => async (dispatch) => { // thunk
    const api = new ApiService();

    try {
        const response = await api.getPagination(limit, query, dispatch);
        dispatch(getArticles(response))
    } catch (e) {
        console.log(e)
    }
}
// меняю isError на null каждый раз после логина

export const fetchRegistration = (username, email, password) => async (dispatch) => {
    const api = new ApiService();

    try {
        const response = await api.registrateUser(username, email, password);
        const { user } = response;
        console.log(user)
        dispatch(setNewUser(user));
        dispatch(isErrorUser(false));
        localStorage.setItem('token', JSON.stringify(user.token))
    } catch (e){
        console.log(e)
        dispatch(isErrorUser(true));
    }
}

export const fetchLogin = (email, password) => async (dispatch) => {
    const api = new ApiService();

    try {
        const response = await api.loginUser(email, password);
        console.log(response)
        const {user} = response
        dispatch(loginUser(response)) // !!! вставить response
        dispatch(isAuth(true));
        dispatch(isErrorUser(false))
        localStorage.setItem('token', JSON.stringify(user.token))
    } catch(e) {
        console.log(e)
        dispatch(isErrorUser(true))
        dispatch(isAuth(false))
    }
}