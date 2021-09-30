import { GET_FILMS} from "../types/Type";
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
