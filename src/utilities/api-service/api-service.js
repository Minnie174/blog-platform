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

    // async getListOfArticles() { // получаем статьи
    //     const res = await this.getRequest()
    //     return res.articles;
    // }
    //
    // async getNumberOfArticles() { // олучаем количество статей
    //     const res = await this.getRequest();
    //     return res.articlesCount;
    // }

    async getPagination(limit, query) {
        const res = await fetch(`${this.apiBase}articles?limit=${limit}&offset=${query}`)
        const pagination = await res.json();
        return pagination; // выводим только пять статей на разных страницах
    }
}