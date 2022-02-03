import {createBrowserHistory} from "history";
import axios from "axios";

export const history = createBrowserHistory();
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwOEUiLCJIZXRIYW5TdHJpbmciOiIzMC8wMy8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDg1OTg0MDAwMDAiLCJuYmYiOjE2MTY1MTg4MDAsImV4cCI6MTY0ODc0NjAwMH0.N_fGufzvG8LNffZDL7TGqoRt10gi2jpPbqfgAzpvx9c'

export const GROUP_ID = 'GP01';
export const USER_LOGIN = 'userLogin'
export const ACCESS_TOKEN = 'accessToken'

export const http = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn',
    timeout: 30000
})

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'TokenCybersoft': TOKEN_CYBERSOFT,
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }
    return config
}, (errors) => {
    return Promise.reject(errors)
})
