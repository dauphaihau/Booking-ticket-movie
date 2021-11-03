import {GET_CAROUSEL} from "../types/Type";

const initialState = {
    arrCarousel: [
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": "https://i0.wp.com/www.courageouschristianfather.com/wp-content/uploads/2018/03/Paul_970x418banner_mar23.jpg?resize=800%2C345&ssl=1"
        },
        {
            "maBanner": 2,
            "maPhim": 1282,
            "hinhAnh": "http://www.tbnafrica.org/images/static/programme-cover-1584379116.jpg"
        },
        {
            "maBanner": 3,
            "maPhim": 1282,
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
        },
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

