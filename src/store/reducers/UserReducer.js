import {SET_DATA_LOGIN, SET_DATA_USER} from "../types/Type";
import {ACCESS_TOKEN, USER_LOGIN} from "../../util/settings";
import {DataUser} from "../../_core/models/dataUser";

let user = null;

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    dataUser: new DataUser(),
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_LOGIN: {
            const {dataLogin} = action;
            console.log('data-login', dataLogin)
            localStorage.setItem(USER_LOGIN, JSON.stringify(dataLogin))
            localStorage.setItem(ACCESS_TOKEN, dataLogin.accessToken)

            return {...state, userLogin: dataLogin}
        }
        case SET_DATA_USER: {
            return {...state, dataUser: action.dataUser}
        }

        default:
            return state
    }
}

