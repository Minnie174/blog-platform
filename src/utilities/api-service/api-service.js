import {getLoading, loginUser} from "../../redux/actions";

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

    async getPagination(limit, query, cdDispatch) {
        const offset = query === 1 ? 0 : (query - 1) * 5;
        const res = await fetch(`${this.apiBase}articles?limit=${limit}&offset=${offset}`)
        const pagination = await res.json();
        cdDispatch(getLoading(false))
        return pagination; // выводим только пять статей на разных страницах
    }

    async getFullArticle(key) { // получаем всю статью по slug (id)
        const res = await fetch(`${this.apiBase}articles/${key}`)
        const result = await res.json();
        return result.article;
    }

    async registrateUser(username, email, password) { // регистрация
        const newUser = {
            user: {
                username: username,
                email: email,
                password: password
            }
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        };

        console.log(options)

        const res = await fetch(`${this.apiBase}users`, options);
        const result = await res.json();
        console.log(result)
        return result;
    }

    async loginUser(email, password) { // логинимся
        const user = {
            user: {
                email: email,
                password: password
            }
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        const res = await fetch(`${this.apiBase}users/login`, options);
        const result = await res.json();
        console.log(result.user.token)

        // const token = result.user.token;
        const token = JSON.parse(localStorage.getItem('token'))

        const options2 = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            }
        }

        const res2 = await fetch(`${this.apiBase}user`, {
            headers: {
                Authorization: `Token ${token}`,
            }
        });
        console.log(await res2.json())
        return await res2.json();
    }
}