import React, {useEffect} from 'react';
import {CustomCard} from "@tsamantanis/react-glassmorphism";
import '../../assets/styles/circle.css'
import {Tabs, Radio, Space, Rate} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getDetailFilmsAction} from "../../store/actions/FilmsAction";
import moment from "moment";
import {NavLink} from "react-router-dom";

const {TabPane} = Tabs;

function Detail(props) {

    const dispatch = useDispatch();
    const {detailFilm} = useSelector(state => state.FilmsReducer)

    console.log('detail-film', detailFilm)

    useEffect(() => {
        let {id} = props.match.params;

        dispatch(getDetailFilmsAction(id))
    }, [])

    return (
        <div style={{
            backgroundImage: `url(${detailFilm.hinhAnh})`,
            backgroundSize: '100%',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <CustomCard style={{paddingTop: 150, minHeight: '100vh'}}
                        effectColor="#fff" // required
                        color="#000000" // default color is white
                        blur={10} // default blur value is 10px
                        borderRadius={1}
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-4 col-start-4">
                        <div className='grid grid-cols-3'>
                            <img className='col-span-1' src={detailFilm.hinhAnh} style={{width: 300, height: 300}}
                                 alt={detailFilm.tenPhim}/>
                            <div className='ml-4 col-span-2'>
                                <p className='text-sm'>{moment(detailFilm.ngayKhoiChieu).format('DD.MM.YY')}</p>
                                <p className='leading-3 text-4xl'>{detailFilm.tenPhim}</p>
                                <p>{detailFilm.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 ml-24">
                        <h1 style={{marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15}}>Đánh giá</h1>
                        <h1 style={{marginLeft: '5%'}} className='text-gray-400 text-2xl'>
                            <Rate style={{color: '#78ed87', fontSize: 38}}
                                  allowHalf value={detailFilm.danhGia / 2}/>
                        </h1>
                        <div className={`c100 p${detailFilm.danhGia * 10} big green`}>
                            <span>{detailFilm.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"/>
                                <div className="fill"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-20 w-2/3 ml-72 mx-auto container bg-white px-5 py-5 rounded-lg'>
                    <Tabs defaultActiveKey='1' centered>
                        <TabPane tab="Lịch chiếu" key="1">
                            <div>
                                <Tabs tabPosition={'left'}>
                                    {detailFilm.heThongRapChieu?.map((cinema, index) => {
                                        return <TabPane key={index}
                                                        tab={
                                                            <div className='flex flex-row justify-center items-center'>
                                                                <img src={cinema.logo} width={50} height={50}
                                                                     alt={cinema.logo}/>
                                                                <div className='text-center ml-2'>
                                                                    {cinema.tenHeThongRap}
                                                                </div>
                                                            </div>
                                                        }>
                                            {cinema.cumRapChieu.map((cumRap, index) => {
                                                return <div className='mt-5' key={index}>
                                                    <div className='flex flex-row  mt-2'>
                                                        <img width={50} height={50} src={cumRap.hinhAnh}
                                                             alt={cumRap.tenCumRap}/>
                                                        <div className='ml-5'>
                                                            <p className='text-xl font-bold leading-3'>{cumRap.tenCumRap}</p>
                                                            <p>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-4'>
                                                        {cumRap.lichChieuPhim.slice(0, 4).map((showtime, index) => {
                                                            return <div key={index} className='col-span-1 text-green-800 mt-2'>
                                                                <NavLink to={`/checkout/${showtime.maLichChieu}`}>
                                                                    {moment(showtime.ngayKhoiChieu).format('hh:mm A')}
                                                                </NavLink>
                                                            </div>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}

                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" style={{minHeight: 300}}>
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3" style={{minHeight: 300}}>
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs></div>

            </CustomCard>
        </div>);
}

export default Detail;