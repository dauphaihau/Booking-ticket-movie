import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect} from "react";
import {bookingAction, getListTicketRoomAction} from "../../../store/actions/TicketManagementAction";
import screen from "../../../assets/img/screen.jpg";
import {BOOKING_CHAIR} from "../../../store/types/Type";
import {HomeOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import moment from "moment";
import {Button} from "@nextui-org/react";
import {DataBooking} from "../../../_core/models/dataBooking";

export default function BookingMobile(props) {

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

    return (
        <div className='container mx-auto min-h-screen mt-5'>
            <div className=''>
                <div className=''>
                    <div className='flex flex-col'>
                        <img width={2000} src={screen} alt={screen}/>
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
                        <div className="mt-12 flex flex-row">
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
                </div>
                <div className=' mx-auto pb-20'>
                    <div className='flex'>
                        <div className='lg:ml-3'>
                            <h3 className="text-xl mt-5">{thongTinPhim.tenPhim}</h3>
                            <p>{thongTinPhim.diaChi}</p>
                            <p>{thongTinPhim.tenRap}</p>
                            <p>Release: {moment(thongTinPhim.ngayKhoiChieu).format('L')}</p>
                        </div>
                    </div>
                    <Button
                        style={{width: '100%'}}
                        color="error" auto
                        loading={isLoadingBtn}
                        loaderType="default"
                        onClick={() => {
                            const dataBooking = new DataBooking()
                            dataBooking.maLichChieu = props.match.params.id;
                            dataBooking.danhSachVe = listBookingChair
                            dispatch(bookingAction(dataBooking))
                        }}
                    >
                        <div className='flex flex-row justify-between'>
                            <span className='text-xl mr-4'>BOOKING</span>
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

