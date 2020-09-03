import { ADD_ARTICLE, RESET_ARTICLES, DELETE_ARTICLES, EDIT_ARTICLES, EDIT_ARTICLESPLUS } from "./action-types";

export function addArticle(payload) {
    console.log(payload);
    return { type: ADD_ARTICLE, payload }
}

export function resetArticles() {
    return { type: RESET_ARTICLES }
}

export function deleteArticles(id) {
    return { type: DELETE_ARTICLES, payload: id}
}

export function editArticles(object) {
    return { type: EDIT_ARTICLES, payload : object}
}

export function editArticlesPlus(object) {
    return { type: EDIT_ARTICLESPLUS, payload : object}
}