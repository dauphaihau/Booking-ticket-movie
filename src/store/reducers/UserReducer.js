import {
    CLOSE_MODAL, ERROR_FORM_SERVER,
    OPEN_MODAL,
    SET_ALL_TYPE_USER,
    SET_DATA_LOGIN,
    SET_DATA_USER,
    SET_INFO_USER,
    SET_LIST_USER
} from "../types/Type";
import {ACCESS_TOKEN, USER_LOGIN} from "../../util/settings";
import {DataUser} from "../../_core/models/dataUser";

let user = '';

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    dataUser: new DataUser(),
    listUser: [],
    infoUser: {},
    typeUser: [],
    visible: false,
    messageServer : ''
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_LOGIN: {
            const {dataLogin} = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(dataLogin))
            localStorage.setItem(ACCESS_TOKEN, dataLogin.accessToken)
            return {...state, userLogin: dataLogin}
        }
        case SET_DATA_USER: {
            return {...state, dataUser: action.dataUser}
        }
        case SET_LIST_USER: {
            return {...state, listUser: action.listUser}
        }
        case SET_INFO_USER: {
            return {...state, infoUser: action.infoUser}
        }
        case SET_ALL_TYPE_USER: {
            return {...state, typeUser: action.typeUser}
        }
        case OPEN_MODAL: {
            return {...state, visible: true}
        }
        case CLOSE_MODAL: {
            return {...state, visible: false}
        }
        case ERROR_FORM_SERVER: {
            return {...state, messageServer: action.messageServer}
        }
        default:
            return state
    }
}

