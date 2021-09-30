import React, {Component} from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'
import FilmFlip from "../Film/Film_Flip";
import {useDispatch} from "react-redux";
import {SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU} from "../../store/types/Type";

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{...style, display: "inline", background: 'black'}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} ${styleSlick['slickPrev']}`}
            style={{...style, display: "block", background: "black"}}
            onClick={onClick}
        />
    );
}

function MultipleRowSlick(props) {

    const dispatch = useDispatch();

    const renderListFilms = () => {

        return props.arrFilms.slice(0, 12).map((film, index) => {
            return <div key={index} className={`${styleSlick['width-item']}`}>
                <Film film={film}/>
                {/*<FilmFlip film={film}/>*/}
            </div>
        })
    }

    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };

    return (
        <div>
            <button type="button"
                    className="px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-5"
                    onClick={() => {
                        dispatch({type: SET_FILM_DANG_CHIEU})
                    }}

            >Phim Dang Chieu
            </button>
            <button type="button"
                    className="px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border"
                    onClick={() => {
                        dispatch({type: SET_FILM_SAP_CHIEU})
                    }}

            >Phim Sap Chieu
            </button>
            <Slider {...settings}>
                {renderListFilms()}
                {renderListFilms()}
                {renderListFilms()}
                {renderListFilms()}
                {renderListFilms()}
                {renderListFilms()}
                {renderListFilms()}
                {renderListFilms()}
            </Slider>
        </div>
    );
}


export default MultipleRowSlick