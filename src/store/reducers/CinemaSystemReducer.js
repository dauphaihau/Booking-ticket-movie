import {SET_CINEMA} from "../types/Type";

const initialState = {
    arrCinema : []
}

export const CinemaSystemReducer = ( state = initialState, action) => {
    switch (action.type) {
        case SET_CINEMA: {
            return {...state, arrCinema: action.arrCinema}
        }
        default: return state
    }
}

