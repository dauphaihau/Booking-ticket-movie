import React from 'react';
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoginAction} from "../../store/actions/UserAction";
import * as Yup from "yup";
import {Button, Input} from "@nextui-org/react";
import {ERROR_FORM_SERVER} from "../../store/types/Type";

function Login() {

    const dispatch = useDispatch();
    const {messageServer} = useSelector(state => state.UserReducer)

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Username is required'),
            matKhau: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters.').max(32, 'Password have max 32 characters'),
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
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Sign
                    in</h2>
                <div className="mt-12">
                    <div className='my-6'>
                        <Input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.taiKhoan && formik.errors.taiKhoan ? `${formik.errors.taiKhoan}` : null}
                            clearable name='taiKhoan'
                            placeholder="Username"
                            size='large' width='100%'
                        />
                    </div>
                        {messageServer !== '' ? <p className='jsx-2076578745 helper-text
                    text-[#f21361] mt-[16px] mb-4
                    text-[0.7rem] ml-[10px]
                    '>{messageServer}</p> : ''
                        }
                    <div className='mb-12'>
                        <Input.Password
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.matKhau && formik.errors.matKhau ? `${formik.errors.matKhau}` : null}
                            name='matKhau'
                            placeholder="Password"
                            size='large' type="password"
                            width='100%'
                        />
                    </div>
                    <div >
                        <Button style={{width: '100%'}} shadow color="primary" auto
                                type='submit' size='large'
                        >
                            Sign in
                        </Button>
                    </div>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        Don’t have an account?{" "}
                        <NavLink to='/register'
                                 onClick={() => {
                                     dispatch({type: ERROR_FORM_SERVER, messageServer: ''})
                                 }}
                                 className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Sign up
                        </NavLink>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;