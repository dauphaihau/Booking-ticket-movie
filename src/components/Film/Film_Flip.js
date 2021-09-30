import React from 'react';
import './Film_Flip.css'

function FilmFlip(props) {

    const {film} = props;

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div className='w-100' style={{backgroundSize:'100%', backgroundPosition:'center',
                        background: `url(${film.hinhAnh}) no-repeat`}}>
                        <img src={film.hinhAnh} alt="Avatar"
                             className='opacity-0'
                             style={{width: 300, height: 300}}/>
                    </div>
                </div>
                <div className="flip-card-back">
                    <h1>{film.tenPhim}</h1>
                    <button>Đặt vé</button>
                </div>
            </div>
        </div>
    );
}

export default FilmFlip;