import {getLoading} from "../../redux/actions/articles";

export default class ApiService {

    apiBase = 'https://blog.kata.academy/api/'


    user = JSON.parse(localStorage.getItem('user'))

    token = this.user === null? '' : this.user.token

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
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
        }
        const res = await fetch(`${this.apiBase}articles?limit=${limit}&offset=${offset}`, options)
        const pagination = await res.json();
        cdDispatch(getLoading(false))
        return pagination; // выводим только пять статей на разных страницах
    }

    async getArticle(slug) {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
        }
        const res = await fetch(`${this.apiBase}articles/${slug}`, options) // тут мы получаем сведения о статье, которую хотим отредачить
        const result = await res.json();
        return result.article;
    }

    async registerUser(username, email, password) { // регистрация
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

        const res = await fetch(`${this.apiBase}users`, options);
        const result = await res.json();
        if (result.errors) {
            return result.errors
        }
        localStorage.setItem('token', JSON.stringify(result.user.token));
        return result;
    }

    async loginUser(email, password) { // логинимся
        const user = {
            "user": {
                "email": email,
                "password": password
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
        if (!res.ok) {
            throw new Error(`Something went wrong with authorization`)
        }
        const result = await res.json();
        return result;
    }

    async loginAgain() {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
        };
        const res = await fetch(`${this.apiBase}user`, options)
        if (!res.ok) {
            throw new Error(`Something went wrong with authorization`)
        }
        const result = await res.json();
        return result;
    }

    async editProfile(dataUser) {
        if(!dataUser) throw new Error('Missing data');
        const user = {
            "user": {
                "email": dataUser.email,
                "username": dataUser.username,
                "bio": null,
                "image": dataUser.image,
                "token": this.token
            }
        }
        const options = {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
            body: JSON.stringify(user)
        }

        const res = await fetch(`${this.apiBase}user`, options);
        const result = await res.json();
        if (result.errors) {
            return result.errors
        }
        return result;
    }

    async createArticle(title, description, body, tagList = []) {
        const article = {
            "article": {
                "title": title,
                "description": description,
                "body": body,
                "tagList": tagList
            }
        }

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
            body: JSON.stringify(article)
        };

        const res = await fetch(`${this.apiBase}articles`, options);
        const result = await res.json();
        return result;
    }

    async deleteArticle(slug) {
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
        }
        const res = await fetch(`${this.apiBase}articles/${slug}`, options)
        const result = await res.json();
        return result;
    }

    async editArticle(title, description, body, tagList, slug) {
        const article = {
            "article": {
                "title": title,
                "description": description,
                "body": body,
                "tagList": tagList
            }
        }
        const options = {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
            body: JSON.stringify(article)
        }

        const res = await fetch(`${this.apiBase}articles/${slug}`, options)
        return res;
    }

    async putLike(slug) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
        };
        const res = await fetch(`${this.apiBase}articles/${slug}/favorite`, options)
        if (res.ok) {
            return res;
        }
        if (res.status === 500) {
            throw new Error('Internal Server Error')
        }
    }

    async deleteLike(slug) {
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
        };

        const res = await fetch(`${this.apiBase}articles/${slug}/favorite`, options);
        if (res.ok) {
            return res;
        }
        if (res.status === 500) {
            throw new Error('Internal Server Error')
        }
    }
}