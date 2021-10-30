import {DISPLAY_LOADING, DISPLAY_LOADING_BUTTON, HIDE_LOADING, HIDE_LOADING_BUTTON} from "../types/Type";

const initialState = {
    isLoading: false,
    isLoadingBtn: false
}

export const LoadingReducer = ( state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_LOADING: {
            return {...state, isLoading: true}
        }
        case HIDE_LOADING: {
            return {...state, isLoading: false}
        }
        case DISPLAY_LOADING_BUTTON: {
            return {...state, isLoadingBtn: true}
        }
        case HIDE_LOADING_BUTTON: {
            return {...state, isLoadingBtn: false}
        }
        default: return state
    }
}