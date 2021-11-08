import React, {useEffect, useState} from 'react';
import {Form, Button, Select, DatePicker, InputNumber} from 'antd';
import moment from "moment";
import {history, http} from "../../../util/settings";
import {useFormik} from "formik";
import {getListFilmsAction} from "../../../store/actions/FilmsAction";
import {useDispatch} from "react-redux";
import {toast} from "react-hot-toast";

const validateMessages = {
    required: `$\{label} is require`,
    types: {
        email: `\${label} is invalid!`,
        number: `\${label} is invalid!`,
    },
    min: `'$\{label}' cannot be less than $\{min}`,
    max: `'$\{label}' cannot be greater than $\{max}`,
};

function Showtime(props) {

    const dispatch = useDispatch();

    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'))
    }

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.tenphim,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        onSubmit: (values) => {
            console.log('values', values)

            http.post('/api/QuanLyDatVe/TaoLichChieu', values).then(() => {
                toast.success('Create a successful movie showtime')
                dispatch(getListFilmsAction())
                history.push('/admin/films')
            }).catch(error => {
                console.log({error});
                if (error.response.status === 400) {
                    toast.error('Invalid movie showtime information')
                } else {
                    if (error.response.status === 403) {
                        toast.error('Only admins have permission to create movie showtimes')
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        try {
            const result = await http.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
            setState({
                ...state,
                arrCinema: result.data.content
            })
        } catch (error) {
            console.log({error});
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
            console.log({error});
        }
    }

    const handleChangeMiniCinema = (values) => {
        formik.setFieldValue('maRap', values)
    }

    const onChangeNumber = value => {
        formik.setFieldValue('giaVe', value)
    }

    const optionCinemas = () => {
        return state.arrCinema?.map((cinema) => {
            return {label: cinema.tenHeThongRap, value: cinema.maHeThongRap}
        })
    }

    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }

    return <>
        <div className='container mx-auto flex flex-row mt-20'>
            <Form
                name="basic"
                labelCol={{span: 8,}}
                wrapperCol={{span: 16,}}
                initialValues={{remember: true, size: componentSize}}
                onFinish={formik.handleSubmit}
                layout="horizontal"
                validateMessages={validateMessages}
                size={componentSize}
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item label='Form'>
                    <span className="font-bold ant-form-text">CREATE SHOWTIME</span>
                </Form.Item>
                <Form.Item label='Name Film'>
                    <span className="ant-form-text">{film.tenPhim}</span>
                </Form.Item>

                <Form.Item label="Cinema system" name={['heThongRap']} rules={[{required: true}]}>
                    <Select options={optionCinemas()} style={{width: 200}} onChange={handleChangeCinema}
                            placeholder="Select cinema system"/>
                </Form.Item>

                <Form.Item label="Cinema mini" name={['cumRap']} rules={[{required: true}]}>
                    <Select
                        style={{width: 200}}
                        options={state.arrMiniCinema.map((cinema) => ({
                            label: cinema.tenCumRap,
                            value: cinema.maCumRap
                        }))}
                        onChange={handleChangeMiniCinema} placeholder="Select cinema mini"/>
                </Form.Item>

                <Form.Item label="Release date" name="date-picker" rules={[{required: true}]}>
                    <DatePicker
                        showTime onOk={onOk} format='DD/MM/YYYY hh:mm:ss' placeholder='Select release date'
                    />
                </Form.Item>

                <Form.Item label="Price ticket" name={['giaVe']}
                           rules={[{required: true, type: 'number', min: 75000, max: 200000}]}>
                    <InputNumber onChange={onChangeNumber}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 8},
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
            <figure className='hidden md:block ml-4'>
                <img src={film.hinhAnh} alt='...' className='rounded-xl w-[25rem] h-[25rem]'/>
            </figure>
        </div>
    </>
}

export default Showtime;