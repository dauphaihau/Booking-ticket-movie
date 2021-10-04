import {ACCESS_TOKEN, http } from "../../util/settings";
import {SET_LIST_TICKET_ROOM} from "../types/Type";
import {DataBooking} from "../../_core/models/dataBooking";

export const GetListTicketRoomAction = (idShowtimes) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtimes}`)
            if (result.status === 200) {
                dispatch({
                    type: SET_LIST_TICKET_ROOM,
                    detailTicketRoom: result.data.content
                })
            }

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}

export const BookingAction = (dataBooking = new DataBooking()) => {
    return async dispatch => {
        try {
            const result = await http.post('/api/QuanLyDatVe/DatVe', dataBooking)
            console.log('resultBooking', result)

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}
