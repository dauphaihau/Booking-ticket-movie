import React, {Fragment, useEffect, useState} from 'react';
import {
    Form,
    Input,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        dispatch(getInfoUserAction(props.match.params.tentaikhoan))
        dispatch(getAllTypeUserAction())
    }, [dispatch, props.match.params.tentaikhoan])

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
            taiKhoan: Yup.string().required('Username is required').required('Username is required').min(6, 'Username must be at least 6 characters.').max(20, 'Username have max 20 characters'),
            email: Yup.string().required('Email is required').email('Email should be valid and contain @'),
            matKhau: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters.').max(32, 'Password have max 32 characters'),
            hoTen: Yup.string().required('Name is required').matches(/^[A-Z a-z]+$/, 'Names cannot contain numbers or special characters !'),
            soDt: Yup.string().required('Phone Number is required').matches(/^[0-9]*$/, 'number phone must be a number').min(6, 'Phone Number must be at least 6 characters.').max(32, 'Phone Number have max 32 characters').nullable(),
        }),
        onSubmit: (newData) => {
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
                <Form.Item label='Form'>
                    <span className="ant-form-text font-bold">EDIT USER</span>
                </Form.Item>

                <Form.Item label="Username">
                    <Input onChange={formik.handleChange}
                           name='taiKhoan'
                           style={{width: 300}} value={formik.values.taiKhoan} disabled/>
                </Form.Item>

                <Form.Item label="Password" required
                           help={formik.touched.matKhau && formik.errors.matKhau ? `${formik.errors.matKhau}` : null}
                >
                    <Input style={{width: 300}} name='matKhau' onChange={formik.handleChange}
                           value={formik.values.matKhau}/>
                </Form.Item>

                <Form.Item label="Name" required
                           help={formik.touched.hoTen && formik.errors.hoTen ? `${formik.errors.hoTen}` : null}
                >
                    <Input style={{width: 300}} name='hoTen' onChange={formik.handleChange}
                           value={formik.values.hoTen}/>
                </Form.Item>

                <Form.Item label="Email" required
                           help={formik.touched.email && formik.errors.email ? `${formik.errors.email}` : null}
                >
                    <Input style={{width: 300}} name='email' onChange={formik.handleChange}
                           value={formik.values.email}/>
                </Form.Item>

                <Form.Item label="Phone Number" required
                           // rules={[{ type: 'number' }]}
                           help={formik.touched.soDt && formik.errors.soDt ? `${formik.errors.soDt}` : null}
                >
                    <InputNumber style={{width: 300}} name='soDt' onChange={(e) => {
                        formik.setFieldValue('soDt', e)
                    }} value={formik.values.soDt}/>
                </Form.Item>

                <Form.Item label="Type User">
                    <Select style={{width: 300}} value={formik.values.maLoaiNguoiDung} name='maLoaiNguoiDung'
                            placeholder="Select a category"
                            onChange={(e) => {
                                formik.setFieldValue('maLoaiNguoiDung', e)
                            }}
                    >
                        {typeUser.map((type, index) => {
                            return <Option key={index} value={type.maLoaiNguoiDung}>{type.tenLoai}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item label="Id Group" tooltip="GP01">
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
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default EditUser;
