import React, {Fragment, useEffect, useState} from 'react';
import {
    Form,
    Input,
    Radio,
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

const validateMessages = {
    required: '${label} không được bỏ trống',
    types: {
        email: '${label} không hợp lệ!',
        number: '${label} không hợp lệ!',
    },
    number: {
        range: '${label} phải từ 9 - 12 số ',
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
        console.log('Success:', newUser);
        http.post('/api/QuanLyNguoiDung/ThemNguoiDung', newUser).then((response) => {
            console.log('response: ' + response);
            alert('Thêm người dùng thành công')
            dispatch(getListUserAction())
            history.push('/admin/users')
        }).catch(error => {
            console.log({error});
            if (error.response?.status === 500) {
                alert(error.response.data.content)
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

                <Form.Item label="Tài khoản" name={['taiKhoan']} rules={[{required: true}]}>
                    <Input style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Mật khẩu" name={['matKhau']} rules={[{required: true}]}>
                    <Input.Password style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Họ tên" name={['hoTen']} rules={[{required: true}]}>
                    <Input name='hoTen' style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Email" required name={['email']} rules={[{required: true, type: 'email'}]}>
                    <Input style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Số điện thoại" name={['soDt']}
                           rules={[{required: true,type: 'number', min: 100000000, max: 909090909090}]}>
                    <InputNumber style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Loại người dùng" name={['maLoaiNguoiDung']} rules={[{ required: true }]}>
                    <Select style={{width: 300}} placeholder="Select a category">
                        {typeUser.map((type, index) => {
                            return <Option key={index} value={type.maLoaiNguoiDung}>{type.tenLoai}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item label="Mã Nhóm" name='maNhom' rules={[{required: true}]} tooltip="GP01 nhé">
                    <Input style={{width: 300}}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 8},
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default AddUser;