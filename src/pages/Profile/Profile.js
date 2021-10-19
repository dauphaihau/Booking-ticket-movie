import React, {useEffect, useState} from 'react';
import {
    Form,
    Input,
    Radio,
    InputNumber,
    Button,
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getInfoProfileAction,} from "../../store/actions/UserAction";
import {GROUP_ID, http} from "../../util/settings";
import {notifiFuntion} from "../../util/Notification";


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

function Profile(props) {

    const {infoUser} = useSelector(state => state.UserReducer)
    const [componentSize, setComponentSize] = useState('default');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInfoProfileAction())
    }, [])

    // change key
    const OLD_KEY = 'soDT';
    const NEW_KEY = 'soDt'
    const {[OLD_KEY]: replaceByKey, ...rest} = infoUser
    const new_obj = {
        ...rest,
        [NEW_KEY]: replaceByKey
    }

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const onFinish = (newData) => {
        console.log('Received values of form: ', newData);

        http.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, newData).then((response) => {
            console.log('response: ' + response);
            notifiFuntion('success', 'Thông tin của bạn đã được cập nhật')
        }).catch(error => {
            console.log({error});
        })
    };

    return <Form
        validateMessages={validateMessages}
        labelCol={{span: 4}}
        wrapperCol={{span: 14}}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={{
            size: componentSize,
            'email': new_obj.email,
            'hoTen': new_obj.hoTen,
            'taiKhoan': new_obj.taiKhoan,
            'matKhau': new_obj.matKhau,
            'soDt': new_obj.soDt,
            'maLoaiNguoiDung': new_obj.maLoaiNguoiDung,
            'maNhom': GROUP_ID,
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

        <Form.Item hidden name={['maLoaiNguoiDung']}/>
        <Form.Item hidden name={['maNhom']}/>

        <Form.Item wrapperCol={{
            xs: {span: 24, offset: 0},
            sm: {span: 16, offset: 4},
            lg: {span: 10, offset: 4},
        }}
        >
            <Button type="primary" htmlType="submit">
                Chỉnh sửa
            </Button>
        </Form.Item>
    </Form>
}

export default Profile;