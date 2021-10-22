import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import {
    actGetInfoUser,
    actUpdateInfoUser,
} from "redux/actions/UserManagementActions";
import { useDispatch, useSelector } from "react-redux";
import Notification from "components/Notification";
import Loading from "components/Loading";

const validateRePass = (value, password) => {
    let error;
    if (value !== password) {
        error = "Mật khẩu không khớp";
    }
    return error;
};

const EditUser = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "success",
    });

    const { infoUserEdit, error, isLoading, userLogin } = useSelector(
        (state) => state.userManagementReducer
    );

    useEffect(() => {
        dispatch(actGetInfoUser(props.match.params.id));
    }, []);

    // Kiểm tra xem các giá trị nào thay đổi nếu thay đổi thì push vào mảng để validate
    const checkValueChange = (values) => {
        const valueChange = [];

        for (let key in values) {
            if (key !== "reMatKhau") {
                if (key === "soDt") {
                    values[key] !== (infoUserEdit[key] || infoUserEdit.soDT) &&
                    valueChange.push(key);
                } else {
                    values[key] !== infoUserEdit[key] && valueChange.push(key);
                }
            } else if (key === "reMatKhau") {
                values.reMatKhau !== values.matKhau && valueChange.push("reMatKhau");
            }
        }

        return valueChange;
    };

    const validate = (values) => {
        const valueChange = checkValueChange(values);
        const errors = {};

        if (!values.taiKhoan && valueChange.includes("taiKhoan")) {
            errors.taiKhoan = "Tài khoản không được để trống!";
        } else if (
            (values.taiKhoan.length > 24 || values.taiKhoan.length < 6) &&
            valueChange.includes("taiKhoan")
        ) {
            errors.taiKhoan = "Tài khoản có độ dài từ 6 đến 24 ký tự!";
        } else if (
            !/^[a-zA-Z0-9]+$/i.test(values.taiKhoan) &&
            valueChange.includes("taiKhoan")
        ) {
            errors.taiKhoan = "Tài khoản chỉ gồm chữ và số!";
        }

        if (
            !values.matKhau &&
            valueChange.includes("matKhau") &&
            valueChange.includes("matKhau")
        ) {
            errors.matKhau = "Mật khẩu không được để trống!";
        } else if (
            (values.matKhau.length > 32 || values.matKhau.length < 8) &&
            valueChange.includes("matKhau")
        ) {
            errors.matKhau = "Mật khẩu có độ dài từ 8 đến 32 ký tự!";
        }

        if (
            !values.email &&
            valueChange.includes("email") &&
            valueChange.includes("email")
        ) {
            errors.email = "Email không được để trống!";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
            valueChange.includes("email")
        ) {
            errors.email = "Email bạn nhập không đúng định dạng!";
        }

        if (values.soDt !== null && valueChange.includes("soDt")) {
            if (!values.soDt && valueChange.includes("soDt")) {
                errors.soDt = "Số điện thoại không được để trống!";
            } else if (
                !/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/i.test(values.soDt) &&
                valueChange.includes("soDt")
            ) {
                errors.soDt = "Số điện thoại bạn nhập không đúng!";
            }
        }

        if (!values.hoTen && valueChange.includes("hoTen")) {
            errors.hoTen = "Họ và Tên không được để trống!";
        } else if (
            !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/i.test(
                values.hoTen
            ) &&
            valueChange.includes("hoTen")
        ) {
            errors.hoTen = "Họ và Tên không hợp lệ!";
        }

        if (!values.maLoaiNguoiDung && valueChange.includes("maLoaiNguoiDung")) {
            errors.maLoaiNguoiDung = "Vui lòng chọn loại tài khoản!";
        }

        errors.reMatKhau =
            validateRePass(values.reMatKhau, values.matKhau) &&
            valueChange.includes("reMatKhau")
                ? validateRePass(values.reMatKhau, values.matKhau)
                : undefined;

        // chỉ vần e errors có value thì nó check
        // Phải xóa nếu reMatKhau trong error để khỏi check
        // Các hàm trên tách hàm thì cũng cần xóa nên e không tách
        !errors.reMatKhau && delete errors.reMatKhau;

        return errors;
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: infoUserEdit?.taiKhoan,
            matKhau: infoUserEdit?.matKhau,
            email: infoUserEdit?.email,
            soDt: infoUserEdit?.soDT,
            maNhom: infoUserEdit?.maNhom,
            maLoaiNguoiDung: infoUserEdit?.maLoaiNguoiDung,
            hoTen: infoUserEdit?.hoTen,
            reMatKhau: infoUserEdit?.matKhau,
        },
        validate,
        onSubmit: (values) => {
            console.log(values);
            dispatch(actUpdateInfoUser(values, setNotify));
        },
    });

    if (error) {
        return (
            <>
                <p>{error.response.data.content}</p>
                <Button onClick={() => history.replace("/admin/user-management")}>
                    Quay Về Quản Lý Người Dùng
                </Button>
            </>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Notification notify={notify} setNotify={setNotify} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl sx={{ width: "600px" }}>
                        <Box component="h2">Chỉnh sửa người dùng</Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                            <TextField
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled
                                value={formik.values.taiKhoan || ""}
                                sx={{ width: "100%" }}
                                label="Tài khoản *"
                                name="taiKhoan"
                            />
                            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                                <FormHelperText sx={{ color: "red", fontSize: "16px" }}>
                                    {formik.errors.taiKhoan}
                                </FormHelperText>
                            ) : null}
                        </Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                            <TextField
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hoTen || ""}
                                sx={{ width: "100%" }}
                                label="Họ tên *"
                                name="hoTen"
                                id="hoTen"
                            />
                            {formik.touched.hoTen && formik.errors.hoTen ? (
                                <FormHelperText sx={{ color: "red", fontSize: "16px" }}>
                                    {formik.errors.hoTen}
                                </FormHelperText>
                            ) : null}
                        </Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                            <TextField
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email || ""}
                                sx={{ width: "100%" }}
                                label="Email *"
                                name="email"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <FormHelperText sx={{ color: "red", fontSize: "16px" }}>
                                    {formik.errors.email}
                                </FormHelperText>
                            ) : null}
                        </Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                            <TextField
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                    formik.values.soDt === null
                                        ? "Số điện thoại bị lỗi với tài khoản này"
                                        : formik.values.soDt
                                            ? formik.values.soDt
                                            : ""
                                }
                                disabled={formik.values.soDt === null ? true : false}
                                sx={{ width: "100%" }}
                                label="Số điện thoại *"
                                name="soDt"
                            />
                            {formik.touched.soDt && formik.errors.soDt ? (
                                <FormHelperText sx={{ color: "red", fontSize: "16px" }}>
                                    {formik.errors.soDt}
                                </FormHelperText>
                            ) : null}
                        </Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                            <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
                                Loại tài khoản
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-label="gender"
                                value={
                                    formik.values.maLoaiNguoiDung
                                        ? formik.values.maLoaiNguoiDung
                                        : ""
                                }
                                defaultValue={
                                    formik.values.maLoaiNguoiDung
                                        ? formik.values.maLoaiNguoiDung
                                        : ""
                                }
                                name="maLoaiNguoiDung"
                                onBlur={formik.handleBlur}
                                onChange={(e) =>
                                    formik.setFieldValue("maLoaiNguoiDung", e.target.value)
                                }
                            >
                                <FormControlLabel
                                    disabled={userLogin?.taiKhoan === infoUserEdit?.taiKhoan}
                                    value={"QuanTri"}
                                    control={<Radio />}
                                    label="Quản Trị"
                                />
                                <FormControlLabel
                                    disabled={userLogin?.taiKhoan === infoUserEdit?.taiKhoan}
                                    value={"KhachHang"}
                                    control={<Radio />}
                                    label="Khách Hàng"
                                />
                            </RadioGroup>
                            {formik.touched.maLoaiNguoiDung &&
                            formik.errors.maLoaiNguoiDung ? (
                                <FormHelperText sx={{ color: "red", fontSize: "16px" }}>
                                    {formik.errors.maLoaiNguoiDung}
                                </FormHelperText>
                            ) : null}
                        </Box>

                        <Box sx={{ paddingBottom: "10px" }}>
                            <TextField
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.matKhau || ""}
                                sx={{ width: "100%" }}
                                label="Mật khẩu *"
                                name="matKhau"
                            />
                            {formik.touched.matKhau && formik.errors.matKhau ? (
                                <FormHelperText sx={{ color: "red", fontSize: "16px" }}>
                                    {formik.errors.matKhau}
                                </FormHelperText>
                            ) : null}
                        </Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                            <TextField
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.reMatKhau || ""}
                                sx={{ width: "100%" }}
                                label="Nhập lại mật khẩu *"
                                name="reMatKhau"
                            />
                            {formik.touched.reMatKhau && formik.errors.reMatKhau ? (
                                <FormHelperText sx={{ color: "red", fontSize: "16px" }}>
                                    {formik.errors.reMatKhau}
                                </FormHelperText>
                            ) : null}
                        </Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                            <Button
                                onSubmit={formik.handleSubmit}
                                variant="contained"
                                type="submit"
                            >
                                Cập nhật
                            </Button>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </>
    );
};
export default EditUser;