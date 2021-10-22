import {
    SET_FILMS,
    SET_DETAIL_FILM,
    SET_FILM_COMING_SOON,
    SET_FILM_NEW_IN,
    SET_INFO_FILM
} from "../types/Type";

const initialState = {
    arrFilms: [
        {
            "maPhim": 5031,
            "tenPhim": "The Croods: New Ag",
            "biDanh": "the-croods-new-ag",
            "trailer": "https://www.youtube.com/watch?v=0qaStyeKpLo&feature=emb_logo",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/the-croods-new-age_gp01.jpg",
            "moTa": "Sinh tồn trong một thế giới tiền sử luôn rình rập hiểm nguy từ đủ loài quái thú hung dữ cho tới thảm họa ngày tận thế, Nhà Croods chưa từng một .",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2021-09-26T17:15:14.433",
            "danhGia": 10,
            "hot": false,
            "dangChieu": true,
            "sapChieu": false
        },
    ],
    dangChieu: true,
    sapChieu: true,
    arrFilmDefault: [],
    detailFilm: {},
    infoFilm: {}
}

export const FilmsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILMS: {
            state.arrFilms = action.arrFilms
            state.arrFilmDefault = state.arrFilms;
            return {...state}
        }

        case SET_FILM_NEW_IN: {
            state.dangChieu = !state.dangChieu;
            state.arrFilms = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu)
            return {...state}
        }

        case SET_FILM_COMING_SOON: {
            state.sapChieu = !state.sapChieu;
            state.arrFilms = state.arrFilmDefault.filter(film => film.sapChieu === film.sapChieu)
            return {...state}
        }

        case SET_DETAIL_FILM: {
            return {...state, detailFilm: action.detailFilm}
        }
        case SET_INFO_FILM: {
            return {...state, infoFilm: action.infoFilm}
        }
        default:
            return state
    }
}

