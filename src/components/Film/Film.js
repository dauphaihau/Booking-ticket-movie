import React from 'react';
import './Film.css'
import moment from "moment";
import {NavLink} from "react-router-dom";

function Film({film}) {

    return <div className="movie-poster relative mr-2 mb-2">
        <img src={film.hinhAnh} className="w-full inline" alt={film.tenPhim}/>
        <div className="absolute text-white text-center flex flex-col  justify-center items-center">
            <a href={film.trailer} className='hidden md:block'>
                <i className="text-white text-6xl fa fa-play-circle" aria-hidden="true"/>
            </a>
            <NavLink to={`detail/${film.maPhim}`} className="mt-4 text-white text-xs"
            >XEM CHI TIẾT</NavLink>
            <p>Khởi chiếu: {moment(film.ngayKhoiChieu).format('L')}</p>
        </div>
    </div>
}

export default Film;