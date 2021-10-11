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
import {Tabs} from 'antd';
import {getDataUserAction} from "../../store/actions/UserAction";
import {connection} from "../../index";
import {ACCESS_TOKEN, history, USER_LOGIN} from "../../util/settings";
import {Avatar, Button} from "@nextui-org/react";


import {NavLink} from "react-router-dom";

const {TabPane} = Tabs;

function Booking(props) {

    const dispatch = useDispatch();

    const {userLogin, dataUser} = useSelector(state => state.UserReducer)
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
                        {/*<img width={100} src={screen} alt={screen}/>*/}
                        <div className='mt-20'>
                            {danhSachGhe.map((chair, index) => {
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
                                        chair ${classVipChair} ${classBookedChair} ${classBookingChair}
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
                                    {(index + 1) % 15 === 0 ? <br/> : ''}
                                </Fragment>
                        })}
                        </div>
                        <div className="my-12">
                            <table className="divide-y divide-gray-200" >
                                <thead className='bg-gray-50 p-5'>
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế người dùng khác đang đặt</th>
                                    <th>Ghế người dùng đã đặt</th>
                                    <th>Ghế người dùng khác đã đặt</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr className='text-center'>
                                    <td>
                                        <button className='chair'/>
                                    </td>
                                    <td>
                                        <button className='chair vipChair'/>
                                    </td>
                                    <td>
                                        <button className='chair bookingChair '/>
                                    </td>
                                    <td>
                                        <button className='chair bookingChairByOtherUser'/>
                                    </td>
                                    <td>
                                        <button className='chair bookedChairByUser'>
                                            <UserOutlined className='font-bold'/>
                                        </button>
                                    </td>
                                    <td>
                                        <button className='chair bookedChair'>
                                            <TeamOutlined className='font-bold'/>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='
                {/*min-h-screen*/}
                 mx-auto pb-20'>
                    <div className='flex'>
                        <figure><img src={thongTinPhim.hinhAnh} alt="..." height={250} width={250}/></figure>
                        <div className='ml-3'>
                            <h3 className="text-xl mt-5">{thongTinPhim.tenPhim}</h3>
                            <p>{thongTinPhim.diaChi}</p>
                            <p>{thongTinPhim.tenRap}</p>
                            <p>Ngày khởi chiếu: {moment(thongTinPhim.ngayKhoiChieu).format('L')}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className='my-5'>
                        <div className='w-full'>
                            <p className='text-xl'>Ghế bạn chọn</p>

                            <div className='grid grid-cols-7'>
                                {_.sortBy(listBookingChair, ['stt']).map((bchair, index) => {
                                    return <div className={`chair bookingChair flex justify-center items-center p-2`}
                                                key={index}>
                                        <span>{bchair.stt}</span>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className='col-span-1 mt-5'>
                            <div className='flex flex-row justify-between'>
                                <span className='text-xl'>Tổng tiền: </span>
                                <span className='text-xl font-bold'>
                                {listBookingChair.reduce((sumBill, chair, index) => {
                                    return sumBill += chair.giaVe
                                }, 0).toLocaleString()}đ
                            </span>
                            </div>
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
                        Đặt vé
                    </Button>
                </div>
            </div>
        </div>
    );
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
                    <button
                        onClick={() => {
                            localStorage.removeItem(USER_LOGIN);
                            localStorage.removeItem(ACCESS_TOKEN);
                            history.push('/home');
                            window.location.reload();
                        }}
                    > Đăng xuất
                    </button>
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

function ResultBooking(props) {

    const {dataUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();
    console.log('data-user', dataUser)

    useEffect(() => {
        dispatch(getDataUserAction())
    }, [])

    const renderTicketItem = () => {
        return dataUser.thongTinDatVe.map((ticket, index) => {
            const chairs = _.head(ticket.danhSachGhe)

            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">
                            Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày
                            Chiếu: {moment(ticket.ngayDat).format('DD-MM-YYYY'
                        )}</p>
                        <p className="text-gray-500">Địa điểm: {chairs.tenHeThongRap}</p>
                        <p className="text-gray-500">Tên rạp: {chairs.tenCumRap} -
                            <span className="font-bold">Ghế:</span> {ticket.danhSachGhe.map((chair, index) =>
                                { return <span className="text-blue-500 text-xl">[ {chair.tenGhe} ]</span>}
                            // {return <span className="chair bookingChair p-2" key={index}>  {chair.tenGhe}  </span>}
                            )}
                        </p>
                    </div>
                </div>
            </div>
        })
    }

    return <div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch sử đặt vé
                        khách </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Thông tin địa điểm và thời gian xem
                        phim</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>
    </div>
}