import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

// UI
import {UserOutlined, HomeOutlined, TeamOutlined} from '@ant-design/icons'
import {Layout, Tabs, Tooltip} from 'antd';
import {Button} from "@nextui-org/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// assets , utils
import './Checkout.css'
import screen from '../../assets/img/screen.jpg'
import dataCheckout from '../../assets/data/dataCheckout.json'
import {AUTO_SWITCH_TAB, BOOKING_CHAIR, CLEAR_BOOKING, SWITCH_TAB} from "../../store/types/Type";
import {history} from "../../util/settings";

// Comps
import {getListTicketRoomAction} from "../../store/actions/TicketManagementAction";
import PaymentBookingMobile from "./LayoutMobile/PaymentBookingMobile";


const {TabPane} = Tabs;

function Booking(props) {

    const dispatch = useDispatch();
    const {isLoadingBtn} = useSelector(state => state.LoadingReducer)

    const {userLogin} = useSelector(state => state.UserReducer)
    const {
        detailTicketRoom,
        listBookingChair,
        bookingChairByOtherUser
    } = useSelector(state => state.TicketManagementReducer)

    useEffect(() => {
        dispatch(getListTicketRoomAction(props.match.params.id))
    }, [])

    const {danhSachGhe, thongTinPhim} = detailTicketRoom;

    return <>
        {/*Header*/}
        <div className=' grid grid-cols-3 bg-white items-center'>
            <div>
                <ArrowBackIosNewIcon
                    className='bg-[#f7f7f7] p-[12px] cursor-pointer transition-colors duration-500 ease-in text-[#808089]
                    hover:text-black h-[42px] w-12 mr-2 rounded-xl'
                    onClick={() => {
                        history.push('/');
                        dispatch({type: CLEAR_BOOKING})
                    }}
                />
            </div>
            <p className='col-span-2 font-bold text-[1.2rem] mb-0'>
                {thongTinPhim.tenPhim}
            </p>
        </div>

        {/*Date*/}
        <div>
            <div className='flex flex-row'>
                {dataCheckout.map((item, i) => {
                    return <div key={i} className="
                    bg-[#f7f7f7] rounded-xl
            focus:bg-[#df3663] focus:text-white
            cursor-pointer
            h-[4.5rem] w-16 mt-6
           flex flex-col items-center
            text-black mr-2 mb-2 md:w-auto">
                        <p className='mb-0 mt-[10px] text-gray-300 text-sm focus:text-white'>{item.date.substr(0, 3)}</p>
                        <p className='text-xl'>{item.date.substr(9, 2)}</p>
                    </div>
                })}
            </div>

        </div>
        <div className='flex flex-row'>
            {dataCheckout.slice(0, 4).map((item, i) => {
                return <div key={i} className="bg-[#f7f7f7] rounded-xl
            mt-4
            focus:bg-[#df3663] focus:text-white cursor-pointer
            h-16 w-24
            flex flex-col items-center align-middle
            text-black mr-2 mb-2 w-28 md:w-auto">
                    <p className='mb-0 mt-[10px] font-bold'>{_.orderBy(item.time, (o) => Number(o.time), ['desc'])}</p>
                    <div className='flex'>
                        <ul className="focus:text-white cursor-pointer flex mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500 m-0">
                            <li>{item.price}</li>
                            <li>&middot;</li>
                            <li>3D</li>
                        </ul>
                    </div>
                </div>
            })}
        </div>

        {/*Book Seat*/}
        <div className='container mx-auto mt-5'>
            <div className='flex flex-col'>
                <img className='w-[24rem]' src={screen} alt={screen}/>
                <div className='mt-8 ml-4 ip8:ml-8'>
                    {danhSachGhe.slice(0, 63).map((chair, index) => {
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
                            {(index + 1) % 9 === 0 ? <br/> : ''}
                        </Fragment>
                    })}
                </div>
                <div className="mt-4 mb-4 flex flex-row justify-center">
                    <Tooltip placement="top" title={'Available'}>
                        <button className='chairMini'/>
                    </Tooltip>

                    <Tooltip placement="top" title={'VIP'}>
                        <button className='chairMini vipChair'/>
                    </Tooltip>

                    <Tooltip placement="top" title={'Selected'}>
                        <button className='chairMini bookingChair '/>
                    </Tooltip>

                    <Tooltip placement="top" title={'Select by others'}>
                        <button className='chairMini bookingChairByOtherUser'/>
                    </Tooltip>
                    <Tooltip placement="top" title={'Booked'}>
                        <button className='chairMini bookedChairByUser'>
                            <UserOutlined className='font-bold'/>
                        </button>
                    </Tooltip>
                    <Tooltip placement="top" title={'Booked by others'}>
                        <button className='chairMini bookedChair'>
                            <TeamOutlined className='font-bold'/>
                        </button>
                    </Tooltip>
                </div>
            </div>

            <div className=' w-[96%] flex flex-row'>
                <div className='w-1/2 flex flex-col items-center'>
                    <p className='font-light text-[#bdbdbd] mb-0'>Price: </p>
                    <p className='text-xl font-bold'>
                        {listBookingChair.reduce((sumBill, chair) => {
                            return sumBill += chair.giaVe
                        }, 0).toLocaleString()}đ
                    </p>
                </div>
                <div className='w-1/2'>
                    <Button className='w-full h-[50px]' color="error" auto
                            loading={isLoadingBtn}
                            loaderType="default"
                            onClick={() => {
                                if (_.isEmpty(listBookingChair)) {
                                    alert('dat ghe di ong noi')
                                } else {
                                    dispatch({type: AUTO_SWITCH_TAB})
                                }
                            }}
                    >BOOKING
                    </Button>
                </div>
            </div>
        </div>
    </>
}

export default function Checkout_mobile(props) {

    const dispatch = useDispatch();
    const {tabActive} = useSelector(state => state.TicketManagementReducer)

    const renderTabBar = () => (<Layout className='hidden'/>)

    return <div className='pt-6 mx-4'>
        <Tabs
            renderTabBar={renderTabBar}
            activeKey={tabActive} defaultActiveKey="1"
            onChange={(key) => {
                dispatch({
                    type: SWITCH_TAB,
                    numTab: key
                })
            }}>
            <TabPane key="1">
                <Booking {...props}/>
            </TabPane>

            <TabPane key="2">
                {/*<ResultBookingMobile {...props}/>*/}
                <PaymentBookingMobile {...props}/>
            </TabPane>
        </Tabs>
    </div>
};
