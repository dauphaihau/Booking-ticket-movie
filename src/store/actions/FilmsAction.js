import {GET_FILMS, SET_DETAIL_FILM} from "../types/Type";
import {GROUP_ID, http} from '../../util/settings'


export const FilmsAction = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
            dispatch({
                type: GET_FILMS,
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
