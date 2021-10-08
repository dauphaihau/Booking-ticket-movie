import React, {useEffect} from "react";
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import {getCarouselAction} from "../../../../store/actions/CarouselAction";

export default function SimpleSlider() {

    const {arrCarousel} = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [])

    console.log('arr-carousel', arrCarousel)

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        pauseOnHover: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const renderBanner = () => {
        return arrCarousel.map((banner, index) => {
            return <div key={index}>
                <div style={{
                        backgroundImage: `url(${banner.hinhAnh}`,
                        height: '850px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        backgroundPosition: 'center',
                        backgroundSize: '100%',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    {/*<img src={banner.hinhAnh} width='100%'*/}
                    {/*     className='w-full h-full opacity-0' alt="..."/>*/}
                </div>
            </div>
        })

    }

    return (
        <Slider {...settings}>
            {renderBanner()}
        </Slider>
    );
}