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

function EditUser(props) {


    const {infoUser, typeUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    console.log('info-user', infoUser)

    useEffect(() => {
        dispatch(getInfoUserAction(props.match.params.tentaikhoan))
        dispatch(getAllTypeUserAction())
    }, [])

    const [componentSize, setComponentSize] = useState('default');

    // change key
    const OLD_KEY = 'soDT'; const NEW_KEY = 'soDt'
    const { [OLD_KEY]: replaceByKey, ...rest } = infoUser
    const new_obj = {
        ...rest,
        [NEW_KEY]: replaceByKey
    }

    const onFinish = (newData) => {
        console.log('Received values of form: ', newData);
        dispatch(updateInfoUserAction(newData))
    };

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    return (
        <Fragment>
            <Form
                validateMessages={validateMessages}
                onFinish={onFinish}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                    'taiKhoan': new_obj.taiKhoan,
                    'matKhau': new_obj.matKhau,
                    'hoTen': new_obj.hoTen,
                    'email': new_obj.email,
                    'soDt': new_obj.soDt,
                    'maLoaiNguoiDung': new_obj.maLoaiNguoiDung,
                    'maNhom': new_obj.maNhom,
                }}
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

                <Form.Item label="Tài khoản" name='taiKhoan'>
                    <Input style={{width: 300}} disabled/>
                </Form.Item>

                <Form.Item label="Mật khẩu" name={['matKhau']} rules={[{required: true}]}>
                    <Input style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Họ tên" name={['hoTen']} rules={[{required: true}]}>
                    <Input style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Email" required name={['email']} rules={[{required: true, type: 'email'}]}>
                    <Input style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Số điện thoại" name={['soDt']}
                           rules={[{required: true, type: 'number', min: 100000000, max: 999999999999}]}>
                    <InputNumber style={{width: 300}}/>
                </Form.Item>

                <Form.Item label="Loại người dùng" name={['maLoaiNguoiDung']}>
                    <Select style={{width: 300}} placeholder="Select a category">
                        {typeUser.map((type, index) => {
                            return <Option key={index} value={type.maLoaiNguoiDung}>{type.tenLoai}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item label="Mã Nhóm" required name='maNhom' tooltip="GP01 nhé">
                    <Input style={{width: 300}}/>
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
