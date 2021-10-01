import React, {useEffect} from 'react';
import {CustomCard} from "@tsamantanis/react-glassmorphism";
import '../../assets/styles/circle.css'
import {Tabs, Radio, Space, Rate} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getDetailFilmsAction} from "../../store/actions/FilmsAction";
import moment from "moment";

const {TabPane} = Tabs;

function Detail(props) {

    const dispatch = useDispatch();
    const {detailFilm} = useSelector(state => state.FilmsReducer)

    console.log({detailFilm})

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
            <CustomCard style={{paddingTop: 150, minHeight: '100vh'}}
                        effectColor="#fff" // required
                        color="#000000" // default color is white
                        blur={10} // default blur value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-4 col-start-4">
                        <div className='grid grid-cols-3'>
                            <img className='col-span-1' src={detailFilm.hinhAnh} style={{width: 300, height: 300}} alt={detailFilm.tenPhim}/>
                            <div className='ml-4 col-span-2'>
                                <p className='text-sm'>{moment(detailFilm.ngayKhoiChieu).format('DD.MM.YY')}</p>
                                <p className='leading-3 text-4xl'>{detailFilm.tenPhim}</p>
                                <p>{detailFilm.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 ml-24">
                        <h1 style={{marginLeft:'15%', color:'yellow', fontWeight:'bold', fontSize: 15}}>Đánh giá</h1>
                        <h1 style={{marginLeft:'5%'}} className='text-gray-400 text-2xl'>
                            <Rate style={{color:'#78ed87', fontSize:38}}
                                allowHalf value={detailFilm.danhGia/2}/>
                        </h1>
                        <div className={`c100 p${detailFilm.danhGia * 10} big green`}>
                            <span>{detailFilm.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"/>
                                <div className="fill"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-20 mx-auto container'>
                    <Tabs tabPosition={'left'}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab 3
                        </TabPane>
                    </Tabs>
                </div>

            </CustomCard>
        </div>);
}

export default Detail;