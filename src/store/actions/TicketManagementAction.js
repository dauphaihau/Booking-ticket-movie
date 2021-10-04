import {ACCESS_TOKEN, http} from "../../util/settings";
import {AUTO_SWITCH_TAB, BOOKING_CHAIR, BOOKING_SUCCESS, SET_LIST_TICKET_ROOM} from "../types/Type";
import {DataBooking} from "../../_core/models/dataBooking";
import {displayLoadingAction, hideLoadingAction} from "./LoadingAction";
import {TicketManagementReducer} from "../reducers/TicketManagementReducer";
import {connection} from "../../index";

export const getListTicketRoomAction = (idShowtimes) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtimes}`)
            if (result.status === 200) {
                dispatch({
                    type: SET_LIST_TICKET_ROOM,
                    detailTicketRoom: result.data.content
                })
            }
            dispatch(hideLoadingAction)

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}

export const bookingAction = (dataBooking = new DataBooking()) => {
    return async dispatch => {
        try {
            // dispatch(displayLoadingAction)

            const result = await http.post('/api/QuanLyDatVe/DatVe', dataBooking)
            console.log('resultBooking', result)

            // auto refresh after booking success
            await dispatch(getListTicketRoomAction(dataBooking.maLichChieu))

            // clear
            await dispatch({type: BOOKING_SUCCESS})

            // await dispatch(hideLoadingAction)
            dispatch({type: AUTO_SWITCH_TAB})

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log('error', error.response.data)
        }
    }
}

export const bookingChairAction = (chair, idShowtime) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: BOOKING_CHAIR,
            bookingChair: chair
        })

        let listBookingChair = getState().TicketManagementReducer.listBookingChair;
        let accountUser = getState().UserReducer.userLogin.taiKhoan;
        console.log('list-booking-chair', listBookingChair)
        console.log('account-user', accountUser)
        console.log('id-showtime', idShowtime)

        listBookingChair = JSON.stringify(listBookingChair)

        connection.invoke('datGhe', listBookingChair, accountUser, idShowtime)

    }
}