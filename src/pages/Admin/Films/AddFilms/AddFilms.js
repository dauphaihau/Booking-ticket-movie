import React, {Fragment, useState} from 'react';
import moment from "moment";
import { Button } from '@nextui-org/react';

import {
    Form,
    Input,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import {useFormik} from "formik";
import {GROUP_ID, http} from "../../../../util/settings";


function AddFilms(props) {

    const [componentSize, setComponentSize] = useState('default');

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

            http.post('/api/QuanLyPhim/ThemPhimUploadHinh', fromData).then((response) => {
                console.log('response: ' + response);
            }).catch(error => {
                console.log({error});
            })
        }
    })


    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const handleChangeDataPicker = (date, dataString) => {
        const dateLocal = moment(date).format('DD/MM/YYYY')
        // console.log('dateLocal', dateLocal);
        formik.setFieldValue('ngayKhoiChieu', dateLocal)
    }

    const handleChangeSwitch = (name, checked) => {
        formik.setFieldValue(name, checked)
    }

    const handleChangeFile = async (event) => {
        let file = event.target.files[0];

        // console.log('file', file);
        let reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onload = async (e) => {
            // console.log(e.target.result)
            setImgSrc(e.target.result)
        }
        formik.setFieldValue('hinhAnh', file)

    }


    return (
        <Fragment>
            <h3>add movie</h3>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                initialValues={{size: componentSize}}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Tên phim">
                    <Input onChange={formik.handleChange} name='tenPhim'/>
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input onChange={formik.handleChange} name='moTa'/>
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input onChange={formik.handleChange} name='trailer'/>
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker onChange={handleChangeDataPicker} format='DD/MM/YYYY' name='ngayKhoiChieu'/>
                </Form.Item>

                <Form.Item label="Đang chiếu">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('dangChieu', checked)
                    }} name='dangChieu'/>
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('sapChieu', checked)
                    }} name='sapChieu'/>
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('hot', checked)
                    }} name='hot'/>
                </Form.Item>


                <Form.Item label="Đánh giá">
                    <InputNumber onChange={(value) => {
                        formik.setFieldValue('danhGia', value)
                    }} name='danhGia'/>
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input onChange={handleChangeFile} accept='image/png, image/jpq, image/jpeg, image/gif' type='file'
                           name='hinhAnh'/>
                    <img style={{width: 200}} className='mt-2' src={imgSrc} alt="..."/>
                </Form.Item>

                <Form.Item label="Chức năng">
                    <Button shadow type='submit' color="primary" auto>
                        Thêm phim
                    </Button>
                </Form.Item>

            </Form>
        </Fragment>
    );
}

export default AddFilms;