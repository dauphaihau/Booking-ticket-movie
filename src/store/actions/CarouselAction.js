import {GET_CAROUSEL} from "../types/Type";
import { http } from  '../../util/settings'


export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/api/QuanLyPhim/LayDanhSachBanner')
            dispatch({
                type: GET_CAROUSEL,
                arrCarousel: result.data.content
            })

        } catch (error) {
            console.log('error', error)
        }
    }
}