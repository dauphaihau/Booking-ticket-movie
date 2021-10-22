import React, {Fragment, useState} from 'react';
import moment from "moment";
import {
    Form,
    Input,
    Radio,
    DatePicker,
    Button,
    Switch, Rate,
} from 'antd';
import {useFormik} from "formik";
import {GROUP_ID, history, http} from "../../../../util/settings";
import {getListFilmsAction} from "../../../../store/actions/FilmsAction";
import {useDispatch} from "react-redux";
import {notifiFuntion} from "../../../../util/Notification";

const validateMessages = {
    required: '${label} không được bỏ trống',
    types: {
        email: '${label} không hợp lệ!',
        number: '${label} không hợp lệ!',
    },
    number: {
        range: '${label} phải từ 1 - 5',
    },
};

const desc = ['quá tệ', 'tệ', 'bình thường', 'tốt', 'tuyệt vời'];


function AddFilms(props) {

    const dispatch = useDispatch();
    const [componentSize, setComponentSize] = useState('default');
    const [star, setStar] = useState(3);
    const [imgSrc, setImgSrc] = useState('https://picsum.photos/200/200');

    const formik = useFormik({
        initialValues: {
            maPhim: '',
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom: GROUP_ID,
            ngayKhoiChieu: '',
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            console.log(values)

            let fromData = new FormData();

            for (let key in values) {
                if (key !== 'hinhAnh') {
                    fromData.append(key, values[key]);
                } else {
                    fromData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }

            http.post('/api/QuanLyPhim/ThemPhimUploadHinh', fromData).then((response) => {
                console.log('response: ' + response);
                notifiFuntion('Thêm phim thành công')
                dispatch(getListFilmsAction())
                history.push('/admin/films')
            }).catch(error => {
                console.log({error});
                alert(error.response.data.content)
            })
        }
    })


    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const handleChangeDataPicker = (date, dataString) => {
        const dateLocal = moment(date).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', dateLocal)
    }

    const handleChangeSwitch = (name, checked) => {
        formik.setFieldValue(name, checked)
    }

    const handleChangeFile = async (event) => {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onload = async (e) => {
            setImgSrc(e.target.result)
        }
        await formik.setFieldValue('hinhAnh', file)
    }

    return (
        <Fragment>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                layout="horizontal"
                initialValues={{size: componentSize}}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                validateMessages={validateMessages}
            >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label='Chức năng'>
                    <span className="font-bold ant-form-text">THÊM PHIM</span>
                </Form.Item>

                <Form.Item label="Tên phim" name={['tenPhim']} rules={[{required: true}]}>
                    <Input style={{width: 300}} onChange={formik.handleChange} name='tenPhim'/>
                </Form.Item>
                <Form.Item label="Mô tả" name={['moTa']} rules={[{required: true}]}>
                    <Input style={{width: 300}} onChange={formik.handleChange} name='moTa'/>
                </Form.Item>
                <Form.Item label="Trailer" name={['trailer']} rules={[{required: true}]}>
                    <Input style={{width: 300}} onChange={formik.handleChange} name='trailer'/>
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu" name="date-picker" rules={[{required: true}]}>
                    <DatePicker onChange={handleChangeDataPicker} format='DD/MM/YYYY' name='ngayKhoiChieu'/>
                </Form.Item>

                <Form.Item label="Đang chiếu">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('dangChieu', checked)
                    }} name='dangChieu'/>
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('sapChieu', checked)
                    }} name='sapChieu'/>
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={(checked) => {
                        handleChangeSwitch('hot', checked)
                    }} name='hot'/>
                </Form.Item>
                <Form.Item label="Đánh giá" name={['danhGia']}>
                    <Rate tooltips={desc} value={star} onChange={(value) => {
                        setStar(value);
                        formik.setFieldValue('danhGia', value)
                    }} name='danhGia'
                    />
                    {star ? <span className="ant-rate-text">{desc[star - 1]}</span> : ''}
                </Form.Item>

                <Form.Item label="Hình ảnh" required tooltip="Không được để trống hình">
                    <input onChange={handleChangeFile} accept='image/png, image/jpq, image/jpeg, image/gif' type='file'
                           name='hinhAnh'/>
                    <img style={{width: 200}} className='mt-2' src={imgSrc} alt="..."/>
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

export default AddFilms;