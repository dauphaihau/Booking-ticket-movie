import React from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import {useDispatch} from "react-redux";
import {SET_FILM_COMING_SOON, SET_FILM_NEW_IN} from "../../store/types/Type";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import _ from "lodash";

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

    const renderListFilms = () => {
        return arrFilms.map((film, index) => {
            return <div key={index}>
                <Film film={film}/>
            </div>
        })
    }

    const renderListFilmsComing = () => {
        return _.filter(arrFilms, (o) => !o.dangChieu).map((film, index) => {
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
                    prevArrow: true,
                    nextArrow: true,
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
        ]
    };

    const settingsMobile = {
        infinite: true,
        speed: 1500,
        className: "center",
        rows: 1,
        slidesPerRow: 3,
        responsive: [
            {
                breakpoint: 414,
                settings: {
                    rows: 1,
                }
            },
            {
                breakpoint: 375,
                settings: {
                    rows: 1,
                }
            }

        ]
    };

    return <>
        <div className='hidden md:block overflow-x-hidden overflow-y-hidden mb-12'>
            <div className='flex mb-4'>
                <button
                    className="bg-white mr-4 hover:bg-[#eaeaea] hover:text-black text-[#666666]
                    transition-colors ease-in-out duration-150
                    font-semibold py-2 px-4 rounded
                    "
                    onClick={() => {
                        dispatch({type: SET_FILM_NEW_IN})
                    }}>
                    NEW IN
                </button>
                <button
                    className="bg-white hover:bg-[#eaeaea] hover:text-black text-[#666666]
                    transition-colors ease-in-out duration-300
                    font-semibold py-2 px-4 rounded
                    "
                    onClick={() => {
                        dispatch({type: SET_FILM_COMING_SOON})
                    }}>
                    COMING SOON
                </button>
            </div>
            <Slider {...settings}>
                {renderListFilms()}
            </Slider>
        </div>

        {/*Mobile*/}
        <div className='md:hidden overflow-x-hidden overflow-y-hidden'>
            <div className='mb-8'>
                <h1 className='text-[1rem] font-bold'>NEW IN</h1>
                <Slider {...settingsMobile}>
                    {renderListFilms()}
                </Slider>
            </div>

            <h1 className='text-[1rem] font-bold'>COMING SOON</h1>
            <Slider {...settingsMobile}>
                {renderListFilmsComing()}
            </Slider>
        </div>
    </>
}


export default MultipleRowSlick