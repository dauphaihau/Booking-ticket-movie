import {SET_DATA_LOGIN} from "../types/Type";
import {ACCESS_TOKEN, USER_LOGIN} from "../../util/settings";

let user = null;

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_LOGIN: {
            const {dataLogin} = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(dataLogin))
            localStorage.setItem(ACCESS_TOKEN, dataLogin.accessToken)

            return {...state, userLogin: dataLogin}
        }

        default:
            return state
    }
}

