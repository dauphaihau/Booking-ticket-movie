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
import {useDispatch, useSelector} from "react-redux";
import {
    getAllTypeUserAction,
    getInfoProfileAction,
    getInfoUserAction,
    updateInfoUserAction
} from "../../store/actions/UserAction";
import {Option} from "antd/es/mentions";
import * as Yup from "yup";
import {GROUP_ID, history, http} from "../../util/settings";
import {getListFilmsAction} from "../../store/actions/FilmsAction";


function Profile(props) {

    const {infoUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    console.log('props', props)
    console.log('info-user', infoUser)

    useEffect(() => {
        dispatch(getInfoProfileAction())
    }, [])

    const [componentSize, setComponentSize] = useState('default');

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: infoUser.taiKhoan,
            matKhau: infoUser.matKhau,
            hoTen: infoUser.hoTen,
            email: infoUser.email,
            soDT: infoUser.soDT,
            maLoaiNguoiDung: infoUser.maLoaiNguoiDung,
            maNhom: GROUP_ID,
        },
        // validationSchema: Yup.object({
        //     maNhom: Yup.string().required('Mã nhóm không được bỏ trống'),
        //     taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(6, 'Tài khoản ít nhất phải 6 ký tự').max(32, 'Tài khoản không được quá 32 ký tự'),
        //     matKhau: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất phải 6 ký tự').max(32, 'Mật khẩu không được quá 32 ký tự'),
        //     email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
        //     hoTen: Yup.string().required('Họ tên không được để trống').matches(/^[A-Z a-z]+$/, 'Tên không được chứa số !'),
        //     soDt: Yup.string().required('Số điện thoại không được để trống').matches(/^[0-9]*$/, 'Số điện thoại không được chứa chữ').min(9, 'Số điện thoại ít nhất phải 9 số').max(12, 'Số điện thoại không được quá 12 số'),
        // }),
        onSubmit: (newData) => {
            console.log('new-data', newData)

            http.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, newData).then((response) => {
                console.log('response: ' + response);
                alert('chỉnh sửa thành công')
            }).catch(error => {
                console.log({error});
            })
        }
    })


    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    return (
        <div className='ml-12 sm:ml-12'>
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

                <Form.Item label="Tài khoản">
                    <Input style={{width: 300}} disabled onChange={formik.handleChange}
                           value={formik.values.taiKhoan}/>
                </Form.Item>

                <Form.Item label="Mật khẩu">
                    <Input style={{width: 300}} onChange={formik.handleChange} name='matKhau'
                           value={formik.values.matKhau}/>
                </Form.Item>
                {formik.touched.soDT && formik.errors.soDT ? (
                    <p className='text-danger'>{formik.errors.soDT}</p>
                ) : null}

                <Form.Item label="Họ tên">
                    <Input name='hoTen' style={{width: 300}} onChange={formik.handleChange}
                           value={formik.values.hoTen}/>
                </Form.Item>

                <Form.Item label="Email" required>
                    <Input style={{width: 300}} name="email" onChange={formik.handleChange}
                           value={formik.values.email}/>

                </Form.Item>

                <Form.Item label="Số điện thoại">
                    <InputNumber style={{width: 300}}
                                 onChange={(value) => {
                                     formik.setFieldValue('soDt', value)
                                 }}
                                 name='soDT' value={formik.values.soDT}/>
                </Form.Item>

                <Form.Item wrapperCol={{
                    span: 1,
                    offset: 4,
                }}>
                    <Button shadow type='submit' color="primary" auto>Cập nhật</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Profile;