import ApiService from "../utilities/api-service/api-service";

export const ARTICLE_ACTION_TYPE = 'GET_ARTICLES';
export const ARTICLE_ACTION_LOAD = 'IS_LOADING';
export const ARTICLE_ACTION_PAGE = 'SET_CURRENT_PAGE';

export const ADD_USER = 'ADD_NEW_USER';
export const REMOVE_USER = 'REMOVE_USER'
export const IS_ERROR_USER = 'IS_ERROR_USER';
export const LOGIN_USER = 'LOGIN_EXISTING_USER';
export const IS_AUTH = 'US_AUTH';

export const ARTICLE_CREATE = 'IS_CREATED';

export const USER_EDITED = 'EDIT_USER';

export const ARTICLE_DELETED = 'DELETE_ARTICLE';
export const ARTICLE_EDITED = 'EDITED_ARTICLE';
export const SINGLE_PAGE = 'GET_SINGLE'

export const PUT_LIKE = 'PUT_LIKE';
export const DELETE_LIKE = 'DELETE_LIKE';

export const ERROR = 'ERROR_EDIT_PROFILE';

export const LIKE_STATUS = 'LIKE_STATUS';

export const IS_ERROR = 'IS_ERROR';

export const getArticles = (payload) => ({type: ARTICLE_ACTION_TYPE, payload});
export const getLoading = (payload) => ({type: ARTICLE_ACTION_LOAD, payload});
export const setCurrentPage = (payload) => ({type: ARTICLE_ACTION_PAGE, payload});

export const setNewUser = (payload) => ({type: ADD_USER, payload});
export const removeUser = (payload) => ({type: REMOVE_USER, payload});
export const isErrorUser = (payload) => ({type: IS_ERROR_USER, payload});
export const loginUsers = (payload) => ({type: LOGIN_USER, payload});
export const isAuth = (payload) => ({type: IS_AUTH, payload});

export const isCreated = (payload) => ({type: ARTICLE_CREATE, payload})
export const isEditedUser = (payload) => ({type: USER_EDITED, payload});

export const isDeleted = (payload) => ({type: ARTICLE_DELETED, payload});
export const isEdited = (payload) => ({type: ARTICLE_EDITED, payload});
export const getSinglePage = (payload) => ({type: SINGLE_PAGE, payload})

export const isLiked = (payload) => ({type: PUT_LIKE, payload});
export const isLikeDelete = (payload) => ({type: DELETE_LIKE, payload});

export const isErrorEdit = (payload) => ({type: ERROR, payload});
export const isLikedStatus = (payload) => ({type: LIKE_STATUS, payload});

export const isErrorLike = (payload) => ({type: IS_ERROR, payload});

const api = new ApiService();

export const fetchDispatch = (limit, query) => async (dispatch) => { // запрос на статьи
    try {
        const response = await api.getPagination(limit, query, dispatch);
        dispatch(getArticles(response))
    } catch (e) {
        console.log(e) // прописать уведомление об ошибке
    }
} // загрузка статей с пагинацией // меняю isError на null каждый раз после логина

export const fetchRegistration = (username, email, password) => async (dispatch) => { // регистрация
    // const api = new ApiService();

    try {
        const response = await api.registrateUser(username, email, password);
        const { user } = response; // вытаскиваем user'a
        console.log(user)
        dispatch(setNewUser(user));
        dispatch(isErrorUser(false));
        localStorage.setItem('token', JSON.stringify(user.token))
        localStorage.setItem('user', JSON.stringify(user))
    } catch (e){
        console.log(e)
        dispatch(isErrorUser(true)); // прописать уведомление
    }
}

export const fetchLogin = (email, password) => async (dispatch) => {
    // const api = new ApiService();

    try {
        const response = await api.loginUser(email, password); // логиним пользователя в системе
        // const {user} = response;
        // dispatch(loginUsers(response)) //
        dispatch(isAuth(true));
        dispatch(isErrorUser(false))
        const res = await api.loginAgain();
        const {user} = res
        console.log(res)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(user.token));
        localStorage.setItem('auth', JSON.stringify(true))
        dispatch(loginUsers(user))
    } catch(e) {
        console.log(e)
        dispatch(isErrorUser(true))
    }
}

export const getSingleArticle = (slug) => async (dispatch) => {
    // const api = new ApiService();
    dispatch(getLoading(true))

    try {
        const response = await api.getFullArticle(slug)
        console.log(response)
        dispatch(getSinglePage(response)); // пихаем всю статью в стор
        dispatch(getLoading(false))
    } catch (e) {
        console.log(e)
    }
}

export const getOldArticle = (slug) => async (dispatch) => {
    // const api = new ApiService();
    dispatch(getLoading(true))

    try {
        const response = await api.getArticle(slug)
        console.log(response)
        dispatch(isEdited(response))
        dispatch(getLoading(false))
        // будем диспатчить слаг в стор, а потом сверять - если слаг совпадает, то закрашиваем
    } catch (e) {
        console.log(e)
    }
}

export const createNewArticle = (title, description, body, tagList) => async (dispatch) => {
    // const api = new ApiService();

    try {
        const response = await api.createArticle(title, description, body, tagList)
        console.log(response)
        dispatch(isCreated(true))
    } catch (e) {
        console.log(e)
    }
}

export const editUser = (data) => async (dispatch) => {
    // const api = new ApiService();
    try {
        const response = await api.editProfile(data);
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data))
        }
        dispatch(isErrorEdit(false))
        dispatch(isEditedUser(data)) // пихаем обновленную инфу в массив зачем-то
        dispatch(loginUsers(data)) // зачем одно и то же прокидывать, я хззз, ну лан
        dispatch(isAuth(true));
    } catch(e) {
        dispatch(isErrorEdit(true))
    }
}

export const deleteNews = (slug) => async (dispatch) => {
    // const api = new ApiService();

    try {
        const response = await api.deleteArticle(slug);
        dispatch(isDeleted(true))
    } catch (e) {
        console.log(e)
    }
}

export const editingArticle = (title, description, body, tagList, slug) => async (dispatch) => {
    // const api = new ApiService();

    try {
        const response = await api.editArticle(title, description, body, tagList, slug);
        const result = await response.json();
        if (response.ok) {
            dispatch(isEdited(result))
        }
    } catch (e) {
        console.log(e)
    }
}

export const likeArticle = (slug) => async (dispatch) => {
    // const api = new ApiService();

    try {
        const response = await api.putLike(slug);
        if (response.ok) {
            dispatch(isLiked(true))
            dispatch(isErrorLike(false))
        }
        // dispatch(isEdited(fullArticle.actions))
    } catch (e) {
        console.log(e)
        dispatch(isLiked(false));
        dispatch(isErrorLike(true));
        // добавить уведомление об ошибке
    }
}

export const deleteLike = (slug) => async (dispatch) => {
    // const api = new ApiService();

    try {
        const response = await api.deleteLike(slug);
        if (response.ok) {
            dispatch(isLikeDelete(true));
            // dispatch(isLiked(false));
            dispatch(isErrorLike(false))
        }
    } catch (e) {
        console.log(e)
        dispatch(isLikeDelete(false));
        dispatch(isErrorLike(true));
        // добавить уведомление об ошибке
    }
}