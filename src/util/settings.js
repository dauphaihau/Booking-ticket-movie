import {createBrowserHistory} from "history";
import axios from "axios";

export const history = createBrowserHistory();
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwOEUiLCJIZXRIYW5TdHJpbmciOiIyOC8wMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDYwMDY0MDAwMDAiLCJuYmYiOjE2MTY1MTg4MDAsImV4cCI6MTY0NjE1NDAwMH0.Aojk9-Qo5B5whL6jc8aZ4IOCm1RF9MrUhORXCrWBwEA'

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
