import React, {Fragment, useState} from 'react';
import moment from "moment";

// UI
import {Rate, Tabs} from 'antd';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// utils
import {history} from "../../../util/settings";

// const
import {genreMovie} from "../../../components/Film/Film";

const {TabPane} = Tabs;

function HomeMenu({arrCinema}) {

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    window.onload = () => {
        let widthScreen = window.innerWidth;
        if (widthScreen <= 768) {
            setState({
                tabPosition: 'top'
            })
        } else {
            setState({
                tabPosition: 'left'
            })
        }
    }

    window.onresize = () => {
        let widthScreen = window.innerWidth;
        if (widthScreen <= 768) {
            setState({
                tabPosition: 'top'
            })
        } else {
            setState({
                tabPosition: 'left'
            })
        }
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
                                                <div className="ml-3 w-[54%] md:w-full">
                                                    <h1 className="text-lg lg:text-2xl font-sans mb-0 md:mb-4">{film.tenPhim}</h1>
                                                    <p className='hidden md:block text-xs flex items-center cursor-pointer transition-colors duration-300 hover:text-blue-400"
                                                    ' onClick={() => {
                                                        history.push(`detail/${film.maPhim}`)
                                                    }}>FULL SYNOPSIS<ArrowForwardIosIcon
                                                        className='ml-2 h-[12px] w-[12px]'/>
                                                    </p>

                                                    {/*Mobile*/}
                                                    <div className='md:hidden '>
                                                        <Rate disabled value={Math.floor(Math.random() * 5) + 1}
                                                              className='mr-4 mb-[7px] text-xs'/>
                                                        <p className='mb-[6px] '>{genreMovie[Math.floor(Math.random() * genreMovie.length)]}</p>
                                                        <p className='text-xs text-black p-[8px] rounded-md bg-[#eaeaea] hover:bg-black hover:text-white w-[68%] ip8:w-[61%] flex items-center cursor-pointer transition-colors duration-300 hover:text-blue-100"'
                                                           onClick={() => {
                                                               history.push(`detail/${film.maPhim}`)
                                                           }}>FULL SYNOPSIS<ArrowForwardIosIcon
                                                            className='ml-2 mt-[-1px] h-[12px] w-[12px]'/>
                                                        </p>
                                                    </div>

                                                    <div
                                                        className='hidden md:block flex flex-row flex-wrap items-center'>
                                                        <TimerIcon/> <span style={{fontSize: 12}}>VIEWING TIMES</span>
                                                        {film.lstLichChieuTheoPhim.slice(0, 4).map((showtime, i) => {
                                                            return <span
                                                                key={i}
                                                                onClick={() => {
                                                                    history.push(`/checkout/${showtime.maLichChieu}`)
                                                                }}
                                                                className='py-2 px-2 mx-2 cursor-pointer text-[12px] bg-[#d8d8d8] text-[#717171] rounded-md transition-colors duration-300 hover:bg-black hover:text-white w-[68%]'>
                                                                {moment(showtime.ngayChieuGioChieu).format('hh:mm A')}
                                                            </span>
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

export default HomeMenu;