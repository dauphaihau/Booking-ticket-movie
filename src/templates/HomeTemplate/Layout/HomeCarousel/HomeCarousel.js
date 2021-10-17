import React, {useEffect} from 'react';
import './HomeCarousel.css'
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
                <div style={{...contentStyle, backgroundSize: 'unset', backgroundImage: `url(${banner.hinhAnh}`}}>
                    <img src={banner.hinhAnh} className='opacity-0' alt={banner.hinhAnh}/>
                </div>
            </div>
        })
    }

    return (
        <Carousel autoplay effect="fade"
            // style={{width: '100%', padding: 0, margin: 0}}
        >
            {renderCarousel()}
        </Carousel>
    );
}

export default HomeCarousel;