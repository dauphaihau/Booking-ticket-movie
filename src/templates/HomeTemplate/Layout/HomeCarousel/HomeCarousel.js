import React, {useEffect, useState} from 'react';
import './HomeCarousel.css'
import {Carousel} from 'antd';
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import {getCarouselAction} from "../../../../store/actions/CarouselAction";


const settingsThumbs = {
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    swipeToSlide: true,
    centerPadding: '48px',
    centerMode: true,
    autoplay: true,
    pauseOnHover: true,
    infinite: true,

    responsive: [
        {
            breakpoint: 414,
            settings: {
                centerMode: true,
                infinite: true,
                centerPadding: "15px",
            }
        },
        {
            breakpoint: 768,
            settings: {
                centerMode: true,
                // swipeToSlide: true,
                centerPadding: "35px",
            }
        },
        {
            breakpoint: 1280,
            settings: {
                centerMode: true,
                swipeToSlide: true,
                // centerPadding: "60px",
            }
        },

    ]
};


function HomeCarousel() {

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const {arrCarousel} = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [])

    return (
        <div className="slider-wrapper">

            <div className="thumbnail-slider-wrap">
                <Slider
                    {...settingsThumbs}
                    asNavFor={nav1}
                    ref={slider => (setSlider2(slider))}>

                    {arrCarousel.map((banner, index) =>

                        <div className="p-[5px] md:p-4 slick-slide rounded-full rounded mt-4
                                after:contents after:block after:absolute after:top-0 after:left-0 after:z-10
                                after: w-full after:h-full
                                after:bg-gradient-to-t from-black
                        " key={index}>

                            <img
                                style={{ zIndex: '-1'}}
                                src={banner.hinhAnh}
                                className="
                                rounded-2xl
                                mt-12 h-[300px] lg:h-[700px] md:h-[500px]
                                {/*md:p-4*/}
                                 w-full relative slick-slide-image
                                gradientColor
                                {/*after:contents after:block after:absolute after:top-0 after:left-0 after:z-10*/}
                                {/*after: w-full after:h-full*/}
                                {/*after:bg-gradient-to-t from-black*/}

                                "/>
                            {/*content: "";*/}
                            {/*display: block;*/}
                            {/*position: absolute;*/}
                            {/*top: 0;*/}
                            {/*left: 0;*/}
                            {/*z-index: 1;*/}
                            {/*width: 100%;*/}
                            {/*height: 100%;*/}
                            {/*background-image: linear-gradient(to top right,rgba(0,0,0,.7),hsla(0,0%,100%,0));*/}
                            {/*}*/}
                        </div>
                    )}

                </Slider>
            </div>
        </div>
    );
}

export default HomeCarousel;