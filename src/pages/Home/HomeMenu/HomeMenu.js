import React, {Fragment, memo, useState} from 'react';
import {Tabs, Radio, Space} from 'antd';
import {NavLink} from "react-router-dom";
import moment from "moment";

const {TabPane} = Tabs;

function HomeMenu(props) {

    const {arrCinema} = props;

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const {tabPosition} = state;

    const renderCinemaSystem = () => {
        return arrCinema.map((cinema, index) => {
            return <TabPane tab={<img src={cinema.logo} className='rounded-full' width={50}/>} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {cinema.lstCumRap.slice(0,6).map((cumRap, index) => {
                        return (
                            <TabPane
                                tab={
                                    <div style={{width: 300, display: 'flex'}}>
                                        <img src={cumRap.hinhAnh} alt={cumRap.tenCumRap} width={50}/> <br/>
                                        <div className='ml-3'>{cumRap.tenCumRap};
                                            {/*<p>View detail</p>*/}
                                        </div>
                                    </div>
                                }
                                key={index}>
                                {cumRap.danhSachPhim?.slice(0,4).map((film, index) => {
                                    return <Fragment key={index}>
                                        <div className="my-5 border-b-2 border-gray-100">
                                            <div className="flex">
                                                <img src={film.hinhAnh} alt={film.tenPhim}
                                                     style={{height: 100, width: 100}}
                                                     onError={(e)=>{e.target.onerror = null; e.target.src="https://picsum.photos/200/200"}}
                                                />
                                                <div className="ml-3">
                                                    <h1 className="text-2xl font-bold">{film.tenPhim}</h1>
                                                    <p>{cumRap.diaChi}</p>
                                                    <div className='grid grid-cols-6 gap-6'>
                                                        {film.lstLichChieuTheoPhim?.slice(0,6).map((showtimes, index) => {
                                                        return <NavLink className='text-lg' to={`/checkout/${showtimes.maLichChieu}`} key={index}>
                                                            {moment(showtimes.ngayKhoiChieu).format('hh:mm A')}
                                                        </NavLink>
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