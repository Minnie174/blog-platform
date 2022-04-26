import ApiService from "../../utilities/api-service/api-service";

export const ARTICLE_EDITED = 'EDITED_ARTICLE';
export const ARTICLE_DELETED = 'DELETE_ARTICLE';
export const ARTICLE_UPDATED = 'UPDATE_ARTICLE';


export const isEdited = (payload) => ({type: ARTICLE_EDITED, payload});
export const isDeleted = (payload) => ({type: ARTICLE_DELETED, payload});
export const isUpdated = (payload) => ({type: ARTICLE_UPDATED, payload})

const api = new ApiService();

export const editingArticle = (title, description, body, tagList, slug) => async (dispatch) => {
    try {
        const response = await api.editArticle(title, description, body, tagList, slug);
        const result = await response.json();
        if (response.ok) {
            dispatch(isUpdated(result))
            dispatch(isEdited(true))
        }
    } catch (e) {
        dispatch(isEdited(false))
    }
}

export const deleteNews = (slug) => async (dispatch) => {
    try {
        const response = await api.deleteArticle(slug);
        dispatch(isDeleted(true))
    } catch (e) {
        dispatch(isDeleted(false))
    }
}
