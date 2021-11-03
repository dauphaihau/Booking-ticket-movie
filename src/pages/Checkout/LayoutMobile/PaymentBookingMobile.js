import React from 'react';
import {Button, Radio} from "@nextui-org/react";
import {DataBooking} from "../../../_core/models/dataBooking";
import {bookingMobileAction} from "../../../store/actions/TicketManagementAction";
import {useDispatch, useSelector} from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {SWITCH_TAB} from "../../../store/types/Type";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

function PaymentBookingMobile(props) {

    const dispatch = useDispatch();
    const {detailTicketRoom, listBookingChair,} = useSelector(state => state.TicketManagementReducer)
    const {thongTinPhim} = detailTicketRoom;
    console.log('thong-tin-phim', thongTinPhim)

    return <>

        <div className='grid grid-cols-3 bg-white items-center mb-4'>
            <div>
                <ArrowBackIosNewIcon
                    className='bg-[#f7f7f7] p-[12px] cursor-pointer transition-colors duration-300 text-[#808089]
                    hover:text-black h-[42px] w-12 mr-2 rounded-xl'
                    onClick={() => {
                        dispatch({
                            type: SWITCH_TAB,
                            tabActive: 2
                        })
                    }}
                />
            </div>
            <p className='text-center font-bold text-[1.2rem] mb-0'>
                PAYMENT
            </p>
        </div>

        <div>
            <div className='grid grid-cols-3 mb-2'>
                <figure className='col-span-1'>
                    <img className='rounded-2xl h-32 w-28  shadow-xl'
                         src={thongTinPhim.hinhAnh} alt={''}/>
                </figure>
                <div className='col-span-2 ml-4 ip8:ml-0'>
                    <h3 className="text-xl ">{thongTinPhim.tenPhim}</h3>
                    <p className=' text-[#c1c1c1]'>Action, Adventure, Thriller</p>
                    <p><LocationOnOutlinedIcon className='mr-[5px]'/>{thongTinPhim.diaChi.slice(0, 90)}</p>
                </div>
            </div>

            <div>
                <div className='flex font-bold'>
                    <p className='mr-16 mb-2'>{thongTinPhim.ngayChieu.slice(0, 2)}</p>
                    <p className='mr-16 mb-2'>{thongTinPhim.gioChieu}</p>
                    <p className='mr-16 mb-2'>{listBookingChair.length}</p>
                </div>
                <div className='flex'>
                    <p className='text-[#c1c1c1] mr-16 mr-[3.4rem]'>Date</p>
                    <p className='text-[#c1c1c1] mr-16 mr-[4.4rem]'>Hour</p>
                    <p className='text-[#c1c1c1] mr-16'>Seats</p>
                </div>
            </div>

            <h2 className='font-bold text-[1rem] mb-0 mt-4'>Payment Method</h2>
            <div className='grid grid-cols-4'>
                <ul>
                    <li><img height={65} width={65} src='/images/logos/visa.png' alt="amazo"/></li>
                    <li><img style={{height: 65, width: 65}} src='/images/logos/paypal-logo-removebg-preview.png'
                             alt="amazo"/></li>
                    <li><img style={{height: 65, width: 65}} src='/images/logos/skrill-logo.png' alt="amazo"/></li>
                    <li><img style={{height: 65, width: 65}} src='/images/logos/apple-pay-logo.png' alt="amazo"/></li>
                    <li><img style={{height: 65, width: 65}} src='/images/logos/amazonn.png' alt="amazo"/></li>
                </ul>
                <ul className='col-span-2'>
                    <li className='mt-[21px] mb-[43px]'>Credit Card</li>
                    <li className='mb-[45px]'>Paypal</li>
                    <li className='mb-[45px]'>Skrill</li>
                    <li className='mb-[42px]'>Apple Pay</li>
                    <li className='mb-[10px] mt-[-4px]'>Amazon Pay</li>
                </ul>
                <Radio.Group value="A">
                    <Radio className=' mt-[21px] mb-[28px] pl-16' value='A'/>
                    <Radio className='mb-[27px] pl-16' value='B'/>
                    <Radio className='mb-[45px] pl-16' value='C'/>
                    <Radio className='mb-[46px] mt-0 pl-16' value='D'/>
                    <Radio className='mb-[10px] pl-16 mt-[-6px]' value='E'/>
                </Radio.Group>
            </div>


            <Button
                className='w-full h-[50px]'
                color="error" auto
                loaderType="default"
                onClick={() => {
                    const dataBooking = new DataBooking()
                    dataBooking.maLichChieu = props.match.params.id;
                    dataBooking.danhSachVe = listBookingChair
                    dispatch(bookingMobileAction(dataBooking))
                }}
            >Pay - <span className='ml-2'>
            {listBookingChair.reduce((sumBill, chair) => {
                return sumBill += chair.giaVe
            }, 0).toLocaleString()}đ
            </span>
            </Button>
        </div>
    </>
}

export default PaymentBookingMobile;