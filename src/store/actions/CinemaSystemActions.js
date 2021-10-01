


import {SET_CINEMA} from "../types/Type";
import {GROUP_ID, http} from '../../util/settings'


export const CinemaSystemActions = () => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`)

            console.log('result', result.data.content)

            if (result.status === 200) {
                dispatch({
                    type: SET_CINEMA,
                    arrCinema: result.data.content
                })
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}
