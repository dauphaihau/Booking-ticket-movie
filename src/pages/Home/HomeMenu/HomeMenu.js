import React, {Fragment, memo, useEffect, useState} from 'react';
import {Tabs, Radio, Space} from 'antd';
import {NavLink} from "react-router-dom";
import moment from "moment";
import {Button} from "@nextui-org/react";
import {history} from "../../../util/settings";

const {TabPane} = Tabs;

function HomeMenu(props) {

    const {arrCinema} = props;

    useEffect(() => {
        window.onload = () => { // run when window load first time ( in case user change size before load screen )
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        // window.onresize = () => { // run when window resize
        //     setState({
        //         width: window.innerWidth,
        //         height: window.innerHeight
        //     })
        // }
    }, [])

    const [state, setState] = useState({
        tabPosition: 'left',
        // tabPosition: 'top',
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
            return <TabPane tab={<img src={cinema.logo} className='rounded-full' width={50}/>} key={index}>
                <Tabs tabPosition={tabPosition}>

                    {cinema.lstCumRap.slice(0, 6).map((cumRap, index) => {
                        return (
                            <TabPane
                                tab={
                                    <div style={{width: 300, display: 'flex'}}>
                                        <img src={cumRap.hinhAnh} alt={cumRap.tenCumRap} width={50}
                                             className='rounded-md'/> <br/>
                                        <div className='ml-3'>{cumRap.tenCumRap};
                                            {/*<p>View detail</p>*/}
                                        </div>
                                    </div>
                                }
                                key={index}>

                                {cumRap.danhSachPhim?.slice(0, 4).map((film, index) => {
                                    return <Fragment key={index}>
                                        <div className="my-5 ">
                                            <div className="flex h-full">
                                                <img src={film.hinhAnh} alt={film.tenPhim} className='rounded-md'
                                                     width={104} height={104}
                                                     // style={{height: 104, width: 104}}
                                                     onError={(e) => {
                                                         e.target.onerror = null;
                                                         e.target.src = "https://picsum.photos/200/200"
                                                     }}
                                                />
                                                <div className="ml-3">
                                                    <h1 className="text-lg lg:text-2xl font-bold">{film.tenPhim}</h1>
                                                    <p>{cumRap.diaChi}</p>
                                                    <div className='flex flex-row flex-wrap'>

                                                        {film.lstLichChieuTheoPhim.slice(0, 4).map((showtime, index) => {
                                                            return <Button className='mr-4 mb-2' size='mini' shadow
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