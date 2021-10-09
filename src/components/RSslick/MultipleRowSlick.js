import React from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'
import {useDispatch, useSelector} from "react-redux";
import {SET_FILM_COMING_SOON, SET_FILM_NEW_IN} from "../../store/types/Type";

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{...style, display: "block", left: '-50px' }}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{...style, display: "block" }}
            onClick={onClick}
        />
    );
}


function MultipleRowSlick(props) {

    const dispatch = useDispatch();
    const {filmNewIn, filmComingSoon} = useSelector(state => state.FilmsReducer)
    let activeClassDC = filmNewIn === true ? 'active_Film' : 'none_active_Film';
    let activeClassSC = filmComingSoon === true ? 'active_Film' : 'none_active_Film';

    console.log('active-class-sc', activeClassSC)

    const renderListFilms = () => {

        return props.arrFilms.slice(0, 12).map((film, index) => {
            return <div key={index}>
                <Film film={film}/>
            </div>
        })
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 3,

        className: "center variable-width",
        // centerMode: true,
        // centerPadding: "60px",
        rows: 1,
        slidesPerRow: 2,
        autoplay: true,
        pauseOnHover: true,

        variableWidth: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };

    return (
        <div>
            <button
                type="button"
                className={`${styleSlick[activeClassDC]} mb-4 px-8 py-3 font-semibold rounded bg-blue-400 text-white mr-5 border rounded-xl`}
                onClick={() => {
                    dispatch({type: SET_FILM_NEW_IN})
                }}
            >
                 ĐANG CHIẾU
            </button>
            <button
                type="button"
                className={`${styleSlick[activeClassSC]} mb-4 px-8 py-3 font-semibold bg-white text-blue-400 border-gray-400 border rounded-xl`}
                onClick={() => {
                    dispatch({type: SET_FILM_COMING_SOON})
                }}
            >
                SẮP CHIẾU
            </button>
            <Slider {...settings}>
                {renderListFilms()}
                {renderListFilms()}
                {renderListFilms()}
                {renderListFilms()}
            </Slider>
        </div>
    );
}


export default MultipleRowSlick