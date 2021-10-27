import {
    AUTO_SWITCH_TAB,
    BOOKING_CHAIR,
    BOOKING_SUCCESS,
    SET_LIST_TICKET_ROOM,
    SWITCH_TAB
} from "../types/Type";
import {dataTicketRoom} from '../../_core/models/dataTicketRoom'

const initialState = {
    detailTicketRoom: new dataTicketRoom(),
    listBookingChair: [],
    tabActive: '2',
    bookingChairByOtherUser: [{maGhe: 49003}, {maGhe: 49004}]
}

export const TicketManagementReducer = (state = initialState, action) => {
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
        case BOOKING_SUCCESS: {
            return {...state, listBookingChair: []}
        }
        case AUTO_SWITCH_TAB: {
            return {...state, tabActive: '2'}
        }
        case SWITCH_TAB: {
            return {...state, tabActive: action.numTab}
        }
        default:
            return state
    }
}
