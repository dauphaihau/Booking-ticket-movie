import React, {Fragment, useEffect, useState} from 'react';
import {Form, Input, Button, Checkbox, Select, DatePicker, Space, InputNumber} from 'antd';
import moment from "moment";
import {history, http} from "../../../util/settings";
import {useFormik} from "formik";
import {getListFilmsAction} from "../../../store/actions/FilmsAction";
import {useDispatch} from "react-redux";

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
                if (error.response.status === 400) {
                    alert('Thông tin lịch chiếu phim chưa hợp lệ')
                } else {
                    if (error.response.status === 403) {
                        alert('Chỉ admin mới có quyền tạo lịch chiếu phim')
                    }
                }
            })
        }
    })

    const [state, setState] = useState({
        arrCinema: [],
        arrMiniCinema: [],
    })

    const [componentSize, setComponentSize] = useState('default');

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

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

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


    const validateMessages = {
        required: '${label} không được bỏ trống',
        types: {
            number: '${label} không hợp lệ!',
        },
        number: {
            range: '${label} phải từ 75000 - 150000',
        },
    };


    return <>
        <div className='container flex flex-row mt-20'>

            <Form
                name="basic"
                labelCol={{span: 8,}}
                wrapperCol={{span: 16,}}
                initialValues={{remember: true, size: componentSize}}
                onSubmitCapture={formik.handleSubmit}
                layout="horizontal"
                validateMessages={validateMessages}
                size={componentSize}
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item label='Tạo lịch chiếu phim'>
                    <span className="ant-form-text font-bold"
                          style={{marginLeft: 5}}>{props.match.params.tenphim}</span>
                </Form.Item>

                <Form.Item label="Hệ thống rạp" name={['heThongRap']} rules={[{required: true}]}>
                    <Select options={optionCinemas()} style={{width: 200}} onChange={handleChangeCinema}
                            placeholder="Chọn hệ thống rạp"/>
                </Form.Item>

                <Form.Item label="Cụm rạp" name={['cumRap']} rules={[{required: true}]}>
                    <Select
                        style={{width: 200}}
                        options={state.arrMiniCinema.map((cinema, i) => ({
                            label: cinema.tenCumRap,
                            value: cinema.maCumRap
                        }))}
                        onChange={handleChangeMiniCinema} placeholder="Chọn cụm rạp"/>
                </Form.Item>


                <Form.Item label="Ngày khởi chiếu" name="date-picker" rules={[{required: true}]}>
                    <DatePicker
                        showTime onOk={onOk} format='DD/MM/YYYY hh:mm:ss' placeholder='Chọn Ngày khởi chiếu'
                    />
                </Form.Item>

                <Form.Item label="Giá vé" name={['giaVe']}
                           rules={[{required: true, type: 'number', min: 75000, max: 150000}]}>
                    <InputNumber onChange={onChangeNumber}/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 8},
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Tạo lịch
                    </Button>
                </Form.Item>
            </Form>
            <figure className='hidden md:block ml-4'>
                <img src={film.hinhAnh} alt='...' width={250} height={250} className='rounded-xl'/>
            </figure>
        </div>
    </>
}

export default Showtime;