import React, {useEffect, useState} from 'react';
import {
    Form,
    Input,
    Radio,
    InputNumber,
    Button,
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getInfoProfileAction, updateInfoUserAction,} from "../../store/actions/UserAction";
import {useFormik} from "formik";
import * as Yup from "yup";

function Profile(props) {

    const {infoUser} = useSelector(state => state.UserReducer)
    const [componentSize, setComponentSize] = useState('default');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInfoProfileAction())
    }, [])

    // change key
    const OLD_KEY = 'soDT';
    const NEW_KEY = 'soDt';
    const {[OLD_KEY]: replaceByKey, ...rest} = infoUser
    const new_obj = {
        ...rest,
        [NEW_KEY]: replaceByKey
    }

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
            hoTen: Yup.string().required('Name is required').matches(/^[A-Z a-z]+$/, 'Names cannot contain numbers !'),
            soDt: Yup.string().required('Phone Number is required').matches(/^[0-9]*$/, 'number phone must be a number').min(6, 'Phone Number must be at least 6 characters.').max(32, 'Phone Number have max 32 characters'),
        }),
        onSubmit: (newData) => {
            console.log('newData', newData)
            dispatch(updateInfoUserAction(newData, props.match.params.tentaikhoan))
        }
    })

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    return <Form
        className='lg:mt-8'
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        layout="horizontal"
        onSubmitCapture={formik.handleSubmit}
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

        <Form.Item label="Username">
            <Input onChange={formik.handleChange}
                   name='taiKhoan'
                   style={{width: 300}} value={formik.values.taiKhoan} disabled/>
        </Form.Item>

        <Form.Item label="Password" required validateStatus='error'
                   help={formik.touched.matKhau && formik.errors.matKhau ? `${formik.errors.matKhau}` : null}
        >
            <Input style={{width: 300}} name='matKhau' onChange={formik.handleChange}
                   value={formik.values.matKhau}/>
        </Form.Item>

        <Form.Item label="Name" required validateStatus='error'
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

        <Form.Item label="Phone Number" required validateStatus='error'
                   help={formik.touched.soDt && formik.errors.soDt ? `${formik.errors.soDt}` : null}
        >
            <InputNumber style={{width: 300}} name='soDt' onChange={(e) => {
                formik.setFieldValue('soDt', e)
            }} value={formik.values.soDt}/>
        </Form.Item>

        <Form.Item wrapperCol={{
            xs: {span: 24, offset: 0},
            sm: {span: 16, offset: 8},
        }}
        >
            <Button type="primary" htmlType="submit">
                Edit
            </Button>
        </Form.Item>
    </Form>
}

export default Profile;