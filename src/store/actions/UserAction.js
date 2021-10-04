import {ACCESS_TOKEN, GROUP_ID, history, http, USER_LOGIN} from "../../util/settings";
import {GET_FILMS, SET_DATA_LOGIN, SET_DATA_USER} from "../types/Type";

export const LoginAction = (dataLogin) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/QuanLyNguoiDung/DangNhap', dataLogin)
            console.log('result-api', result)

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DATA_LOGIN,
                    dataLogin: result.data.content
                })

                history.goBack()
            }

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}


export const getDataUserAction = () => {
    return async dispatch => {
        try {
            const result = await http.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
            console.log('datauser', result)

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DATA_USER,
                    dataUser: result.data.content
                })
            }

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}
