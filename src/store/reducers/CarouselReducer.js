import {GET_CAROUSEL} from "../types/Type";

const initialState = {
    arrCarousel: [
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
        }
    ],
}

export const CarouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAROUSEL: {
            return {...state, arrCarousel: action.arrCarousel}
        }
        default:
            return state
    }
}

