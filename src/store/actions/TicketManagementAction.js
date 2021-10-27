import {http} from "../../util/settings";
import {AUTO_SWITCH_TAB, BOOKING_SUCCESS, SET_LIST_TICKET_ROOM} from "../types/Type";
import {DataBooking} from "../../_core/models/dataBooking";
import {displayLoadingAction, hideLoadingAction} from "./LoadingAction";
import {notifiFuntion} from "../../util/Notification";

export const getListTicketRoomAction = (idShowtimes) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtimes}`)
            if (result.status === 200) {
                dispatch({
                    type: SET_LIST_TICKET_ROOM,
                    detailTicketRoom: result.data.content
                })
                dispatch(hideLoadingAction)
            }
        } catch (error) {
            console.log({error})
        }
    }
}

export const bookingAction = (dataBooking = new DataBooking()) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            await http.post('/api/QuanLyDatVe/DatVe', dataBooking)
            await dispatch(getListTicketRoomAction(dataBooking.maLichChieu))
            await dispatch({type: BOOKING_SUCCESS}) // renew the seat you ordered
            await dispatch(hideLoadingAction)
            notifiFuntion( 'bạn đã đặt ghế thành công')

            dispatch({type: AUTO_SWITCH_TAB})

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log('error', error.response.data)
        }
    }
}