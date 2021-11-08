import React, {useEffect, useState} from 'react';
import './HomeCarousel.css'
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import {getCarouselAction} from "../../../../store/actions/CarouselAction";
import {Rate} from "antd";
import {Button, Card, Col, Row, Text} from "@nextui-org/react";
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
                centerPadding: "10px",
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
                centerPadding: "30px",
            }
        },

    ]

};


function HomeCarousel() {

    // eslint-disable-next-line no-unused-vars
    const [nav1, setNav1] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [slider2, setSlider2] = useState(null);

    const {arrCarousel} = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [dispatch])

    return (
        <div className="slider-wrapper" id='home'>

            <div className="thumbnail-slider-wrap">
                <Slider{...settingsThumbs}
                       asNavFor={nav1}
                       ref={slider => (setSlider2(slider))}
                >
                    {arrCarousel.map((banner, index) =>
                        <>
                            {/*Ipad - Desktop*/}
                            <div className="p-[5px] md:p-4 slick-slide mt-4 hidden md:block w-full" key={index}>
                                <div className=
                                         'relative rounded-full
                                          before:absolute before:top-0 before:left-0 before:z-10
                                          before:w-full before:h-full
                                          before:bg-gradient-to-t from-black
                                          before:rounded-2xl
                                        '
                                >
                                    <div
                                        className='hidden md:block text-white absolute z-20 after:contents top-[14%] left-[5%]'>
                                        <h1 className='mb-0 md:text-[2.5rem] lg:text-[4.5rem] text-white'>Son of
                                            God</h1>
                                        <div className='flex font-bold mb-4 items-center'>
                                            <Rate disabled defaultValue={4} className='mr-4'/>
                                            <p className='mr-8 mb-0 md:pt-[6px]'>2021</p>
                                            <p className='mr-8 mb-0 md:pt-[6px]'>Drama</p>
                                            <p className='mr-8 mb-0 md:pt-[6px]'>Christopher Spencer</p>
                                        </div>
                                        <p className='mt-4 mb-4 md:w-4/5 lg:w-[35.33%]'>A depiction of the last twelve
                                            hours
                                            in
                                            the life of
                                            Jesus of Nazareth, on the day of his crucifixion in Jerusalem. The story
                                            opens
                                            in the Garden of Olives where Jesus has gone to pray after the Last Supper.
                                            Betrayed by Judas Iscariot, the controversial Jesus--who has performed
                                            'miracles' and has publicly announced that he is 'the Son of God'--is
                                            arrested
                                            and taken back within the city walls of Jerusalem.</p>
                                        <div className='flex mb-4'>
                                            <p className='mr-4 font-bold'>Starring</p>
                                            <p>Jesus Christ , saint Mary</p>
                                        </div>
                                        <Button
                                            icon={<PlayArrowIcon className='text-white'/>}
                                            shadow color="primary" auto>
                                            WATCH TRAILER
                                        </Button>
                                    </div>
                                    <img
                                        src={banner.hinhAnh}
                                        style={{zIndex: '-1'}}
                                        className="
                                        rounded-2xl z-[-1px] mt-12
                                        h-[300px] lg:h-[700px] md:h-[500px] w-full slick-slide-image
                                        "
                                        alt='banner'
                                    />
                                </div>
                            </div>

                            {/*Mobile*/}
                            <div className='pr-[5px] pl-[5px] md:hidden'>
                                <Card width="100%" color="#0f1114"
                                      cover shadow={false}
                                      className='mt-20 slick-slide-image'>
                                    <Card.Header style={{position: 'absolute', zIndex: 1, top: 5}}>
                                        <Col>
                                            <Text
                                                size={12}
                                                weight="bold"
                                                transform="uppercase"
                                                color="#9E9E9E"
                                            >
                                                Your day your way
                                            </Text>
                                            <Text h3 color="white">
                                                Your checklist for better experience
                                            </Text>
                                        </Col>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Image
                                            autoResize={false}
                                            src={banner.hinhAnh}
                                            height={300}
                                            width="100%"
                                            alt="Relaxing app background"
                                        />
                                    </Card.Body>
                                    <Card.Footer
                                        className='blur-none'
                                        blur
                                        border
                                        borderColor="rgba(255, 255, 255, 0.1)"
                                        style={{position: 'absolute', zIndex: 1, bottom: 0}}
                                    >
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <Text color="#d1d1d1" size={12}>
                                                            Son Of God
                                                        </Text>
                                                        <Text color="#d1d1d1" size={12}>
                                                            Drama/Epic
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row justify="flex-end">
                                                    <Button flat auto rounded
                                                            color="#94b8f9"
                                                            onClick={() => window.location.href = 'https://www.youtube.com/watch?v=-Hsl5UG9O_c'}
                                                    >
                                                        <Text size={12} weight="bold" transform="uppercase">
                                                            WATCH TRAILER
                                                        </Text>
                                                    </Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </>
                    )}
                </Slider>
            </div>
        </div>
    );
}

export default HomeCarousel;