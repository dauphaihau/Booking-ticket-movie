import React, {useEffect} from 'react';
import {Disclosure} from '@headlessui/react'
import {CustomCard} from "@tsamantanis/react-glassmorphism";
import {Rate} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getDetailFilmsAction} from "../../store/actions/FilmsAction";
import moment from "moment";
import {Button} from "@nextui-org/react";
import {history} from "../../util/settings";
import {ChevronUpIcon} from "@heroicons/react/solid";
import Comment from "./Comment/Comment";

function Detail_mobile(props) {

    const dispatch = useDispatch();
    const {detailFilm} = useSelector(state => state.FilmsReducer)

    useEffect(() => {
        let {id} = props.match.params;
        dispatch(getDetailFilmsAction(id))
    }, [])

    return (
        <div style={{
            backgroundImage: `url(${detailFilm.hinhAnh})`,
            backgroundSize: '100%',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <CustomCard style={{paddingTop: 120, minHeight: '100vh'}}
                        effectColor="#fff" // required
                        color="#000000" // default color is white
                        blur={50} // default blur value is 10px
                        borderRadius={1}
            >
                <div className='mx-auto container py-5 rounded-lg'>
                    <div className=' gap-x-8'>
                        <img height={300} className='w-60 col-span-1 rounded-lg' src={detailFilm.hinhAnh}
                             alt={detailFilm.tenPhim}/>
                        <div className='col-span-2 text-white mt-8'>
                            <p className='text-2xl font-bold mb-4'>{detailFilm.tenPhim}</p>

                            <div className='flex'>
                                <div>
                                    <p className='text-sm font-bold'>RELEASED</p>
                                    <p className='text-sm font-bold'>STARRING</p>
                                    <p className='text-sm font-bold'>DIRECTOR</p>
                                    <p className='text-sm font-bold'>RUNNING TIME</p>
                                </div>
                                <div className='ml-8'>
                                    <p className='text-sm'>{moment(detailFilm.ngayKhoiChieu).format('LL')}</p>
                                    <p className='text-sm'>Fred Berger, Brian Kavanaugh</p>
                                    <p className='text-sm'>John Doe</p>
                                    <p className='text-sm'>120 min</p>
                                </div>
                            </div>
                            <p>{detailFilm.moTa}</p>
                            <div style={{marginBottom: 18}}>
                                <Rate style={{fontSize: 16}} allowHalf value={detailFilm.danhGia / 2}/>
                            </div>
                            <Button className='hover:bg-gray-100' shadow color="white" auto>
                                <a href={detailFilm.trailer} style={{color: 'black'}}>WATCH TRAILER</a>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='my-20 mx-auto container bg-white px-0 py-5 rounded-lg'>
                    <div className="w-full px-4 pt-4 block md:hidden">
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Showtimes
                        </span>
                        <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
                            {detailFilm.heThongRapChieu?.map((cinema, index) => {
                                return <Disclosure as='div' className='mb-2' key={index}>
                                    {({open}) => (
                                        <>
                                            <Disclosure.Button
                                                className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blupurplee-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                                <span>{cinema.tenHeThongRap}</span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        open ? 'transform rotate-180' : ''
                                                    } w-5 h-5 text-blue-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-[5px] pb-4 pb-2 text-sm text-gray-500">
                                                {cinema.cumRapChieu.slice(0, 5).map((cumRap, index) => {
                                                    return <div className='mt-5' key={index}>
                                                        <div className='flex flex-row mt-2 h-full'>
                                                            <img width={70} height={70} className='rounded-lg'
                                                                 src={cumRap.hinhAnh}
                                                                 alt={cumRap.tenCumRap}/>
                                                            <div className='ml-4'>
                                                                <p className='text-[10px] font-bold leading-3'>{cumRap.tenCumRap}</p>
                                                                <p className='text-[10px] mb-4'>{cumRap.diaChi.length > 40 ?
                                                                    <span>{cumRap.diaChi.slice(0, 40)}..</span> :
                                                                    <span>{cumRap.diaChi}</span>}
                                                                </p>
                                                                <div className='flex flex-row'>
                                                                    {cumRap.lichChieuPhim.slice(0, 2).map((showtime, index) => {
                                                                        return <Button className='mr-4' size='mini'
                                                                                       shadow
                                                                                       key={index}
                                                                                       color="primary" auto
                                                                                       onClick={() => {
                                                                                           history.push(`/checkout/${showtime.maLichChieu}`)
                                                                                           localStorage.setItem('maLichChieu', JSON.stringify(showtime.maLichChieu))
                                                                                       }}
                                                                        >
                                                                            {moment(showtime.ngayKhoiChieu).format('hh:mm A')}
                                                                        </Button>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            })}
                        </div>
                    </div>
                </div>
                <Comment/>
            </CustomCard>
        </div>
    )
}

export default Detail_mobile;