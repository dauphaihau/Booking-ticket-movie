import React, {Fragment, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";

// UI
import {UserOutlined, HomeOutlined, TeamOutlined} from '@ant-design/icons'
import {Tabs} from 'antd';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {Menu, Transition} from "@headlessui/react";

// assets , utils
import './Checkout.css'
import screen from '../../assets/img/screen.jpg'
import {BOOKING_CHAIR, CLEAR_BOOKING} from "../../store/types/Type";
import {ACCESS_TOKEN, history, USER_LOGIN} from "../../util/settings";

// Comps
import ResultBooking from "./Layout/ResultBooking";
import CheckoutCard from "./Layout/CheckoutCard";
import {getListTicketRoomAction} from "../../store/actions/TicketManagementAction";

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const {TabPane} = Tabs;

function Booking(props) {

    const dispatch = useDispatch();
    const {userLogin} = useSelector(state => state.UserReducer)
    const {
        detailTicketRoom,
        listBookingChair,
        bookingChairByOtherUser
    } = useSelector(state => state.TicketManagementReducer)

    useEffect(() => {
        dispatch(getListTicketRoomAction(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const {danhSachGhe, thongTinPhim} = detailTicketRoom;

    return (
        <div className='xl:container mx-auto  mt-5  overflow-y-auto overflow-y-hidden'>
            <div className='grid grid-cols-none xl:grid-cols-12 lg:pb-8'>
                <div className='lg:col-span-8 lg:mr-16'>
                    <div className='flex flex-col'>
                        <img width={1000} src={screen} alt={screen}/>
                        <div className='mx-auto lg:mt-12 md:mt-2'>
                            {danhSachGhe.map((chair, index) => {
                                let classVipChair = chair.loaiGhe === 'Vip' ? 'vipChair' : '';
                                let classBookedChair = chair.daDat === true ? 'bookedChair' : '';
                                let classBookingChair = '';
                                let classBookedChairByUser = '';
                                let classBookingChairByOtherUser = '';
                                let classChair;
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
                        <div className="mt-4 lg:mt-12 mx-6">
                            <table className=" md:w-[93%] lg:w-full">
                                <thead className='bg-gray-50 p-5'>
                                <tr>
                                    <th>Available</th>
                                    <th>VIP</th>
                                    <th>Selected</th>
                                    <th>Select by others</th>
                                    <th>Booked</th>
                                    <th>Booked by others</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
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
                <div className='lg:col-span-4 mx-6 lg:mx-0 md:mt-16 lg:mt-6 flex justify-center lg:justify-end'>
                    {/*Card*/}
                    <CheckoutCard props={props} infoMovie={thongTinPhim} listBookingSeats={listBookingChair}/>
                </div>
            </div>
        </div>
    );
}

export default function Checkout(props) {

    const {userLogin} = useSelector(state => state.UserReducer)
    const operations = <Fragment>
        {!_.isEmpty(userLogin) ?
            <Fragment>
                <div className='flex flex-row items-center mb-4 lg:mb-0'>
                    <div className='hidden xl:block'>Hi, {userLogin.hoTen} </div>
                    <div className="relative flex items-center justify-between h-16">
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 lg:ml-0 sm:pr-0 mr-[2px]">
                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button
                                        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({active}) => (
                                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    onClick={() => {
                                                        history.push(`/setting/profile/${userLogin.taiKhoan}`)
                                                    }}
                                                >
                                                    Profile
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    onClick={() => {
                                                        localStorage.removeItem(USER_LOGIN);
                                                        localStorage.removeItem(ACCESS_TOKEN);
                                                        history.push('/');
                                                        window.location.reload();
                                                    }}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </Fragment> : ''}
    </Fragment>

    return <>
        <div className='hidden md:block lg:container lg:mx-auto my-0 lg:px-4 xl:px-0 px-7 mb-32'>
            <Tabs
                tabBarExtraContent={operations}
                type='line'
                defaultActiveKey="2"
            >
                <TabPane tab={
                    <NavLink
                        to='/home'
                        className='mr-20 transition-colors duration-300 text-black'
                    ><ArrowBackIosNewIcon className='h-8 w-8 mt-[-4px] mr-2'/>HOME</NavLink>
                } KEY="1">
                </TabPane>

                <TabPane tab="01 CHOOSE SEATS & PURCHASE" key="2">
                    <Booking {...props}/>
                </TabPane>

                <TabPane tab="02 RESULT" key="3">
                    <ResultBooking {...props}/>
                </TabPane>
            </Tabs>
        </div>
    </>
};
