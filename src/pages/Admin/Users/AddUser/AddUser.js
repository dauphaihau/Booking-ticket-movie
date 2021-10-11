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
    getInfoUserAction,
    getListUserAction,
    updateUserAction
} from "../../../../store/actions/UserAction";
import {GROUP_ID, history, http} from "../../../../util/settings";
import {Option} from "antd/es/mentions";
import * as Yup from "yup";


function AddUser(props) {

    const {typeUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTypeUserAction())
    }, [])

    const [componentSize, setComponentSize] = useState('default');

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            soDt: '',
            maLoaiNguoiDung: '',
            maNhom: '',
        },
        validationSchema: Yup.object({
            maNhom: Yup.string().required('Mã nhóm không được bỏ trống'),
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(6, 'Tài khoản ít nhất phải 6 ký tự').max(32, 'Tài khoản không được quá 32 ký tự'),
            matKhau: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất phải 6 ký tự').max(32, 'Mật khẩu không được quá 32 ký tự'),
            email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
            hoTen: Yup.string().required('Họ tên không được để trống').matches(/^[A-Z a-z]+$/, 'Tên không được chứa số !'),
            soDt: Yup.string().required('Số điện thoại không được để trống').matches(/^[0-9]*$/, 'Số điện thoại không được chứa chữ').min(9, 'Số điện thoại ít nhất phải 9 số').max(12, 'Số điện thoại không được quá 12 số'),
        }),
        onSubmit: (newUser) => {

            console.log('new-data', newUser)

            http.post('/api/QuanLyNguoiDung/ThemNguoiDung', newUser).then((response) => {
                console.log('response: ' + response);
                alert('Thêm người dùng thành công')
                dispatch(getListUserAction())
                history.push('/admin/users')
            }).catch(error => {
                console.log({error});
                if (error.response.status === 500) {
                    alert(error.response.data.content)
                }
            })
        }
    })


    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };


    const validateMessages = {
        required: '${label} không được bỏ trống',
        types: {
            email: '${label} không hợp lệ!',
            number: '${label} không hợp lệ!',
        },
        number: {
            range: '${label} phải từ 9 - 12 số ',
        },
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Fragment>
            <Form
                validateMessages={validateMessages}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    <span className="ant-form-text font-bold">THÊM NGƯỜI DÙNG</span>
                </Form.Item>

                <Form.Item label="Tài khoản" name={['user', 'password']} rules={[{required: true}]}>
                    <Input style={{width: 300}} onChange={formik.handleChange} name='taiKhoan'/>
                </Form.Item>

                <Form.Item label="Mật khẩu" name={['password']} rules={[{required: true}]}>
                    <Input.Password style={{width: 300}} onChange={formik.handleChange} name='matKhau'/>
                </Form.Item>

                <Form.Item label="Họ tên" name={['user', 'name']} rules={[{required: true}]}>
                    <Input name='hoTen' style={{width: 300}} onChange={formik.handleChange}/>
                </Form.Item>

                <Form.Item label="Email" required name={['user', 'email']} rules={[{type: 'email'}]}>
                    <Input style={{width: 300}} name="email" onChange={formik.handleChange}/>
                </Form.Item>

                <Form.Item label="Số điện thoại" name={['user', 'age']}
                           rules={[{type: 'number', min: 100000000, max: 909090909090}]}
                >
                    <InputNumber
                        style={{width: 300}}
                        name='soDT'
                        onChange={(value) => {
                            formik.setFieldValue('soDt', value)
                        }}
                    />
                </Form.Item>

                <Form.Item label="Loại người dùng">
                    <Select value={formik.values.maLoaiNguoiDung} style={{width: 300}}
                            onChange={(value) => {
                                formik.setFieldValue('maLoaiNguoiDung', value)
                            }}
                            name='maLoaiNguoiDung' placeholder="Select a category">
                        {typeUser.map((type, index) => {
                            return <Option key={index} value={type.maLoaiNguoiDung}>{type.tenLoai}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item label="Mã Nhóm" rules={[{required: true}]} tooltip="GP01 nhé">
                    <Input style={{width: 300}} onChange={formik.handleChange} name='maNhom'/>
                </Form.Item>


                <Form.Item wrapperCol={{
                    span: 1,
                    offset: 4,
                }}>
                    <Button
                        // className='-ml-16 sm:-ml-16 mt-8 sm:mt-8 w-full sm:w-10/12'
                        shadow type='submit' color="primary" auto>Thêm</Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default AddUser;