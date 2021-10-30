import React, {Fragment, memo, useEffect, useState} from 'react';
import {Tabs} from 'antd';
import moment from "moment";
import {Button} from "@nextui-org/react";
import {history} from "../../../util/settings";

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
                                                    <h1 className="text-lg lg:text-2xl font-bold">{film.tenPhim}</h1>
                                                    <p>Lịch chiếu hiện có: </p>
                                                    <div className='flex flex-row flex-wrap'>

                                                        {film.lstLichChieuTheoPhim.slice(0, 4).map((showtime, index) => {
                                                            return <Button className='mr-4 mt-2' size='mini' shadow
                                                                           key={index}
                                                                           color="primary" auto
                                                                           onClick={() => {
                                                                               history.push(`/checkout/${showtime.maLichChieu}`)
                                                                           }}
                                                            >
                                                                {moment(showtime.ngayKhoiChieu).format('hh:mm A')}
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