import {ACCESS_TOKEN, http } from "../../util/settings";
import {SET_LIST_TICKET_ROOM} from "../types/Type";

export const TicketManagementAction = (idShowtimes) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtimes}`)
            console.log('ticketrooom', result)

            if (result.status === 200) {
                dispatch({
                    type: SET_LIST_TICKET_ROOM,
                    detailTicketRoom: result.data.content
                })

                // history.goBack()
            }

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}
