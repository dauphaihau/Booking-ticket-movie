import React from 'react';
import './Film.css'
import moment from "moment";
import {NavLink} from "react-router-dom";

export const genreMovie = [
    'Action',
    'Drama',
    'Drama, Comedy',
    'Romantic',
    'Adventure',
    'Comedy',
    'Horror',
    'Fantasy',
    'Comedy, Action',
    'Romantic, Horror',
]

function Film({film}) {
    return <>
        <div className="movie-poster relative mr-2 mb-0 md:mb-2   w-[6.5rem] ip8:w-28 md:w-auto">
            <img src={film.hinhAnh} className="inline h-40 w-28 rounded-xl md:w-[17rem] md:h-[17rem]"
                 alt={film.tenPhim}/>
            <div className="absolute text-white text-center flex flex-col  justify-center items-center">
                <a href={film.trailer} className='hidden md:block'>
                    <i className="text-white text-6xl fa fa-play-circle" aria-hidden="true"/>
                </a>
                <NavLink to={`detail/${film.maPhim}`} className="mt-4 text-white text-xs"
                >VIEW DETAIL</NavLink>
                <p>Released: {moment(film.ngayKhoiChieu).format('LL')}</p>
            </div>
        </div>

        <div className='md:hidden mb-4'>
            <p className='font-bold  ip8:block text-black'>{film.tenPhim.length > 11 ? <span>{film.tenPhim.slice(0, 11)}...</span> : <span>{film.tenPhim}</span>}</p>
            <div>
                <p>{genreMovie[Math.floor(Math.random() * genreMovie.length)]}</p>
            </div>
        </div>
    </>
}

export default Film;