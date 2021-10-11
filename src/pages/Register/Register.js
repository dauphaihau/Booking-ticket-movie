import React from 'react';
import {GROUP_ID, history, http} from "../../util/settings";
import {useFormik} from "formik";
import {NavLink, Redirect} from "react-router-dom";
import {Button, Input} from "@nextui-org/react";
import * as Yup from "yup";

function Register(props) {

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            email: "",
            matKhau: "",
            hoTen: "",
            soDt: "",
            maNhom: GROUP_ID,
        },
        validationSchema: Yup.object({
            // maNhom: Yup.string().required('Mã nhóm không được bỏ trống'),
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(6, 'Tài khoản ít nhất phải 6 ký tự').max(32, 'Tài khoản không được quá 32 ký tự'),
            matKhau: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất phải 6 ký tự').max(32, 'Mật khẩu không được quá 32 ký tự'),
            email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
            hoTen: Yup.string().required('Họ tên không được để trống').matches(/^[A-Z a-z]+$/, 'Tên không được chứa số !'),
            soDt: Yup.string().required('Số điện thoại không được để trống').matches(/^[0-9]*$/, 'Số điện thoại không được chứa chữ').min(9, 'Số điện thoại ít nhất phải 9 số').max(12, 'Số điện thoại không được quá 12 số'),
        }),
        onSubmit: (values) => {
            console.log('values', values)

            http.post('/api/QuanLyNguoiDung/DangKy', values).then((response) => {
                console.log('response: ' + response);
                alert('Đăng ký thành công')
                history.push('/login')
            }).catch(error => {
                console.log({error});
            })
        }
    })

    if (localStorage.getItem('accessToken')) {
        return <Redirect to='/'/>
    }

    return (
        <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="px-12 md:pt-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
                    Đăng Ký
                </h2>
                <div className="mt-12">
                    <div className='mb-8'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.taiKhoan && formik.errors.taiKhoan ? `${formik.errors.taiKhoan}` : null}
                            clearable name='taiKhoan'
                            // helperText="Please enter your name"
                            label="Tài khoản" size='large' placeholder="Nhập tên tài khoản của bạn" width='100%'
                        />
                    </div>
                    <div className='mb-8'>
                        <Input.Password
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.matKhau && formik.errors.matKhau ? `${formik.errors.matKhau}` : null}
                            name='matKhau'
                            // helperText="Please enter your name"
                            label="Mật khẩu" size='large' type="password" placeholder="Nhập mật khẩu của bạn"
                            width='100%'
                        />
                    </div>
                    <div className='mb-8'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.email && formik.errors.email ? `${formik.errors.email}` : null}
                            clearable name='email'
                            label="Email" size='large' placeholder="Nhập email của bạn" width='100%'
                        />
                    </div>
                    <div className='mb-8'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.hoTen && formik.errors.hoTen ? `${formik.errors.hoTen}` : null}
                            clearable name='hoTen'
                            label="Họ tên" size='large' placeholder="Nhập họ tên của bạn" width='100%'
                        />
                    </div>
                    <div className='mb-16'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.soDt && formik.errors.soDt ? `${formik.errors.soDt}` : null}
                            clearable name='soDt'
                            label="Số điện thoại" size='large' placeholder="Nhập số điện thoại của bạn" width='100%'
                        />
                    </div>
                    <div>
                        <Button style={{width: '100%'}} shadow color="primary" auto
                                type='submit' size='xlarge'
                        >
                            Đăng Ký
                        </Button>
                    </div>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        Bạn đã có tài khoản ?{" "}
                        <NavLink to='/login' className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Đăng nhập
                        </NavLink>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;