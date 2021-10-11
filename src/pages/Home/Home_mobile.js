import React, {useEffect} from 'react';
import HomeMenu from "./HomeMenu/HomeMenu";
import {useDispatch, useSelector} from "react-redux";
import {getListFilmsAction} from "../../store/actions/FilmsAction";
import {CinemaSystemActions} from "../../store/actions/CinemaSystemActions";
import {getCarouselAction} from "../../store/actions/CarouselAction";
import {Carousel} from "antd";
import '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel.css'
import Slider from "react-slick";
import styleSlick from '../../components/RSslick/MultipleRowSlick.module.css'
import {SET_FILM_COMING_SOON, SET_FILM_NEW_IN} from "../../store/types/Type";
import Film from "../../components/Film/Film";
import MultipleRowSlick from "../../components/RSslick/MultipleRowSlick";
import bgStyle from './HomeMenu/HomeCarousel.module.css'


export default function Home_mobile(props) {

    const dispatch = useDispatch();
    const {arrFilms} = useSelector(state => state.FilmsReducer)
    const {arrCinema} = useSelector(state => state.CinemaSystemReducer)

    useEffect(() => {
        dispatch(getListFilmsAction());
        dispatch(CinemaSystemActions())
    }, [])

    return <div>
        <HomeCarouselMobile/>

        <section className='container mx-auto my-0 px-11 mb-32'>
            <div className="text-gray-600 body-font ">
                <div className="px-5 py-24 mx-auto">
                    <MultipleRowSlick arrFilms={arrFilms}/>
                </div>
            </div>

            <div style={{marginLeft: 0, marginRight: 0}}>
                <HomeMenu arrCinema={arrCinema}/>
            </div>
        </section>
    </div>
}

const contentStyle = {
    height: '600px',
    // height: '800px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'unset',
    backgroundRepeat: 'no-repeat'
};

function HomeCarouselMobile(props) {

    const {arrCarousel} = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [])

    const renderCarousel = () => {
        return arrCarousel.map((banner, index) => {
            return <div key={index} style={{...contentStyle, backgroundImage: `url(${banner.hinhAnh}`}}
                 className='bg-auto'
            >
                <img src={banner.hinhAnh} className='opacity-0' alt={banner.hinhAnh}/>
            </div>
        })
    }

    return (
        <Carousel autoplay effect="fade"
                  style={{width: '100%', padding: 0, margin: 0}}
        >
            {renderCarousel()}
        </Carousel>
    );
}
