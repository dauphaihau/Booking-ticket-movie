import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getDataUserAction} from "../../../store/actions/UserAction";
import _ from "lodash";
import moment from "moment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {SWITCH_TAB} from "../../../store/types/Type";

function ResultBookingMobile() {

    const {dataUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();
    console.log('data-user', dataUser)

    useEffect(() => {
        dispatch(getDataUserAction())
    }, [dispatch])

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

    return <>
        <div className='flex justify-between bg-white w-[72%] items-center'>
            <div>
                <ArrowBackIosNewIcon
                    className='bg-[#f7f7f7] p-[12px] cursor-pointer transition-colors duration-300 text-[#808089]
                    hover:text-blue-400 h-[42px] w-12 mr-2 rounded-xl'
                    onClick={() => {
                        dispatch({
                            type: SWITCH_TAB,
                            tabActive: 2
                        })
                    }}
                />
            </div>
            <p className='font-bold text-[1.2rem] mb-0'>
                RESULT BOOKING
            </p>
        </div>

        <section className="text-gray-600 body-font">
            <div className="container py-16 lg:py-16 mx-auto">
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>
    </>
}

export default ResultBookingMobile