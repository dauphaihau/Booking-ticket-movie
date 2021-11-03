import { http} from "../../util/settings";
import {
    CLEAR_BOOKING, DISPLAY_LOADING,
    DISPLAY_LOADING_BUTTON, HIDE_LOADING,
    HIDE_LOADING_BUTTON,
    SET_LIST_TICKET_ROOM, SWITCH_TAB
} from "../types/Type";
import {DataBooking} from "../../_core/models/dataBooking";
import {notifiFuntion} from "../../util/Notification";
import {displayLoadingAction, hideLoadingAction} from "./LoadingAction";

export const getListTicketRoomAction = (idShowtimes) => {
    return async dispatch => {
        try {
            dispatch({type: DISPLAY_LOADING})
            const result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtimes}`)
            if (result.status === 200) {
                dispatch({
                    type: SET_LIST_TICKET_ROOM,
                    detailTicketRoom: result.data.content
                })
                dispatch({type: HIDE_LOADING})
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
            await dispatch({type: CLEAR_BOOKING}) // renew the seat you ordered
            await dispatch({type: HIDE_LOADING_BUTTON})
            notifiFuntion( 'You have successfully booked')


        } catch (error) {
            console.log('error', error.response.data)
            await dispatch({type: HIDE_LOADING_BUTTON})
        }
    }
}

export const bookingMobileAction = (dataBooking = new DataBooking()) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            await http.post('/api/QuanLyDatVe/DatVe', dataBooking)
            await dispatch(getListTicketRoomAction(dataBooking.maLichChieu))
            await dispatch({type: CLEAR_BOOKING}) // renew the seat you ordered
            dispatch(hideLoadingAction)
            notifiFuntion( 'You have successfully booked')
            dispatch({type: SWITCH_TAB, tabActive: '2'})

        } catch (error) {
            console.log('error', error.response.data)
            await dispatch({type: HIDE_LOADING_BUTTON})
        }
    }
}

