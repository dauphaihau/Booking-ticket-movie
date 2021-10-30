import {http} from "../../util/settings";
import {
    AUTO_SWITCH_TAB,
    BOOKING_SUCCESS,
    DISPLAY_LOADING_BUTTON,
    HIDE_LOADING_BUTTON,
    SET_LIST_TICKET_ROOM
} from "../types/Type";
import {DataBooking} from "../../_core/models/dataBooking";
import {notifiFuntion} from "../../util/Notification";

export const getListTicketRoomAction = (idShowtimes) => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtimes}`)
            if (result.status === 200) {
                dispatch({
                    type: SET_LIST_TICKET_ROOM,
                    detailTicketRoom: result.data.content
                })
            }
        } catch (error) {
            console.log({error})
        }
    }
}

export const bookingAction = (dataBooking = new DataBooking()) => {
    return async dispatch => {
        try {
            dispatch({type: DISPLAY_LOADING_BUTTON})
            await http.post('/api/QuanLyDatVe/DatVe', dataBooking)
            await dispatch(getListTicketRoomAction(dataBooking.maLichChieu))
            await dispatch({type: BOOKING_SUCCESS}) // renew the seat you ordered
            await dispatch({type: HIDE_LOADING_BUTTON})
            notifiFuntion( 'bạn đã đặt ghế thành công')

            dispatch({type: AUTO_SWITCH_TAB})

        } catch (error) {
            console.log('error', error.response.data)
            await dispatch({type: HIDE_LOADING_BUTTON})
        }
    }
}