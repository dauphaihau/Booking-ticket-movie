import React, {Fragment, useEffect, useState} from 'react';
import {
    Form,
    Input,
    Radio,
    Select,
    InputNumber,
    Button,
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getAllTypeUserAction, getInfoUserAction, updateInfoUserAction} from "../../../../store/actions/UserAction";
import {Option} from "antd/es/mentions";
import {useFormik} from "formik";
import * as Yup from "yup";

function EditUser(props) {

    const {infoUser, typeUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    console.log('info-user', infoUser)

    useEffect(async () => {
        dispatch(getInfoUserAction(props.match.params.tentaikhoan))
        dispatch(getAllTypeUserAction())
    }, [])

    // change key
    const OLD_KEY = 'soDT';
    const NEW_KEY = 'soDt'
    const {[OLD_KEY]: replaceByKey, ...rest} = infoUser
    const new_obj = {
        ...rest,
        [NEW_KEY]: replaceByKey
    }

    const [componentSize, setComponentSize] = useState('default');
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: new_obj.taiKhoan,
            email: new_obj.email,
            soDt: new_obj.soDt,
            hoTen: new_obj.hoTen,
            matKhau: new_obj.matKhau,
            maLoaiNguoiDung: new_obj.maLoaiNguoiDung,
            maNhom: new_obj.maNhom,
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống'),
            matKhau: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất phải 6 ký tự').max(32, 'Mật khẩu không được quá 32 ký tự'),
            email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
            hoTen: Yup.string().required('Họ tên không được để trống').matches(/^[A-Z a-z]+$/, 'Tên không được chứa số, ký tự đặc biệt !'),
            soDt: Yup.string().required('Số điện thoại không được để trống').matches(/^[0-9]*$/, 'Số điện thoại không được chứa chữ').min(9, 'Số điện thoại ít nhất phải 9 số').max(12, 'Số điện thoại không được quá 12 số'),
        }),
        onSubmit: (newData) => {
            console.log('newData', newData)
            dispatch(updateInfoUserAction(newData, props.match.params.tentaikhoan))
        }
    })

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    return (
        <Fragment>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
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
                    <span className="ant-form-text font-bold">CHỈNH SỬA NGƯỜI DÙNG</span>
                </Form.Item>

                <Form.Item label="Tài khoản">
                    <Input onChange={formik.handleChange}
                           name='taiKhoan'
                           style={{width: 300}} value={formik.values.taiKhoan} disabled/>
                </Form.Item>

                <Form.Item label="Mật khẩu" required validateStatus='error'
                           help={formik.touched.matKhau && formik.errors.matKhau ? `${formik.errors.matKhau}` : null}
                >
                    <Input style={{width: 300}} name='matKhau' onChange={formik.handleChange}
                           value={formik.values.matKhau}/>
                </Form.Item>

                <Form.Item label="Họ tên" required validateStatus='error'
                           help={formik.touched.hoTen && formik.errors.hoTen ? `${formik.errors.hoTen}` : null}
                >
                    <Input style={{width: 300}} name='hoTen' onChange={formik.handleChange}
                           value={formik.values.hoTen}/>
                </Form.Item>

                <Form.Item label="Email" required validateStatus='error'
                           help={formik.touched.email && formik.errors.email ? `${formik.errors.email}` : null}
                >
                    <Input style={{width: 300}} name='email' onChange={formik.handleChange}
                           value={formik.values.email}/>
                </Form.Item>

                <Form.Item label="Số điện thoại" required validateStatus='error'
                           help={formik.touched.soDt && formik.errors.soDt ? `${formik.errors.soDt}` : null}
                >
                    <InputNumber style={{width: 300}} name='soDt' onChange={(e) => {
                        formik.setFieldValue('soDt', e)
                    }} value={formik.values.soDt}/>
                </Form.Item>

                <Form.Item label="Loại người dùng">
                    <Select style={{width: 300}} value={formik.values.maLoaiNguoiDung} name='maLoaiNguoiDung'
                            placeholder="Select a category">
                        {typeUser.map((type, index) => {
                            return <Option key={index} value={type.maLoaiNguoiDung}>{type.tenLoai}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item label="Mã Nhóm" tooltip="GP01 nhé">
                    <Input style={{width: 300}} name='maNhom' onChange={formik.handleChange}
                           value={formik.values.maNhom}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 6},
                        lg: {span: 16, offset: 6},
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default EditUser;
