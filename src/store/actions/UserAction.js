import {GROUP_ID, history, http} from "../../util/settings";
import {
    SET_ALL_TYPE_USER,
    SET_DATA_LOGIN,
    SET_DATA_USER,
    SET_INFO_USER,
    SET_LIST_USER
} from "../types/Type";
import {displayLoadingAction, hideLoadingAction} from "./LoadingAction";
import {notifiFuntion} from "../../util/Notification";

export const LoginAction = (dataLogin) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/QuanLyNguoiDung/DangNhap', dataLogin)

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DATA_LOGIN,
                    dataLogin: result.data.content
                })

                history.goBack()
            }

        } catch (error) {
            console.log({error})
            if (error.response.status === 404) {
                alert('Tài khoản hoặc mật khẩu không đúng')
            }
        }
    }
}


export const getDataUserAction = () => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await http.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DATA_USER,
                    dataUser: result.data.content
                })
            }
            dispatch(hideLoadingAction)

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log('error', error.response.data)
        }
    }
}

export const getListUserAction = () => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_LIST_USER,
                    listUser: result.data.content
                })
            }
            dispatch(hideLoadingAction)

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log('error', error.response.data)
        }
    }
}

export const deleteUserAction = (account) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            await http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`)

            dispatch(getListUserAction())
            dispatch(hideLoadingAction)
            notifiFuntion('Bạn đã xóa người dùng thành công')

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log('error', error.response.status)
            alert('Bạn không đủ quyền xóa người dùng này')
        }
    }
}


export const getInfoUserAction = (account) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await http.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`)

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_INFO_USER,
                    infoUser: result.data.content
                })
                dispatch(hideLoadingAction)
            }

        } catch (error) {
            console.log({error})
            alert('Bạn không đủ quyền chỉnh sửa người dùng này')
            history.push('/admin/users')
            dispatch(hideLoadingAction)
        }
    }
}

export const getAllTypeUserAction = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
            dispatch({
                type: SET_ALL_TYPE_USER,
                typeUser: result.data.content
            })

        } catch (error) {
            console.log({error})
        }
    }
}

export const updateInfoUserAction = (newData, id) => {
    return async (dispatch) => {
        try {
            const result = await http.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, newData)
            if (result.data.statusCode === 200) {
                dispatch(getInfoUserAction(id))
                notifiFuntion('Thay đổi thông tin thành công')
            }

        } catch (error) {
            console.log({error})
        }
    }
}

export const getInfoProfileAction = (account) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await http.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
            if (result.status === 200) {
                dispatch(hideLoadingAction)
                dispatch({
                    type: SET_INFO_USER,
                    infoUser: result.data.content
                })
            }

        } catch (error) {
            console.log('error', error.response.status)
            dispatch(hideLoadingAction)
        }
    }
}
