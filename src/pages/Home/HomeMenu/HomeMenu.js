import React, {Fragment, memo, useEffect, useState} from 'react';
import {Rate, Tabs} from 'antd';
import moment from "moment";
import {Button} from "@nextui-org/react";
import {history} from "../../../util/settings";
import TimerIcon from '@mui/icons-material/Timer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const {TabPane} = Tabs;

function HomeMenu({arrCinema}) {
    useEffect(() => {
        window.onload = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.onresize = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    }, [])

    const [state, setState] = useState({
        tabPosition: 'left',
        width: window.innerWidth,
        height: window.innerHeight
    })

    if (state.width <= 768) {
        setState({
            tabPosition: 'top'
        })
    }

    const {tabPosition} = state;

    const renderCinemaSystem = () => {
        return arrCinema.map((cinema, index) => {
            return <TabPane tab={<img alt='cinema' src={cinema.logo} className='rounded-full' width={50}/>} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {cinema.lstCumRap.slice(0, 6).map((cumRap, index) => {
                        return (
                            <TabPane
                                tab={
                                    <div style={{width: 300, display: 'flex'}} className='text-left'>
                                        <img src={cumRap.hinhAnh} alt={cumRap.tenCumRap} width={50}
                                             className='rounded-md'/> <br/>
                                        <div>
                                            <div className='ml-3'>{cumRap.tenCumRap.length > 35 ?
                                                <span className='font-bold'>{cumRap.tenCumRap.slice(0, 30)}...</span> :
                                                <span className='font-bold'>{cumRap.tenCumRap}</span>}
                                                {cumRap.diaChi.length > 35 ? <p>{cumRap.diaChi.slice(0, 30)}...</p> :
                                                    <p>{cumRap.diaChi}</p>}
                                            </div>
                                        </div>
                                    </div>
                                }
                                key={index}>
                                {cumRap.danhSachPhim?.slice(0, 4).map((film, index) => {
                                    console.log('film', film)
                                    return <Fragment key={index}>
                                        <div className="my-5 ">
                                            <div className="flex ">
                                                <img src={film.hinhAnh} alt={film.tenPhim}
                                                     className='rounded-md md:w-[111px] w-[8.6rem] md:h-[111px] h-[8.6rem]'
                                                     onError={(e) => {
                                                         e.target.onerror = null;
                                                         e.target.src = "https://picsum.photos/200/200"
                                                     }}
                                                />
                                                <div className="ml-3">
                                                    <h1 className="text-lg lg:text-2xl font-sans">{film.tenPhim}</h1>
                                                    <p className='text-xs flex items-center cursor-pointer transition-colors duration-300 hover:text-blue-400"
                                                    ' onClick={() => {
                                                        history.push(`detail/${film.maPhim}`)
                                                    }}>FULL SYNOPSIS<ArrowForwardIosIcon
                                                        className='ml-2 h-[12px] w-[12px]'/>
                                                    </p>

                                                    {/*Mobile*/}
                                                    <div className='md:hidden'>
                                                        <Rate disabled defaultValue={4}
                                                              className='mr-4'/>
                                                    </div>

                                                    <div
                                                        className='hidden md:block flex flex-row flex-wrap items-center'>
                                                        <TimerIcon/> <span style={{fontSize: 12}}>VIEWING TIMES</span>
                                                        {film.lstLichChieuTheoPhim.slice(0, 4).map((showtime, index) => {
                                                            return <Button className='
                                                            {/*mr-4 mt-2*/}
                                                            ml-4
                                                            ' size='small' shadow
                                                                           key={index}
                                                                           color="primary" auto
                                                                           onClick={() => {
                                                                               history.push(`/checkout/${showtime.maLichChieu}`)
                                                                           }}
                                                            >
                                                                {moment(showtime.ngayChieuGioChieu).format('hh:mm A')}
                                                            </Button>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                })}
                            </TabPane>
                        )
                    })}
                </Tabs>
            </TabPane>
        })
    }

    return (
        <>
            <Tabs tabPosition={tabPosition}>
                {renderCinemaSystem()}
            </Tabs>
        </>
    );
}

export default memo(HomeMenu);