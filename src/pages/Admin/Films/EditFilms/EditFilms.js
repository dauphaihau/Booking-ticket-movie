import React, {Fragment, useEffect, useState} from 'react';
import moment from "moment";
import {Button} from '@nextui-org/react';

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
import {getInfoFilmsAction, updateFilmsAction} from "../../../../store/actions/FilmsAction";
import {useDispatch, useSelector} from "react-redux";


function EditFilms(props) {

    const {infoFilm} = useSelector(state => state.FilmsReducer)
    const dispatch = useDispatch();

    console.log('info-film', infoFilm)
    useEffect(() => {
        dispatch(getInfoFilmsAction(props.match.params.id))
    }, [])

    const [componentSize, setComponentSize] = useState('default');

    const [imgSrc, setImgSrc] = useState('');

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: infoFilm.maPhim,
            tenPhim: infoFilm.tenPhim,
            trailer: infoFilm.trailer,
            moTa: infoFilm.moTa,
            maNhom: GROUP_ID,
            ngayKhoiChieu: infoFilm.ngayKhoiChieu,
            sapChieu: infoFilm.sapChieu,
            dangChieu: infoFilm.dangChieu,
            hot: infoFilm.hot,
            danhGia: infoFilm.danhGia,
            hinhAnh: null
        },
        onSubmit: (values) => {
            console.log(values)
            values.maNhom = GROUP_ID
            let fromData = new FormData();

            for (let key in values) {
                if (key !== 'hinhAnh') {
                    fromData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        fromData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            console.log('from-data', fromData)
            console.log('values', values)
            dispatch(updateFilmsAction(fromData))

        }
    })


    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const handleChangeDataPicker = (date) => {
        const dateLocal = moment(date)
        formik.setFieldValue('ngayKhoiChieu', dateLocal)
    }

    const handleChangeSwitch = (name, checked) => {
        formik.setFieldValue(name, checked)
    }

    const handleChangeFile = async (e) => {
        let file = e.target.files[0];

        // console.log('file', file);
        let reader = new FileReader();

        await formik.setFieldValue('hinhAnh', file)
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            // console.log(e.target.result)
            setImgSrc(e.target.result)
        }

    }


    return (
        <Fragment>
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

                <Form.Item label='Chức năng'>
                    <span className="ant-form-text font-bold">CHỈNH SỬA PHIM</span>
                </Form.Item>

                <Form.Item label="Tên phim">
                    <Input onChange={formik.handleChange} name='tenPhim' value={formik.values.tenPhim}/>
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input onChange={formik.handleChange} name='moTa' value={formik.values.moTa}/>
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input onChange={formik.handleChange} name='trailer' value={formik.values.trailer}/>
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker onChange={handleChangeDataPicker} format='DD/MM/YYYY' name='ngayKhoiChieu'
                                value={moment(formik.values.ngayKhoiChieu)}
                    />
                </Form.Item>

                <Form.Item label="Đang chiếu">
                    <Switch
                        onChange={(checked) => {
                            handleChangeSwitch('dangChieu', checked)
                        }}
                        name='dangChieu'
                        checked={formik.values.dangChieu}
                    />
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch
                        onChange={(checked) => {
                            handleChangeSwitch('sapChieu', checked)
                        }}
                        name='sapChieu'
                        checked={formik.values.sapChieu}
                    />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch
                        onChange={(checked) => {
                            handleChangeSwitch('hot', checked)
                        }}
                        name='hot'
                        checked={formik.values.hot}
                    />
                </Form.Item>

                <Form.Item label="Đánh giá">
                    <InputNumber
                        onChange={(value) => {
                            formik.setFieldValue('danhGia', value)
                        }}
                        name='danhGia'
                        value={formik.values.danhGia}
                    />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input onChange={handleChangeFile}
                           accept='image/png, image/jpq, image/jpeg, image/gif' type='file'
                           name='hinhAnh'/>
                    <img width={200} className='mt-2'
                         src={imgSrc === '' ? infoFilm.hinhAnh : imgSrc}
                         alt={formik.values.tenPhim}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{span: 1, offset: 4,}}>
                    <Button
                        // className='-ml-8 md:-ml-16 mt-8 sm:mt-8'
                        shadow type='submit' color="primary" auto>Cập nhật</Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default EditFilms;
