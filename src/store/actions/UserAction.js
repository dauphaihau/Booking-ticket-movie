import {GROUP_ID, history, http} from "../../util/settings";
import {
    CLOSE_MODAL,
    SET_ALL_TYPE_USER,
    SET_DATA_LOGIN,
    SET_INFO_USER,
    SET_LIST_USER
} from "../types/Type";
import {displayLoadingAction, hideLoadingAction} from "./LoadingAction";
import {toast} from "react-hot-toast";

export const LoginAction = (dataLogin) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/QuanLyNguoiDung/DangNhap', dataLogin)

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DATA_LOGIN,
                    dataLogin: result.data.content
                })
                await dispatch({type: CLOSE_MODAL})
                history.goBack();
            }

        } catch (error) {
            console.log({error})
            if (error.response.status === 404) {
                toast.error('Incorrect account or password')
            }
        }
    }
}
export const LoginModalAction = (dataLogin) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/api/QuanLyNguoiDung/DangNhap', dataLogin)

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DATA_LOGIN,
                    dataLogin: result.data.content
                })
                await dispatch({type: CLOSE_MODAL})
            }

        } catch (error) {
            console.log({error})
            if (error.response.status === 404) {
                toast.error('Incorrect account or password')
            }
        }
    }
}


export const getDataUserAction = () => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const {data, content} = await http.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
            console.log('data', data, content)

            // if (result.data.statusCode === 200) {
            //     dispatch({
            //         type: SET_DATA_USER,
            //         dataUser: result.data.content
            //     })
            //     dispatch(hideLoadingAction)
            // }

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log({error})
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
            console.log({error})
        }
    }
}

export const deleteUserAction = (account) => {
    console.log('account', account)
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            await http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`)
            dispatch(getListUserAction())
            dispatch(hideLoadingAction)
            toast.success('You have successfully deleted the user')

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log({error})
            if (error.response.status === 403) {
                toast.error('You are not authorized to delete this user')
            } else {
                toast.error('This user has booked a movie ticket that cannot be deleted!')
            }
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
            toast.error('You are not authorized to edit this user')
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
                await dispatch(getInfoUserAction(id))
                toast.success('Successfully changed information')
            }

        } catch (error) {
            console.log({error})
        }
    }
}

export const getInfoProfileAction = () => {
    console.log('ahihi')
    return async (dispatch) => {
        try {
            // dispatch(displayLoadingAction)
            const {content, status} = await http.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
            if (status === 200) {
                // dispatch(hideLoadingAction)
                dispatch({
                    type: SET_INFO_USER,
                    infoUser: content
                })
            }

        } catch (error) {
            console.log({error})
            // dispatch(hideLoadingAction)
        }
    }
}
