import React, {useEffect, useState} from 'react';
import './HomeCarousel.css'
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import {getCarouselAction} from "../../../../store/actions/CarouselAction";
import {Rate} from "antd";
import {Button} from "@nextui-org/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
    const [slider2, setSlider2] = useState(null);

    const {arrCarousel} = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [])

    return (
        <div className="slider-wrapper" id='home'>

            <div className="thumbnail-slider-wrap">
                <Slider{...settingsThumbs}
                       asNavFor={nav1}
                       ref={slider => (setSlider2(slider))}
                >
                    {arrCarousel.map((banner, index) =>

                        <div className="p-[5px] md:p-4 slick-slide  mt-4" key={index}>

                            <div
                                className='relative rounded-full
                                before:absolute before:top-0 before:left-0 before:z-10
                                before:w-full before:h-full
                                before:bg-gradient-to-t from-black
                                before:rounded-2xl
                                '
                            >
                                {/*Ipad - Desktop*/}
                                <div
                                    className='hidden md:block text-white absolute z-20 after:contents top-[14%] left-[5%]'>
                                    <h1 className='mb-0 md:text-[2.5rem] lg:text-[4.5rem] text-white'>Son of God</h1>
                                    <div className='flex font-bold mb-4 items-center'>
                                        <Rate disabled defaultValue={4} className='mr-4
                                        {/*text-[#df3663]*/}
                                        '/>
                                        <p className='mr-8 mb-0 md:pt-[6px]'>2021</p>
                                        <p className='mr-8 mb-0 md:pt-[6px]'>Drama</p>
                                        <p className='mr-8 mb-0 md:pt-[6px]'>Christopher Spencer</p>
                                    </div>
                                    <p className='mt-4 mb-4 md:w-4/5 lg:w-[35.33%]'>A depiction of the last twelve hours in
                                        the life of
                                        Jesus of Nazareth, on the day of his crucifixion in Jerusalem. The story opens
                                        in the Garden of Olives where Jesus has gone to pray after the Last Supper.
                                        Betrayed by Judas Iscariot, the controversial Jesus--who has performed
                                        'miracles' and has publicly announced that he is 'the Son of God'--is arrested
                                        and taken back within the city walls of Jerusalem.</p>
                                    <div className='flex'>
                                        <p className='mr-4
                                        font-bold
                                        '>Starring</p>
                                        <p className='
                                        {/*text-[#df3663]*/}
                                        {/*text-[#2a72eb]*/}
                                         '>Jesus Christ , saint Mary</p>
                                    </div>
                                    <Button
                                        icon={<PlayArrowIcon className='text-white'/>}
                                        shadow color="primary" auto>
                                        WATCH TRAILER
                                    </Button>
                                </div>

                                {/*Mobile*/}
                                <div className='md:hidden text-white absolute z-20 after:contents top-[62%] left-[5%]'>
                                    <h1 className='mb-0 text-[1.3rem] text-white'>Son of God</h1>
                                    <div className='flex'>
                                        <p className='mr-4 font-bold'>Starring</p>
                                        <p className='text-[#df3663] font-bold'>Jesus Christ , Saint Mary</p>
                                    </div>
                                    <Button
                                        size='mini'
                                        icon={<PlayArrowIcon className='text-white'/>}
                                        shadow color="error" auto>
                                        WATCH TRAILER
                                    </Button>
                                </div>

                                <img
                                    src={banner.hinhAnh}
                                    style={{zIndex: '-1'}}
                                    className="
                                rounded-2xl
                                z-[-1px]
                                mt-12 h-[300px] lg:h-[700px] md:h-[500px]
                                 w-full slick-slide-image
                                "/>
                            </div>
                        </div>
                    )}
                </Slider>
            </div>
        </div>
    );
}

export default HomeCarousel;