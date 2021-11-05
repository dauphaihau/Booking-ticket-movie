import React from 'react';
import {GROUP_ID, history, http} from "../../util/settings";
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {Button, Input, useInput} from "@nextui-org/react";
import * as Yup from "yup";

function Register() {

    const {reset} = useInput('');
    const [message, setMessage] = React.useState('')
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
            taiKhoan: Yup.string().required('Username is required').required('Username is required').min(6, 'Username must be at least 6 characters.').max(20, 'Username have max 20 characters'),
            email: Yup.string().required('Email is required').email('Email should be valid and contain @'),
            matKhau: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters.').max(32, 'Password have max 32 characters'),
            hoTen: Yup.string().required('Name is required').matches(/^[A-Z a-z]+$/, 'Names cannot contain numbers !'),
            soDt: Yup.string().required('Phone Number is required').matches(/^[0-9]*$/, 'number phone must be a number').min(6, 'Phone Number must be at least 6 characters.').max(32, 'Phone Number have max 32 characters'),
        }),
        onSubmit: (values) => {
            http.post('/api/QuanLyNguoiDung/DangKy', values).then((response) => {
                console.log('response: ' + response);
                history.push('/login')
            }).catch(error => {
                console.log({error});
                if (error.response.status === 400) {
                  setMessage('Username already exists')
                }
            })
        }
    })

    const handleColorEmail = () => formik.touched.email && formik.errors.email ? 'error' : '';
    const handleColorName = () => formik.touched.hoTen && formik.errors.hoTen ? 'error' : '';
    const handleColorPhone = () => formik.touched.soDt && formik.errors.soDt ? 'error' : '';
    const handleColorPassword = () => formik.touched.matKhau && formik.errors.matKhau ? 'error' : '';
    const handleColorUsername = () => formik.touched.taiKhoan && formik.errors.taiKhoan ? 'error' : '';

    return (
        <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-lg">
            <div className="px-12 py-12 md:pt-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
                    Đăng Ký
                </h2>
                <div className="mt-12">
                    <div className='mb-8'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.taiKhoan && formik.errors.taiKhoan ?  `${formik.errors.taiKhoan}` : null  }
                            clearable name='taiKhoan'
                            helperColor={handleColorUsername()}
                            status={handleColorUsername()}
                            color={handleColorUsername()}
                            label="Username" size='large' width='100%'
                        />
                    </div>
                    <p className='jsx-2076578745 helper-text
                    text-[#f21361] mt-[-13px] mb-4
                    text-[0.7rem] ml-[10px]
                    '>{message}</p>

                    <div className='mb-8'>
                        <Input.Password
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.matKhau && formik.errors.matKhau ? `${formik.errors.matKhau}` : null}
                            helperColor={handleColorPassword()}
                            status={handleColorPassword()}
                            color={handleColorPassword()}
                            name='matKhau'
                            label="Password" size='large' type="password"
                            width='100%'
                        />
                    </div>
                    <div className='mb-8'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.email && formik.errors.email ? `${formik.errors.email}` : null}
                            helperColor={handleColorEmail()}
                            status={handleColorEmail()}
                            color={handleColorEmail()}
                            onClearClick={reset}
                            clearable name='email'
                            type='email'
                            label="Email" size='large' width='100%'
                        />
                    </div>
                    <div className='mb-8'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.hoTen && formik.errors.hoTen ? `${formik.errors.hoTen}` : null}
                            clearable name='hoTen'
                            helperColor={handleColorName()}
                            status={handleColorName()}
                            color={handleColorName()}
                            label="Name" size='large' width='100%'
                        />
                    </div>
                    <div className='mb-16'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.soDt && formik.errors.soDt ? `${formik.errors.soDt}` : null}
                            helperColor={handleColorPhone()}
                            status={handleColorPhone()}
                            color={handleColorPhone()}
                            clearable name='soDt'
                            label="Phone Number" size='large' width='100%'
                        />
                    </div>
                    <div>
                        <Button style={{width: '100%'}} shadow color="primary" auto
                                type='submit' size='large'
                        >
                            Sign up
                        </Button>
                    </div>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        have already an account ? {" "}
                        <NavLink to='/login' className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Sign in
                        </NavLink>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;