import React, {Fragment, useEffect} from 'react';
import {UserOutlined, HomeOutlined, TeamOutlined} from '@ant-design/icons'
import screen from '../../assets/img/screen.jpg'
import {bookingAction, getListTicketRoomAction} from "../../store/actions/TicketManagementAction";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import './Checkout.css'
import {BOOKING_CHAIR, SWITCH_TAB} from "../../store/types/Type";
import _ from "lodash";
import {DataBooking} from "../../_core/models/dataBooking";
import {Tabs, Tooltip} from 'antd';
import {connection} from "../../index";
import {history} from "../../util/settings";
import {Avatar, Button} from "@nextui-org/react";


import {NavLink} from "react-router-dom";
import ResultBooking from "./ResultBooking";

const {TabPane} = Tabs;

function Booking(props) {

    const dispatch = useDispatch();

    const {userLogin} = useSelector(state => state.UserReducer)
    const {
        detailTicketRoom,
        listBookingChair,
        bookingChairByOtherUser
    } = useSelector(state => state.TicketManagementReducer)

    console.log('detail-ticket-room', detailTicketRoom)

    useEffect(() => {
        dispatch(getListTicketRoomAction(props.match.params.id))
    }, [])

    const {danhSachGhe, thongTinPhim} = detailTicketRoom;

    return (
        <div className='container mx-auto min-h-screen mt-5'>
            <div className=''>
                {/*<div className='col-span-9 mr-16'>*/}
                <div className=''>
                    <div className='flex flex-col'>
                        <img width={2000} src={screen} alt={screen}/>
                        <div className='mt-12'>
                            {danhSachGhe.slice(0, 60).map((chair, index) => {
                                let classVipChair = chair.loaiGhe === 'Vip' ? 'vipChair' : '';
                                let classBookedChair = chair.daDat === true ? 'bookedChair' : '';
                                let classBookingChair = '';
                                let classBookedChairByUser = '';
                                let classBookingChairByOtherUser = '';


                                if (userLogin.taiKhoan === chair.taiKhoanNguoiDat) {
                                    classBookedChairByUser = 'bookedChairByUser';
                                }

                                let indexBookingChairByOtherUser = bookingChairByOtherUser.findIndex(bchair => bchair.maGhe === chair.maGhe);
                                if (indexBookingChairByOtherUser !== -1) {
                                    classBookingChairByOtherUser = 'bookingChairByOtherUser'
                                }


                                let indexBookingChair = listBookingChair.findIndex(bchair => bchair.maGhe === chair.maGhe);
                                if (indexBookingChair !== -1) {
                                    classBookedChair = 'bookingChair'
                                }

                                return <Fragment key={index}>
                                    <button
                                        disabled={chair.daDat || classBookingChairByOtherUser !== ''} key={index}
                                        className={`
                                        chairMini ${classVipChair} ${classBookedChair} ${classBookingChair}
                                        ${classBookedChairByUser} ${classBookingChairByOtherUser}
                                        `}
                                        onClick={() => {
                                            // dispatch(bookingChairAction(chair, props.match.params.id))
                                            dispatch({
                                                type: BOOKING_CHAIR,
                                                bookingChair: chair
                                            })
                                        }}
                                    >
                                        {chair.daDat ? classBookedChairByUser !== '' ?
                                                <UserOutlined className='font-bold'/> : <TeamOutlined/>
                                            : classBookingChairByOtherUser !== '' ? <HomeOutlined/>
                                                : chair.stt}
                                    </button>
                                    {(index + 1) % 10 === 0 ? <br/> : ''}
                                </Fragment>
                            })}
                        </div>
                        <div className="mt-12 flex flex-row">
                            <Tooltip placement="top" title={'Ghế chưa đặt'}>
                                <button className='chairMini'/>
                            </Tooltip>

                            <Tooltip placement="top" title={'Ghế vip'}>
                                <button className='chairMini vipChair'/>
                            </Tooltip>

                            <Tooltip placement="top" title={'Ghế đang đặt'}>
                                <button className='chairMini bookingChair '/>
                            </Tooltip>

                            <Tooltip placement="top" title={'Ghế người dùng khác đang đặt'}>
                                <button className='chairMini bookingChairByOtherUser'/>
                            </Tooltip>
                            <Tooltip placement="top" title={'Ghế người dùng đã đặt'}>
                                <button className='chairMini bookedChairByUser'>
                                    <UserOutlined className='font-bold'/>
                                </button>
                            </Tooltip>
                            <Tooltip placement="top" title={'Ghế người dùng khác đã đặt'}>
                                <button className='chairMini bookedChair'>
                                    <TeamOutlined className='font-bold'/>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className=' mx-auto pb-20'>
                    <div className='flex'>
                        <div className='lg:ml-3'>
                            <h3 className="text-xl mt-5">{thongTinPhim.tenPhim}</h3>
                            <p>{thongTinPhim.diaChi}</p>
                            <p>{thongTinPhim.tenRap}</p>
                            <p>Ngày khởi chiếu: {moment(thongTinPhim.ngayKhoiChieu).format('L')}</p>
                        </div>
                    </div>
                    <Button
                        style={{width: '100%'}}
                        shadow color="error" auto
                        onClick={() => {
                            const dataBooking = new DataBooking()
                            dataBooking.maLichChieu = props.match.params.id;
                            dataBooking.danhSachVe = listBookingChair

                            dispatch(bookingAction(dataBooking))
                        }}
                    >
                        <div className='flex flex-row justify-between'>
                            <span className='text-xl mr-4'>Đặt vé</span>
                            <span className='text-xl font-bold'>
                                {listBookingChair.reduce((sumBill, chair) => {
                                    return sumBill += chair.giaVe
                                }, 0).toLocaleString()}đ
                            </span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function Checkout_mobile(props) {

    const dispatch = useDispatch();
    const {tabActive} = useSelector(state => state.TicketManagementReducer)
    const {userLogin} = useSelector(state => state.UserReducer)

    useEffect(() => {
        dispatch({
            type: SWITCH_TAB,
            numTab: '2'
        })
    }, [])

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ?
            <Fragment>
                <div className='flex flex-row items-center mb-4 ml-8'>
                    {/*<div>Xin chào, {userLogin.hoTen} </div>*/}
                    <Avatar style={{marginLeft: 15, marginRight: 35, cursor: 'pointer'}} squared
                            text={userLogin.hoTen?.substr(0, 1)}
                            onClick={() => {
                                history.push(`/setting/profile/${userLogin.taiKhoan}`)
                            }}
                    />
                </div>
            </Fragment> : ''}

    </Fragment>

    return <div className='pt-8 mx-8'>
        <Tabs tabBarExtraContent={operations}
              activeKey={tabActive} defaultActiveKey="2"
              onChange={(key) => {
                  dispatch({
                      type: SWITCH_TAB,
                      numTab: key
                  })
              }}>
            <TabPane
                tab={
                    <div className='text-center flex justify-center items-center'>
                        <NavLink to='/home'><i className="fas fa-arrow-left"/></NavLink>
                    </div>
                }
                key="1">
            </TabPane>

            <TabPane tab="01 CHỌN GHẾ VÀ THANH TOÁN" key="2">
                <Booking {...props}/>
            </TabPane>

            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="3">
                <ResultBooking {...props}/>
            </TabPane>
        </Tabs>
    </div>
};
