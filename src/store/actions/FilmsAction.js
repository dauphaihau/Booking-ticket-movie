import {SET_FILMS, SET_DETAIL_FILM, SET_INFO_FILM} from "../types/Type";
import {GROUP_ID, history, http} from '../../util/settings'


export const getListFilmsAction = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
            dispatch({
                type: SET_FILMS,
                arrFilms: result.data.content
            })
        } catch (error) {
            console.log('error', error)
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
            console.log('error', error)
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
            console.log('error', error)
        }
    }
}


export const updateFilmsAction = (filmEdited) => {
    return async (dispatch) => {
        try {
            const result = await http.post(`/api/QuanLyPhim/CapNhatPhimUpload`, filmEdited)
            alert('sửa phim thành công')
            console.log('result', result)
            dispatch(getListFilmsAction())
            history.push('/admin/films')
        } catch (error) {
            console.log({error})
            if (error.response.status === 403) {
              alert('Chỉ admin mới có quyền chỉnh sửa')
            }
        }
    }
}

export const deleteFilmsAction = (idFilm) => {
    return async (dispatch) => {
        try {
            const result = await http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${idFilm}`)
            console.log('resultdelete', result)
            alert('Xóa phim thành công')
            dispatch(getListFilmsAction())
        } catch (error) {
            console.log('error', error)
        }
    }
}
