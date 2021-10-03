import {SET_LIST_TICKET_ROOM} from "../types/Type";
import {dataTicketRoom} from '../../_core/models/dataTicketRoom'

const initialState = {
    detailTicketRoom: new dataTicketRoom()
}

export const TicketManagementReducer = ( state = initialState, action) => {
    switch (action.type) {
        case SET_LIST_TICKET_ROOM: {

            return {...state, detailTicketRoom: action.detailTicketRoom}
        }
        default: return state
    }
}
