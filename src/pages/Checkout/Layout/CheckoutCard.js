import React from 'react';
import {Button} from "@nextui-org/react";
import {DataBooking} from "../../../_core/models/dataBooking";
import {bookingAction} from "../../../store/actions/TicketManagementAction";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import moment from "moment";
import {toast} from "react-hot-toast";

function CheckoutCard({infoMovie, listBookingSeats, props}) {

    const {isLoadingBtn} = useSelector(state => state.LoadingReducer)
    const dispatch = useDispatch();

    return (
        <div className='flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden'>
            <div
                className="overflow-hidden w-full rounded-xl hover:rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
                data-movie-id="438631">
                <div
                    className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"/>
                <div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info" data-lity="">
                    <div className="poster__info align-self-end w-full">
                        <div className="h-32"/>
                        <div className="space-y-6 detail_info">
                            <div className="flex flex-col space-y-2 inner">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a onClick={() => _.isEmpty(infoMovie.trailer) ? toast.error('Sorry, there is currently no trailer for this movie') : infoMovie.trailer}
                                   className="rounded-full relative flex items-center w-min flex-shrink-0 p-1 text-center text-white
                                    bg-[#df3663] group-hover:bg-[#bd2e55]
                                    " data-unsp-sanitized="clean">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <div
                                        className="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2">Trailer
                                    </div>
                                </a>
                                <h3 className="text-2xl font-bold text-white"
                                    data-unsp-sanitized="clean">{infoMovie.tenPhim}</h3>
                                <div className="mb-0 text-lg text-gray-400">Beyond fear, destiny awaits.</div>
                            </div>
                            <div className="flex flex-row justify-between datos">
                                <div className="flex flex-col datos_col">
                                    <div className="popularity">440.052</div>
                                    <div className="text-sm text-gray-400">Popularity:</div>
                                </div>
                                <div className="flex flex-col datos_col">
                                    <div className="release">{moment(infoMovie.ngayKhoiChieu).format('L')}</div>
                                    <div className="text-sm text-gray-400">Release date:</div>
                                </div>
                                <div className="flex flex-col datos_col">
                                    <div className="release">120 min</div>
                                    <div className="text-sm text-gray-400">Runtime:</div>
                                </div>
                            </div>
                            <div className="flex flex-col overview">
                                <div className="flex flex-col"/>
                                <div className="text-xs text-gray-400 mb-2">Your Seats:</div>
                                <div className="text-xs text-gray-100 mb-6">
                                    <div className='w-full'>
                                        <div className='flex flex-row'>
                                            <div
                                                className={`lg:chair chairMini bookingChair vipChair flex justify-center items-center p-2`}/>
                                            {_.filter(listBookingSeats, ['loaiGhe', 'Vip']).reduce((sumBill, chair) => {
                                                return sumBill + chair.giaVe
                                            }, 0).toLocaleString()}đ
                                            <div
                                                className={`lg:chair chairMini bookingChair flex justify-center items-center p-2 ml-8`}/>
                                            {_.filter(listBookingSeats, ['loaiGhe', 'Thuong']).reduce((sumBill, chair) => {
                                                return sumBill + chair.giaVe
                                            }, 0).toLocaleString()}đ
                                        </div>
                                    </div>
                                    <div className='col-span-1 mt-5'>
                                        <div className='flex flex-row justify-between'>
                                            <span className='text-xl'>Total: </span>
                                            <span className='text-xl font-bold'>
                                                                {listBookingSeats.reduce((sumBill, chair) => {
                                                                    return sumBill + chair.giaVe
                                                                }, 0).toLocaleString()}đ
                                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img className="absolute inset-0 transform w-full -translate-y-4"
                     src={infoMovie.hinhAnh}
                 alt={infoMovie.hinhAnh}/>
                <div className="poster__footer
                    mx-auto
                    ml-8
                    flex flex-row
                     relative pb-10 space-x-4 z-10">
                    <Button
                        shadow
                        loading={isLoadingBtn}
                        loaderType="points"
                        style={{width: '90%'}}
                        color="error" auto
                        onClick={() => {
                            const dataBooking = new DataBooking()
                            dataBooking.maLichChieu = props.match.params.id;
                            dataBooking.danhSachVe = listBookingSeats

                            if (_.isEmpty((listBookingSeats))) {
                                toast.error('you haven\'t booked yet')
                            } else {
                                dispatch(bookingAction(dataBooking))
                            }
                        }}
                    >
                        BOOKING
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutCard;