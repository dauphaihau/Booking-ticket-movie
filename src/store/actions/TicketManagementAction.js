import { http} from "../../util/settings";
import {
    CLEAR_BOOKING,
    HIDE_LOADING_BUTTON,
    SET_LIST_TICKET_ROOM, SWITCH_TAB
} from "../types/Type";
import {DataBooking} from "../../_core/models/dataBooking";
import {displayLoadingAction, hideLoadingAction} from "./LoadingAction";
import {toast} from "react-hot-toast";

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
                await dispatch({type: HIDE_LOADING_BUTTON})
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
            await http.post('/api/QuanLyDatVe/DatVe', dataBooking)
            await dispatch(getListTicketRoomAction(dataBooking.maLichChieu))
            await dispatch({type: CLEAR_BOOKING}) // renew the seat you ordered
            toast.success( 'You have successfully booked')

        } catch (error) {
            console.log({error})
            await dispatch({type: HIDE_LOADING_BUTTON})
        }
    }
}

export const bookingMobileAction = (dataBooking = new DataBooking()) => {
    return async dispatch => {
        try {
            await http.post('/api/QuanLyDatVe/DatVe', dataBooking)
            await dispatch(getListTicketRoomAction(dataBooking.maLichChieu))
            await dispatch({type: CLEAR_BOOKING}) // renew the seat you ordered
            toast.success( 'You have successfully booked')
            dispatch({type: SWITCH_TAB, tabActive: '2'})

        } catch (error) {
            console.log({error})
            await dispatch({type: HIDE_LOADING_BUTTON})
        }
    }
}

