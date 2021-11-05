import React, {useEffect} from 'react';
import {CustomCard} from "@tsamantanis/react-glassmorphism";
import {Rate} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getDetailFilmsAction} from "../../store/actions/FilmsAction";
import moment from "moment";
import {Button} from "@nextui-org/react";
import {history} from "../../util/settings";
import {Tab} from '@headlessui/react'
import _ from "lodash";
import Comment from "./Comment/Comment";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Detail(props) {

    const dispatch = useDispatch();
    const {detailFilm} = useSelector(state => state.FilmsReducer)

    useEffect(() => {
        dispatch(getDetailFilmsAction(props.match.params.id))
    }, [])

    let objDetailFilm = _.keyBy(detailFilm.heThongRapChieu, 'maHeThongRap');

    return (
        <div style={{
            backgroundImage: `url(${detailFilm.hinhAnh})`,
            backgroundSize: '100%',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <CustomCard style={{paddingTop: 150, minHeight: '100vh'}}
                        effectColor="#fff" // required
                        color="#000000" // default color is white
                        blur={50} // default blur value is 10px
                        borderRadius={1}
            >
                <div className='lg:mx-auto lg:px-8 md:px-0 lg:container lg:max-w-screen-xl'>
                    <div className='py-5 rounded-lg'>
                        <div className='grid grid-cols-3 gap-x-8 mb-8'>
                            <figure className='col-span-1'>
                                <img className='rounded-2xl h-[23.6rem] w-[280px]  shadow-2xl'
                                     src={detailFilm.hinhAnh} alt={detailFilm.tenPhim}/>
                            </figure>
                            <div className='col-span-2 text-white xl:-ml-24'>
                                <p className='text-4xl mb-4'>{detailFilm.tenPhim}</p>
                                {/*<p className='pr-[24rem]'>{detailFilm.moTa}</p>*/}

                                {detailFilm.moTa?.length > 260 ?
                                    <p className='lg:pr-[24rem] h-[87px]'>{detailFilm.moTa.slice(0, 260)}...</p> :
                                    <p className='lg:pr-[24rem] h-[87px]'>{detailFilm.moTa}</p>}
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

                                <div style={{marginBottom: 18}}>
                                    <Rate style={{fontSize: 16}} allowHalf disabled value={detailFilm.danhGia / 2}/>
                                </div>
                                <Button icon={<PlayArrowIcon className='text-black'/>} className='hover:bg-gray-100' shadow color="white" auto>
                                    <a href={detailFilm.trailer} style={{color: 'black'}}>WATCH TRAILER</a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-2 py-16 sm:px-0">
                        <Tab.Group>
                            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                                {Object.keys(objDetailFilm).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({selected}) =>
                                            classNames(
                                                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                                selected
                                                    ? 'bg-white shadow'
                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                {Object.values(objDetailFilm).map((posts, idx) => (
                                    <Tab.Panel
                                        key={idx}
                                        className={classNames(
                                            'bg-white rounded-xl p-3',
                                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                                        )}
                                    >
                                        <ul>
                                            {posts.cumRapChieu.map((cumRap, idx) => (
                                                <li
                                                    key={idx}
                                                    className="relative p-3 rounded-md hover:bg-gray-100"
                                                >
                                                    <div className='flex flex-row'>
                                                        <img width={100} height={100} className='rounded-lg'
                                                             src={cumRap.hinhAnh}
                                                             alt={cumRap.tenCumRap}/>
                                                        <div className='ml-5'>
                                                            <p className='text-xl font-bold
                                                            '>{cumRap.tenCumRap}</p>
                                                            <p style={{marginBottom: 21}}>{cumRap.diaChi}</p>
                                                            <div className='flex flex-row'>
                                                                {cumRap.lichChieuPhim.slice(0,5).map((showtime, index) => {
                                                                    return <Button className='mr-4' size='mini'
                                                                                   shadow
                                                                                   key={index}
                                                                                   color="primary" auto
                                                                                   onClick={() => {
                                                                                       history.push(`/checkout/${showtime.maLichChieu}`);
                                                                                   }}
                                                                    >
                                                                        {moment(showtime.ngayChieuGioChieu).format('hh:mm A')}
                                                                    </Button>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                    {/* Comment */}
                    <Comment/>
                </div>
            </CustomCard>
        </div>);
}

export default Detail;