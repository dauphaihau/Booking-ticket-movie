import {SET_FILMS, SET_DETAIL_FILM, SET_INFO_FILM} from "../types/Type";
import {GROUP_ID, history, http} from '../../util/settings'
import {toast} from "react-hot-toast";

export const getListFilmsAction = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
            dispatch({
                type: SET_FILMS,
                arrFilms: result.data.content
            })
        } catch (error) {
            console.log({error})
        }
    }
}

export const getDetailFilmsAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
            dispatch({
                type: SET_DETAIL_FILM,
                detailFilm: result.data.content
            })
        } catch (error) {
            console.log({error})
        }
    }
}

export const getInfoFilmsAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
            dispatch({
                type: SET_INFO_FILM,
                infoFilm: result.data.content
            })

        } catch (error) {
            console.log({error})
        }
    }
}


export const updateFilmsAction = (filmEdited) => {
    return async (dispatch) => {
        try {
            await http.post(`/api/QuanLyPhim/CapNhatPhimUpload`, filmEdited)
            toast.success('successful movie editing')
            dispatch(getListFilmsAction())
            history.push('/admin/films')
        } catch (error) {
            console.log({error})
            if (error.response.status === 403) {
                toast.error('You are not authorized to edit film')
            }
        }
    }
}

export const deleteFilmsAction = (idFilm) => {
    return async (dispatch) => {
        try {
            await http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${idFilm}`)
            toast.success('Delete movie successfully')
            dispatch(getListFilmsAction())
        } catch (error) {
            console.log({error})
        }
    }
}
