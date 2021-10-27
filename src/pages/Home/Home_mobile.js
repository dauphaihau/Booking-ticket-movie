import React, {useEffect} from 'react';
import HomeMenu from "./HomeMenu/HomeMenu";
import {useDispatch, useSelector} from "react-redux";
import {getListFilmsAction} from "../../store/actions/FilmsAction";
import {CinemaSystemActions} from "../../store/actions/CinemaSystemActions";
import {getCarouselAction} from "../../store/actions/CarouselAction";
import {Carousel} from "antd";
import '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel.css'
import MultipleRowSlick from "../../components/RSslick/MultipleRowSlick";


export default function Home_mobile() {

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
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'unset',
    backgroundRepeat: 'no-repeat'
};

function HomeCarouselMobile() {

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
