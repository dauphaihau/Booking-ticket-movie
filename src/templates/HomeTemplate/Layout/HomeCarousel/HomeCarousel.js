import React, {useEffect} from 'react';

import {Carousel} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getCarouselAction} from "../../../../store/actions/CarouselAction";

const contentStyle = {
    height: '850px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};

function HomeCarousel(props) {

    const {arrCarousel} = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [])

    const renderCarousel = () => {
        return arrCarousel.map((banner, index) => {
            return <div key={index}>
                <div style={{...contentStyle, backgroundImage: `url(${banner.hinhAnh}`}}>
                    <img src={banner.hinhAnh} className='w-full h-full opacity-0' alt="..."/>
                </div>
            </div>
        })
    }

    return (
        <Carousel effect="fade" className='z-0'>
            {renderCarousel()}
        </Carousel>
    );
}

export default HomeCarousel;