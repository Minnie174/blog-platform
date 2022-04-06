export default class ApiService {

    apiBase = 'https://kata.academy:8021/api/';

    async getRequest() {
        const res = await fetch(`${this.apiBase}articles`);
        if (!res.ok) {
            throw new Error(`Could not fetch your request`)
        }

        const articles = await res.json();
        return articles; // массив с двумя значениями: статьи и общее число статей
    }

    async getPagination(limit, query) {
        const offset = query === 1 ? 0 : (query - 1) * 5;
        const res = await fetch(`${this.apiBase}articles?limit=${limit}&offset=${offset}`)
        const pagination = await res.json();
        return pagination; // выводим только пять статей на разных страницах
    }

    async getFullArticle(key) { // получаем всю статью по slug (id)
        const res = await fetch(`${this.apiBase}articles/${key}`)
        const result = await res.json();
        return result.article;
    }
}