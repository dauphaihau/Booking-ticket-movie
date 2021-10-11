import React, {Fragment, useEffect, useState} from 'react';
import {Form, Input, Checkbox, Select, DatePicker, Space, InputNumber} from 'antd';
import {Button} from "@nextui-org/react";
import moment from "moment";
import {history, http} from "../../../util/settings";
import {useFormik} from "formik";
import {getListFilmsAction} from "../../../store/actions/FilmsAction";
import {useDispatch} from "react-redux";

const {RangePicker} = DatePicker;

function Showtime(props) {

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        onSubmit: (values) => {
            console.log('values', values)

            http.post('/api/QuanLyDatVe/TaoLichChieu', values).then((response) => {
                console.log('response: ' + response);
                alert('Tạo lịch chiếu phim thành công')
                dispatch(getListFilmsAction())
                history.push('/admin/films')
            }).catch(error => {
                console.log({error});
                alert('Bạn không đủ quyền tạo lịch chiếu phim này')
            })
        }
    })

    const [state, setState] = useState({
        arrCinema: [],
        arrMiniCinema: [],
    })

    useEffect(async () => {
        try {
            const result = await http.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
            setState({
                ...state,
                arrCinema: result.data.content
            })
        } catch (error) {
            console.log('error', error)
        }
    }, [])

    const handleChangeCinema = async (values) => {
        try {
            const result = await http.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${values}`)
            setState({
                ...state,
                arrMiniCinema: result.data.content
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleChangeMiniCinema = (values) => {
        formik.setFieldValue('maRap', values)
    }

    const onChangeNumber = value => {
        formik.setFieldValue('giaVe', value)
    }

    const optionCinemas = () => {
        return state.arrCinema?.map((cinema, index) => {
            return {label: cinema.tenHeThongRap, value: cinema.maHeThongRap}
        })
    }

    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }

    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'))
    }


    return <div className='container flex flex-row justify-evenly mt-20'>

        <figure className='hidden md:block'>
            <img src={film.hinhAnh} alt='...' width={250} height={200} className='rounded-xl'/>
        </figure>
        <Form
            name="basic"
            labelCol={{span: 8,}}
            wrapperCol={{span: 16,}}
            initialValues={{remember: true,}}
            onSubmitCapture={formik.handleSubmit}
        >
            <Form.Item label='Tạo lịch chiếu phim'>
                <span className="ant-form-text font-bold" style={{marginLeft: 5}}>{props.match.params.tenphim}</span>
            </Form.Item>

            <Form.Item label="Hệ thống rạp">
                <Select options={optionCinemas()} style={{width: 300}} onChange={handleChangeCinema}
                        placeholder="Chọn hệ thống rạp"/>
            </Form.Item>

            <Form.Item label="Cụm rạp">
                <Select
                    style={{width: 300}}
                    options={state.arrMiniCinema.map((cinema, i) => ({
                        label: cinema.tenCumRap,
                        value: cinema.maCumRap
                    }))}
                    onChange={handleChangeMiniCinema} placeholder="Chọn cụm rạp"/>
            </Form.Item>


            <Form.Item label="Ngày khởi chiếu">
                <DatePicker
                    showTime onOk={onOk} format='DD/MM/YYYY hh:mm:ss' placeholder='Chọn Ngày khởi chiếu'
                />
            </Form.Item>

            <Form.Item label="Giá vé">
                <InputNumber onChange={onChangeNumber} min={75000} max={150000}/>
            </Form.Item>

            <Form.Item wrapperCol={{
                span: 1,
                offset: 8,
            }}

            // className='flex md:flex-row-reverse'
            //     className='-ml-8 md:-ml-16 mt-8 sm:mt-8'
            >
                <Button
                    // className='-ml-36 md:-ml-48 lg:-ml-48'
                    shadow type='submit' color="primary" auto>Tạo lịch</Button>
            </Form.Item>
        </Form>
    </div>

}

export default Showtime;