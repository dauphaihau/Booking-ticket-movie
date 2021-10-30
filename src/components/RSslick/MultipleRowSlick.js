import React from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import {useDispatch} from "react-redux";
import {SET_FILM_COMING_SOON, SET_FILM_NEW_IN} from "../../store/types/Type";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <ArrowBackIosNewIcon
            className={`${className} block text-black h-[65px] w-[65px]`}
            style={{...style, left: '-4.5rem',}}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <ArrowForwardIosIcon
            className={`${className} block text-black h-[65px] w-[65px]`}
            style={{...style, right: '-4.5rem'}}
            onClick={onClick}
        />
    );
}


function MultipleRowSlick({arrFilms}) {

    const dispatch = useDispatch();
    console.log('arrFilms', arrFilms)

    const renderListFilms = () => {
        return arrFilms.slice(0, 12).map((film, index) => {
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
        rows: 1,
        slidesPerRow: 2,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
            {
                breakpoint: 414,
                settings: {
                    // centerMode: true,
                    // centerPadding: "60px",
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: false,
                    nextArrow: false,
                    rows: 2,
                    slidesPerRow: 2
                }
            }

        ]
    };

    return <>
        <div className='flex mb-4'>
            <button
                className="bg-white mr-4 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => {
                    dispatch({type: SET_FILM_NEW_IN})
                }}>
                ĐANG CHIẾU
            </button>
            <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => {
                    dispatch({type: SET_FILM_COMING_SOON})
                }}>
                SẮP CHIẾU
            </button>
        </div>
        <Slider {...settings}>
            {renderListFilms()}
        </Slider>
    </>
}


export default MultipleRowSlick