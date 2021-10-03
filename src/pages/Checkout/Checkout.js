import React, {Fragment, useEffect} from 'react';
import screen from '../../assets/img/screen.jpg'
import {TicketManagementAction} from "../../store/actions/TicketManagementAction";
import {useDispatch, useSelector} from "react-redux";
import {TicketManagementReducer} from "../../store/reducers/TicketManagementReducer";
import moment from "moment";
import style from './Checkout.module.css'
import './Checkout.css'

function Checkout(props) {

    const dispatch = useDispatch();

    const {userLogin} = useSelector(state => state.UserReducer)
    const {detailTicketRoom} = useSelector(state => state.TicketManagementReducer)

    useEffect(() => {
        dispatch(TicketManagementAction(props.match.params.id))
    }, [])


    console.log('det', detailTicketRoom)

    const {danhSachGhe, thongTinPhim} = detailTicketRoom;

    return (
        <div className='container mx-auto min-h-screen mt-5'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9 mr-16'>

                    <div className='flex flex-col'>
                        <img width={800} src={screen} alt={screen}/>
{/*//129 70*/}
                        <div className='ml-32 mt-20'>
                            {danhSachGhe.map((chair, index) => {
                                // return <button key={index} className={`${style['chair']}`}>
                                let classVipChair = chair.loaiGhe === 'Vip' ? 'vipChair' : '';
                                let classBookedChair = chair.daDat === true ? 'bookedChair' : '';

                                return <Fragment key={index}>
                                    <button disabled={chair.daDat} key={index}
                                            className={`chair ${classVipChair} ${classBookedChair} `}>
                                        {/*{chair.daDat ?   chair.stt}*/}
                                        {chair.stt}
                                    </button>
                                    {(index + 1) % 20 === 0 ? <br/> : ''}
                                </Fragment>

                            })}
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
                    <div className='flex flex-row my-5'>
                        <div className='w-4/5'><span className='text-red-400 text-xl'>Ghế</span></div>
                        <div className='col-span-1'><span className='text-green-800 text-lg'>0đ</span></div>
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
                    <div className="text-center bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                        Đặt vé
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;