import {BOOKING_CHAIR, SET_LIST_TICKET_ROOM} from "../types/Type";
import {dataTicketRoom} from '../../_core/models/dataTicketRoom'

const initialState = {
    detailTicketRoom: new dataTicketRoom(),
    listBookingChair: []
}

export const TicketManagementReducer = ( state = initialState, action) => {
    switch (action.type) {
        case SET_LIST_TICKET_ROOM: {
            return {...state, detailTicketRoom: action.detailTicketRoom}
        }
        case BOOKING_CHAIR: {
           let updateListBookingChair = [...state.listBookingChair];
           let index = updateListBookingChair.findIndex(bchair => bchair.maGhe === action.bookingChair.maGhe);

           if (index !== -1) {
             updateListBookingChair.slice(index, 1)
           } else {
               updateListBookingChair.push(action.bookingChair)
           }
           return {...state, listBookingChair: updateListBookingChair}
        }

        default: return state
    }
}
