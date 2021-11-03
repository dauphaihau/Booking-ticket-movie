import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getDataUserAction} from "../../../store/actions/UserAction";
import _ from "lodash";
import moment from "moment";

function ResultBooking() {

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
                            Time: {moment(ticket.ngayDat).format('hh:mm A')} - Date: {moment(ticket.ngayDat).format('DD-MM-YYYY'
                        )}</p>
                        <p className="text-gray-500">Location: {chairs.tenHeThongRap}</p>
                        <p className="text-gray-500">Name Cinema: {chairs.tenCumRap}</p>
                        <p className="text-gray-500">All your seats booked: </p>
                        <div className='grid grid-cols-7'>
                            {ticket.danhSachGhe.map((chair, index) => {
                                return <div className="chair bookingChair p-2" key={index}>  {chair.tenGhe}  </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        })
    }

    return <div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 lg:py-16 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">History Booking</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Movie location and time information</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>
    </div>
}

export default ResultBooking