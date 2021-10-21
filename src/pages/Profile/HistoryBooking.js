import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getDataUserAction} from "../../store/actions/UserAction";
import _ from "lodash";
import moment from "moment";

export default function HistoryBooking(props) {

    const {dataUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();
    console.log('data-user', dataUser)

    useEffect(() => {
        dispatch(getDataUserAction())
    }, [])

    const renderTicketItem = () => {
        return dataUser.thongTinDatVe.map((ticket, index) => {
            const chairs = _.head(ticket.danhSachGhe)

            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full bg-white flex items-center border-gray-200 border p-4 rounded-lg">
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">
                            Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày
                            Chiếu: {moment(ticket.ngayDat).format('DD-MM-YYYY'
                        )}</p>
                        <p className="text-gray-500">Địa điểm: {chairs.tenHeThongRap}</p>
                        <p className="text-gray-500">Tên rạp: {chairs.tenCumRap}</p>
                        <p>Tất cả ghế bạn đã đặt:</p>
                        <div className='grid grid-cols-7'>
                            {ticket.danhSachGhe.map((chair, index) => {
                                return <>
                                    <div className="chair bookingChair p-2" key={index}>  {chair.tenGhe}  </div>
                                </>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        })
    }

    return <div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>
    </div>
}
