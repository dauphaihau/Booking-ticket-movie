import React, {useState} from 'react';
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LoginAction} from "../../store/actions/UserAction";
import * as Yup from "yup";
import {Button, Input} from "@nextui-org/react";

function Login() {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(6, 'Tài khoản ít nhất phải 6 ký tự').max(32, 'Tài khoản không được quá 32 ký tự'),
            matKhau: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất phải 6 ký tự').max(32, 'Mật khẩu không được quá 32 ký tự'),
        }),
        onSubmit: values => {
            dispatch(LoginAction(values))
        }
    })


    return (
        <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-lg">
            <div className="py-12 bg-white flex  lg:justify-start px-12">
                <div className="cursor-pointer flex items-center">
                    <div>
                        <svg className="w-10 text-blue-500"
                             xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink"
                             version="1.1"
                             id="Layer_1"
                             x="0px"
                             y="0px"
                             viewBox="0 0 225 225"
                             style={{enableBackground: "new 0 0 225 225"}}
                             xmlSpace="preserve"
                        >
                            <style type="text/css"
                                   dangerouslySetInnerHTML={{__html: "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                "}}/>
                            <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                <g>
                                    <path
                                        id="Layer0_0_1_STROKES"
                                        className="st0"
                                        d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="text-2xl text-blue-800 tracking-wide ml-2 font-semibold">
                        Moviee
                    </div>
                </div>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Đăng
                    Nhập</h2>
                <div className="mt-12">
                    <div className='mt-6'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.taiKhoan && formik.errors.taiKhoan ? `${formik.errors.taiKhoan}` : null}
                            clearable name='taiKhoan'
                            labelPlaceholder="Tài khoản"
                            size='large' width='100%'
                        />
                    </div>
                    <div className='mt-12 mb-8'>
                        <Input.Password
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.matKhau && formik.errors.matKhau ? `${formik.errors.matKhau}` : null}
                            name='matKhau'
                            labelPlaceholder="Mật khẩu"
                            size='large' type="password"
                            width='100%'
                        />
                    </div>
                    <div className="mt-16">
                        <Button style={{width: '100%'}} shadow color="primary" auto
                                type='submit' size='large'
                        >
                            Đăng Nhập
                        </Button>
                    </div>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        Bạn chưa có tài khoản ?{" "}
                        <NavLink to='/register' className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Đăng ký
                        </NavLink>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;