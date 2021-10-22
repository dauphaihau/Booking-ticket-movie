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

        // Any user who has successfully booked tickets will reload the page
        // connection.on('datVeThanhCong', () => {
        //     dispatch(getListTicketRoomAction(props.match.params.id))
        // })

        // load immediately all chair of other user booking
        // connection.on('loadDanhSachGhe', props.match.params.id)

        // load list chair from server
        // connection.on('loadDanhSachGheDaDat', (listChairUserBook) => {
        //     console.log('listChairUserBook', listChairUserBook)
        //
        //     listChairUserBook = listChairUserBook.filter(chair => chair.taiKhoan !== userLogin.taiKhoan)
        //
        //     console.log('list-chair-user-book', listChairUserBook)
        //
        //     // combine all chairs of another user to Arr
        //     let arrListChairOtherUserBook = listChairUserBook.reduce((result, item, index) => {
        //         let arrChair = JSON.parse(item.danhSachGhe);
        //         return [...result, ...arrChair]
        //     }, [])
        //
        //     // del chairs have same name props
        //     arrListChairOtherUserBook = _.uniqBy(arrListChairOtherUserBook, 'maGhe')
        //
        //     dispatch({
        //         type: SET_LIST_CHAIR_OTHER_USER_BOOKING,
        //         arrListChairOtherUserBook
        //     })
        // })

        // window.addEventListener('beforeunload', clearChair);
        //
        // return () => {
        //     clearChair();
        //     window.removeEventListener('beforeunload', clearChair)
        // }

    }, [])

    // const clearChair = (event) => {
    //   connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
    // }

    const {danhSachGhe, thongTinPhim} = detailTicketRoom;

    return (
        <div className='xl:container mx-auto min-h-screen mt-5'>
            <div className='grid grid-cols-none xl:grid-cols-12'>
                <div className='xl:col-span-9 xl:mr-16'>
                    <div className='flex flex-col'>
                        <img width={1000} src={screen} alt={screen}/>
                        <div className='mx-auto xl:ml-12 mt-20'>
                            {danhSachGhe.map((chair, index) => {
                                let classVipChair = chair.loaiGhe === 'Vip' ? 'vipChair' : '';
                                let classBookedChair = chair.daDat === true ? 'bookedChair' : '';
                                let classBookingChair = '';
                                let classBookedChairByUser = '';
                                let classBookingChairByOtherUser = '';
                                let classChair = '';
                                if (window.innerWidth <= 768) {
                                    classChair = 'chairMini'
                                } else {
                                    classChair = 'chair'
                                }

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
                                        className={` ${classChair}
                                         ${classVipChair} ${classBookedChair} ${classBookingChair}
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
                                    {(index + 1) % 20 === 0 ? <br/> : ''}
                                </Fragment>
                            })}
                        </div>
                        <div className="mt-4 xl:mt-20 mx-6 xl:ml-12">
                            <table className="divide-y divide-gray-200 lg:w-11/12">
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
                                        <button className='lg:w-[35px] lg:h-[35px] chairMini'/>
                                    </td>
                                    <td>
                                        <button className='lg:w-[35px] lg:h-[35px] chairMini vipChair'/>
                                    </td>
                                    <td>
                                        <button className='lg:w-[35px] lg:h-[35px] chairMini bookingChair '/>
                                    </td>
                                    <td>
                                        <button className='lg:w-[35px] lg:h-[35px] chairMini bookingChairByOtherUser'/>
                                    </td>
                                    <td>
                                        <button className='lg:w-[35px] lg:h-[35px] chairMini bookedChairByUser'>
                                            <UserOutlined className='font-bold'/>
                                        </button>
                                    </td>
                                    <td>
                                        <button className='lg:w-[35px] lg:h-[35px] chairMini bookedChair'>
                                            <TeamOutlined className='font-bold'/>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='xl:col-span-3 min-h-screen mx-6 lg:mx-0 xl:ml-12 mt-6'>
                    <div className='flex flex-row xl:block'>
                        <figure>
                            <img className='rounded-xl w-full' src={thongTinPhim.hinhAnh} alt={thongTinPhim.tenPhim}/>
                        </figure>
                        <div className='ml-8 xl:ml-0'>
                            <h3 className="text-xl xl:mt-5">{thongTinPhim.tenPhim}</h3>
                            <p>{thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
                            <p>Ngày khởi chiếu: {moment(thongTinPhim.ngayKhoiChieu).format('L')}</p>
                            <hr/>
                            <div className='my-5'>
                                <div className='w-full'>
                                    <p className='text-xl md:mb-[13px]'>Ghế bạn chọn</p>
                                    <div className='flex flex-row'>
                                        <div
                                            className={`lg:chair chairMini bookingChair vipChair flex justify-center items-center p-2`}/>
                                        {_.filter(listBookingChair, ['loaiGhe', 'Vip']).reduce((sumBill, chair, index) => {
                                            return sumBill += chair.giaVe
                                        }, 0).toLocaleString()}đ
                                        <div
                                            className={`lg:chair chairMini bookingChair flex justify-center items-center p-2 ml-8`}/>
                                        {_.filter(listBookingChair, ['loaiGhe', 'Thuong']).reduce((sumBill, chair, index) => {
                                            return sumBill += chair.giaVe
                                        }, 0).toLocaleString()}đ
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
            </div>
        </div>
    );
}

export default function Checkout(props) {

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
                <div className='flex flex-row items-center mb-4'>
                    <div className='hidden xl:block'>Xin chào, {userLogin.hoTen} </div>
                    <Avatar style={{marginLeft: 15, marginRight: 35, cursor: 'pointer'}} squared
                            text={userLogin.hoTen?.substr(0, 1)}
                            onClick={() => {
                                history.push(`/setting/profile/${userLogin.taiKhoan}`)
                            }}
                    />
                    <button className='transition duration-500 ease-in-out text-black hover:text-blue-300'
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

    return <div className='px-4 xl:px-20 pt-8'>
        <Tabs
            tabBarExtraContent={operations}
            type='line'
            activeKey={tabActive} defaultActiveKey="2"
            onChange={(key) => {
                dispatch({
                    type: SWITCH_TAB,
                    numTab: key
                })
            }}>
            <TabPane tab={
                <div className='text-center flex justify-center items-center'>
                    <NavLink to='/home'><i className="fas fa-arrow-left"/></NavLink>
                </div>
            } key="1">
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
