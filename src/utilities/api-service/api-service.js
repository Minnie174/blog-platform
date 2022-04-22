import {getLoading, loginUsers} from "../../redux/actions";

export default class ApiService {

    apiBase = 'https://kata.academy:8021/api/';

    token = JSON.parse(localStorage.getItem('token')) || ""

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

    async getFullArticle(key) { // получаем всю статью по slug (id)
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.token}`
            },
        }
        const res = await fetch(`${this.apiBase}articles/${key}`, options)
        const result = await res.json();
        return result.article;
    }

    async getArticle(slug) {
        const token = this.token;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
        }
        const res = await fetch(`${this.apiBase}articles/${slug}`, options) // тут мы получаем сведения о статье, которую хотим отредачить
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
        if (!res.ok) {
            throw new Error(`Something went wrong`)
        }
        console.log(res)
        return await res.json()
    }

    async loginAgain() {
        const token = JSON.parse(localStorage.getItem('token'))
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
        };
        const res = await fetch(`${this.apiBase}user`, options)
        // console.log(res, await res.json())
        return await res.json()
    }

    async editProfile(dataUser) {
        const token = this.token
        const user = {
            user: {
                email: dataUser.email,
                username: dataUser.username,
                bio: null,
                image: dataUser.image,
                token: this.token
            }
        }
        console.log(user)
        const options = {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body: JSON.stringify(user)
        }

        const res = await fetch(`${this.apiBase}/user`, options);
        return res // response.ok
    }

    async createArticle(title, description, body, tagList = []) {
        const token = this.token
        const article = {
            article: {
                title: title,
                description: description,
                body: body,
                tagList: tagList
            }
        }

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body: JSON.stringify(article)
        };

        const res = await fetch(`${this.apiBase}articles`, options);
        const result = await res.json();
        return result;
    }

    async deleteArticle(slug) {
        const token = this.token;
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
        }
        const res = await fetch(`${this.apiBase}articles/${slug}`, options)
        const result = await res.json();
        return result;
    }

    async editArticle(title, description, body, tagList, slug) {
        const token = this.token;
        const article = {
            article: {
                title: title,
                description: description,
                body: body,
                tagList: tagList
            }
        }
        const options = {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body: JSON.stringify(article)
        }

        const res = await fetch(`${this.apiBase}articles/${slug}`, options)
        return res;
    }

    async putLike(slug) {
        const token = this.token
        console.log(token)

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
        };
        const res = await fetch(`${this.apiBase}articles/${slug}/favorite`, options)
        if (res.ok) {
            return res;
        }
        console.log(await res.json())
    }

    async deleteLike(slug) {
        const token = this.token

        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
        };

        const res = await fetch(`${this.apiBase}articles/${slug}/favorite`, options);
        if (res.ok) {
            return res;
        }
        console.log(res)

    }
}