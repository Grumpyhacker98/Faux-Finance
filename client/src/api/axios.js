import axios from 'axios';

// axios.defaults.withCredentials = true;
// const config = {
//     withCredentials: true,
// }

const API = {
    register: (username, password) => {
        return new Promise((resolve, reject) => {
            axios({
                method: "POST",
                data: {
                    username: username,
                    password: password
                },
                url: "http://localhost:3001/register",
                withCredentials: true,

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
                url: "http://localhost:3001/login",
                withCredentials: true

            })
                // axios.post("http://localhost:3001/login", { username, password })
                .catch(err => reject(err))
                .then(res => resolve(res))
        })
    },
    getUser: () => {
        return new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: "http://localhost:3001/user",
                withCredentials: true
            })
                .catch(err => reject(err))
                .then(res => resolve(res))
        })
    },
    logOut: () => {
        return new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: "http://localhost:3001/logout",
                withCredentials: true
            })
                .catch(err => reject(err))
                .then(resolve())
        })
    }
}

export default API