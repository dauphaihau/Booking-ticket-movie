import React, {Fragment, useEffect} from 'react';
import {UserOutlined} from '@ant-design/icons'
import screen from '../../assets/img/screen.jpg'
import {BookingAction, GetListTicketRoomAction} from "../../store/actions/TicketManagementAction";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import './Checkout.css'
import {BOOKING_CHAIR} from "../../store/types/Type";
import _ from "lodash";
import {DataBooking} from "../../_core/models/dataBooking";
import {Tabs} from 'antd';
import {getDataUserAction} from "../../store/actions/UserAction";

const {TabPane} = Tabs;

function Checkout(props) {

    const dispatch = useDispatch();

    const {userLogin} = useSelector(state => state.UserReducer)
    const {detailTicketRoom, listBookingChair} = useSelector(state => state.TicketManagementReducer)

    useEffect(() => {
        dispatch(GetListTicketRoomAction(props.match.params.id))
    }, [])

    console.log('detailTicketRoom', detailTicketRoom)

    const {danhSachGhe, thongTinPhim} = detailTicketRoom;

    return (
        <div className='container mx-auto min-h-screen mt-5'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9 mr-16'>
                    <div className='flex flex-col'>
                        <img width={800} src={screen} alt={screen}/>
                        <div className='ml-12 mt-20'>
                            {danhSachGhe.map((chair, index) => {
                                let classVipChair = chair.loaiGhe === 'Vip' ? 'vipChair' : '';
                                let classBookedChair = chair.daDat === true ? 'bookedChair' : '';
                                let classBookingChair = '';
                                let classBookedChairByUser = '';

                                if (userLogin.taiKhoan === chair.taiKhoanNguoiDat) {
                                    classBookedChairByUser = 'bookedChairByUser';
                                }

                                let indexBookingChair = listBookingChair.findIndex(bchair => bchair.maGhe === chair.maGhe);
                                if (indexBookingChair !== -1) {
                                    classBookedChair = 'bookingChair'
                                }

                                return <Fragment key={index}>
                                    <button
                                        disabled={chair.daDat} key={index}
                                        className={`
                                        chair ${classVipChair} ${classBookedChair} ${classBookingChair}
                                        ${classBookedChairByUser}
                                        `}
                                        onClick={() => {
                                            dispatch({
                                                type: BOOKING_CHAIR,
                                                bookingChair: chair
                                            })
                                        }}
                                    >
                                        {classBookedChairByUser !== '' ?
                                            <UserOutlined className='font-bold'/> : chair.stt}
                                    </button>
                                    {(index + 1) % 20 === 0 ? <br/> : ''}
                                </Fragment>
                            })}
                        </div>
                        <div className="mt-7 ml-12">
                            <table className="divide-y divide-gray-200 w-2/3">
                                <thead className='bg-gray-50 p-5'>
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế người dùng khác đã đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế người dùng đã đặt</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr className='text-center'>
                                    <td>
                                        <button className='chair'/>
                                    </td>
                                    <td>
                                        <button className='chair bookingChair '/>
                                    </td>
                                    <td>
                                        <button className='chair bookedChair'/>
                                    </td>
                                    <td>
                                        <button className='chair vipChair'/>
                                    </td>
                                    <td>
                                        <button className='chair bookedChairByUser'/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-span-3 min-h-screen'>
                    <h3 className='text-center text-green-200 text-2xl'>0 đ</h3>
                    <hr/>
                    <h3 className="text-xl mt-5">{thongTinPhim.tenPhim}</h3>
                    <p>{thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
                    <p>{moment(thongTinPhim.ngayKhoiChieu).format('L')}</p>
                    <hr/>
                    <div className='my-5'>
                        <div className='w-4/5'>
                            <p className='text-xl'>Ghế bạn chọn</p>

                            <div className='grid grid-cols-6'>
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
                    <hr/>
                    <div className='my-5'>
                        <i>Email</i><br/>
                        <p>{userLogin.email}</p>
                    </div>
                    <hr/>
                    <div className='my-5'>
                        <i>Số điện thoại</i><br/>
                        <p>{userLogin.soDT}</p>
                    </div>
                    <hr/>
                    <div
                        className="text-center bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                        onClick={() => {
                            const dataBooking = new DataBooking()
                            dataBooking.maLichChieu = props.match.params.id;
                            dataBooking.danhSachVe = listBookingChair
                            console.log('data-booking', dataBooking)

                            dispatch(BookingAction(dataBooking))
                        }}
                    >
                        Đặt vé
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default Checkout;


function callback(key) {
    console.log(key);
}

export default function (props) {
    return <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane className={{marginLeft: 20}} tab="01 CHỌN GHẾ VÀ THANH TOÁN" key="1">
            <Checkout {...props}/>
        </TabPane>

        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
            <ResultBooking/>
        </TabPane>
    </Tabs>
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
                    <img alt="team"
                         className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                         src="https://dummyimage.com/80x80"/>
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">
                            Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày
                            Chiếu: {moment(ticket.ngayDat).format('DD-MM-YYYY'
                        )}</p>
                        <p className="text-gray-500">Địa điểm: {chairs.tenHeThongRap}</p>
                        <p className="text-gray-500">Tên rạp: {chairs.tenCumRap} -
                            Ghế {ticket.danhSachGhe.map((chair, index) => {
                                return <span key={index}>{chair.tenGhe}</span>
                            })}
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