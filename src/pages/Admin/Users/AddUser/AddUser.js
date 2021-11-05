import React, {Fragment, useEffect, useState} from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {
    getAllTypeUserAction,
    getListUserAction,
} from "../../../../store/actions/UserAction";
import {history, http} from "../../../../util/settings";
import {Option} from "antd/es/mentions";
import {toast} from "react-hot-toast";

const validateMessages = {
    required: '${label} is require',
    types: {
        email: '${label} is invalid!',
        number: '${label} is invalid!',
    },
    number: {
        range: '${label} must be from 9 - 12 numbers',
    },
}

function AddUser() {

    const {typeUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTypeUserAction())
    }, [])

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const onFinish = (newUser) => {
        http.post('/api/QuanLyNguoiDung/ThemNguoiDung', newUser).then((response) => {
            toast.success('Thêm người dùng thành công')
            dispatch(getListUserAction())
            history.push('/admin/users')
        }).catch(error => {
            console.log({error});
            if (error.response?.status === 500) {
                toast.error(error.response?.data.content)
            }
        })
    };

    return (
        <Fragment>
            <Form
                validateMessages={validateMessages}
                onFinish={onFinish}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                layout="horizontal"
                initialValues={{size: componentSize}}
                size={componentSize}
                onValuesChange={onFormLayoutChange}
            >

                <Form.Item label='Form'>
                    <span className="ant-form-text font-bold">ADD USER</span>
                </Form.Item>

                <Form.Item label="Username" name={['taiKhoan']} rules={[{required: true}]}>
                    <Input style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Password" name={['matKhau']} rules={[{required: true}]}>
                    <Input.Password style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Name" name={['hoTen']} rules={[{required: true}]}>
                    <Input name='hoTen' style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Email" required name={['email']} rules={[{required: true, type: 'email'}]}>
                    <Input style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Phone Number" name={['soDt']}
                           rules={[{required: true, type: 'number', min: 100000000, max: 909090909090}]}>
                    <InputNumber style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Type User" name={['maLoaiNguoiDung']} rules={[{ required: true }]}>
                    <Select style={{width: 300}} placeholder="Select a category" >
                        {typeUser.map((type, index) => {
                            return <Option key={index} value={type.maLoaiNguoiDung}>{type.tenLoai}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item label="Id Group" name='maNhom' rules={[{required: true}]} tooltip="GP01">
                    <Input style={{width: 300}}/>
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

export default AddUser;