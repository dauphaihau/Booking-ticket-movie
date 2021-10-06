import React, {Component} from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'
import {useDispatch, useSelector} from "react-redux";
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

    const {dangChieu, sapChieu} = useSelector(state => state.FilmsReducer)
    let activeClassDC = dangChieu === true ? 'active-film' : 'non-active-film'
    let activeClassSC = sapChieu === true ? 'active-film' : 'non-active-film'

    const dispatch = useDispatch();

    const renderListFilms = () => {

        return props.arrFilms.slice(0, 12).map((film, index) => {
            // return <div key={index} className={`${styleSlick['width-item']}`}>
            return <div key={index}>
                <Film film={film}/>
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
                    className={`${activeClassDC} mb-4 px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-5 border rounded-xl` }
                    onClick={() => {
                        dispatch({type: SET_FILM_DANG_CHIEU})
                    }}
            >NEW IN
            </button>
            <button type="button"
                    className={`${activeClassSC} mb-4 px-8 py-3 font-semibold text-gray-800 border-gray-800 border rounded-xl` }
                    onClick={() => {
                        dispatch({type: SET_FILM_SAP_CHIEU})
                    }}
            >COMING SOON
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