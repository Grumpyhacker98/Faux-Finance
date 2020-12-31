import axios from 'axios';

const API = {
    register: (username, password) => {
        return new Promise((resolve, reject) => {
            axios({
                method: "POST",
                data: {
                    username: username,
                    password: password
                },
                // withCredentials: true,
                url: "http://localhost:3001/register",

            })
                .catch(err => reject(err))
                .then(res => resolve(res))
        })
    },
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            axios({
                method: "POST",
                data: {
                    username: username,
                    password: password
                },
                // withCredentials: true,
                url: "http://localhost:3001/login",

            })
                .catch(err => reject(err))
                .then(res => resolve(res))
        })
    },
}

export default API