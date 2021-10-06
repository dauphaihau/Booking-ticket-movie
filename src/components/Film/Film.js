import React from 'react';
import {history} from "../../util/settings";
import './Film.css'
import moment from "moment";

function Film(props) {

    const {film} = props;

    console.log('film', film)

    return (
        //     <div className=" m-3 h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        //
        //         <div style={{background:`url(${film.hinhAnh}), url(https://picsum.photos/300`,
        //         backgroundPosition:'center', backgroundSize:'100%,100%'
        //         }}>
        //             <img src={film.hinhAnh} alt={film.hinhAnh}
        //                  className='opacity-0 w-full'
        //                  style={{height:300}}
        //                  />
        //         </div>
        //
        //         <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3 h-16">{film.tenPhim}</h1>
        //
        // <p className="leading-relaxed mb-3 h-16">{film.moTa.length > 100 ? <span>{film.moTa.slice(0,100)}...</span>: <span>{film.moTa}</span>}</p>
        //
        //         <a className="text-indigo-500 inline-flex items-center"
        //         onClick={() => {
        //           history.push(`detail/${film.maPhim}`)
        //         }}
        //         >Đặt vé
        //             <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
        //                  fill="none" strokeLinecap="round" strokeLinejoin="round">
        //                 <path d="M5 12h14"/>
        //                 <path d="M12 5l7 7-7 7"/>
        //             </svg>
        //         </a>
        //     </div>
        <div className="movie-poster relative mr-2">
            <img src={film.hinhAnh} className="w-full inline"/>
            <div className="absolute text-white text-center flex flex-col  justify-center items-center">
                <a href={film.trailer}>
                    <i className="fa fa-play border rounded-circle"/>
                </a>
                <a className="text-xs"
                   onClick={() => {
                       history.push(`detail/${film.maPhim}`)
                   }}
                >BOOKING TICKET</a>
                <p>Release: {moment(film.ngayKhoiChieu).format('LL')}</p>
            </div>
        </div>
    );
}

export default Film;