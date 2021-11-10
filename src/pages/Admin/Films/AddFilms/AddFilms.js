import React, {Fragment, useState} from 'react';
import moment from "moment";
import {
    Form,
    Input,
    DatePicker,
    Button,
    Switch, Rate,
} from 'antd';
import {useFormik} from "formik";
import {GROUP_ID, history, http} from "../../../../util/settings";
import {getListFilmsAction} from "../../../../store/actions/FilmsAction";
import {useDispatch} from "react-redux";
import {toast} from "react-hot-toast";

const validateMessages = {
    required: `$\{label} is require`,
    types: {
        email: `$\{label} is invalid!`,
        number: `$\{label} is invalid!`,
    },
    number: {
        range: `$\{label} must be from 9 - 12 numbers`,
    },
    min: `'$\{name}' must be at least $\{min} characters`,
    date: {
        format: `'$\{name}' is invalid for format date`,
        parse: `'$\{name}' could not be parsed as date`,
        invalid: `'$\{name}' is invalid date`,
    },
}
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


function AddFilms() {

    const dispatch = useDispatch();
    const [componentSize, setComponentSize] = useState('default');
    const [star, setStar] = useState(3);
    const [imgSrc, setImgSrc] = useState('https://picsum.photos/200/200');

    const formik = useFormik({
        initialValues: {
            maPhim: '',
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom: GROUP_ID,
            ngayKhoiChieu: '',
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            console.log(values)

            let fromData = new FormData();

            for (let key in values) {
                if (key !== 'hinhAnh') {
                    fromData.append(key, values[key]);
                } else {
                    fromData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }

            http.post('/api/QuanLyPhim/ThemPhimUploadHinh', fromData).then(response => {
                console.log('response', response)
                toast.success('add movie successfully')
                dispatch(getListFilmsAction())
                history.push('/admin/films')
            }).catch(error => {
                console.log({error});
                toast.error(error.response?.data.content)
            })
        }
    })


    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const handleChangeDataPicker = (date) => {
        const dateLocal = moment(date).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', dateLocal)
    }

    const handleChangeSwitch = (name, checked) => {
        formik.setFieldValue(name, checked)
    }

    const handleChangeFile = async (event) => {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onload = async (e) => {
            setImgSrc(e.target.result)
        }
        await formik.setFieldValue('hinhAnh', file)
    }

    return (
        <Fragment>
            <Form
                onFinish={formik.handleSubmit}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                layout="horizontal"
                initialValues={{size: componentSize}}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                validateMessages={validateMessages}
            >

                <Form.Item label='Form'>
                    <span className="font-bold ant-form-text">ADD FILM</span>
                </Form.Item>

                <Form.Item label="Name Film" name={['tenPhim']} rules={[{required: true, type: 'string', min: 6}]}>
                    <Input style={{width: 300}} onChange={formik.handleChange} name='tenPhim'/>
                </Form.Item>
                <Form.Item label="Describe" name={['moTa']} rules={[{required: true, type: 'string', min: 12}]}>
                    <Input style={{width: 300}} onChange={formik.handleChange} name='moTa'/>
                </Form.Item>
                <Form.Item label="Trailer" name={['trailer']} rules={[{required: true}]}>
                    <Input style={{width: 300}} onChange={formik.handleChange} name='trailer'/>
                </Form.Item>

                <Form.Item label="Release Date" name="date-picker" {...config} rules={[{required: true, type: 'date'}]}>
                    <DatePicker onChange={handleChangeDataPicker} format='DD/MM/YYYY' name='ngayKhoiChieu'/>
                </Form.Item>

                <Form.Item label="New In">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('dangChieu', checked)
                    }} name='dangChieu'/>
                </Form.Item>
                <Form.Item label="Coming Soon">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('sapChieu', checked)
                    }} name='sapChieu'/>
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('hot', checked)
                    }} name='hot'/>
                </Form.Item>
                <Form.Item label="Rate" name={['danhGia']}>
                    <Rate tooltips={desc} value={star} onChange={(value) => {
                        setStar(value);
                        formik.setFieldValue('danhGia', value)
                    }} name='danhGia'
                    />
                    {star ? <span className="ant-rate-text">{desc[star - 1]}</span> : ''}
                </Form.Item>

                <Form.Item label="Image" required tooltip="Image is require">
                    <input className='mt-[3px]'
                           onChange={handleChangeFile} accept='image/png, image/jpq, image/jpeg, image/gif' type='file'
                           name='hinhAnh'/>
                    <img style={{width: 200}} className='mt-2' src={imgSrc} alt="..."/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 8},

                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>

            </Form>
        </Fragment>
    );
}

export default AddFilms;