import ApiService from "../../utilities/api-service/api-service";

export const ARTICLE_CREATE = 'IS_CREATED';

export const isCreated = (payload) => ({type: ARTICLE_CREATE, payload})

const api = new ApiService();

export const createNewArticle = (title, description, body, tagList) => async (dispatch) => {
    try {
        const response = await api.createArticle(title, description, body, tagList)
        dispatch(isCreated(true))
    } catch (e) {
        dispatch(isCreated(false))
    }
}

