import React, {Fragment, useEffect, useState} from 'react';
import {Table, Button, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {deleteFilmsAction, getDetailFilmsAction, getListFilmsAction} from "../../../store/actions/FilmsAction";
import {CalendarOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import Search from "antd/es/input/Search";
import {GROUP_ID, history, http} from "../../../util/settings";
import {SET_FILMS, SET_LIST_USER} from "../../../store/types/Type";
import {deleteUserAction, getListUserAction} from "../../../store/actions/UserAction";


function Users(props) {

    const {listUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    console.log('list-user', listUser)

    useEffect(() => {
        dispatch(getListUserAction())
    }, [])

    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            width: '10%',
            sorter: (a, b) => a.taiKhoan - b.taiKhoan,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            defaultSortOrder: 'descend',
            width: '10%',
            responsive: ['lg'],
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            width: '15%',
            // sorter: (a, b) => {
            //     let nameFilmA = a.tenPhim.toLowerCase().trim();
            //     let nameFilmB = b.tenPhim.toLowerCase().trim();
            //     if (nameFilmA > nameFilmB) {
            //         return 1
            //     }
            //     return -1
            // },
            sortDirections: ['descend', 'ascend'],
            responsive: ['lg'],
        },
        {
            title: 'Mã loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            // render: (item, film, index) => {
            //     return <Fragment>
            //         {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
            //     </Fragment>
            // },
            sortDirections: ['descend', 'ascend'],
            width: '10%',
            responsive: ['lg'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            // render: (item, film, index) => {
            //     return <Fragment>
            //         {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
            //     </Fragment>
            // },
            sortDirections: ['descend', 'ascend'],
            width: '15%',
            responsive: ['lg'],
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            // render: (item, film, index) => {
            //     return <Fragment>
            //     </Fragment>
            // },
            sortDirections: ['descend', 'ascend'],
            width: '15%',
            responsive: ['lg'],
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (item, user, index) => {
                return <Fragment>
                    <NavLink to={`/admin/users/edit/${index}/${user.taiKhoan}`}>
                        <Button type="primary" icon={<EditOutlined/>}/>
                    </NavLink>
                    <Button type="primary" danger icon={<CloseOutlined/>}
                            className='mx-4'
                            onClick={() => {
                                if (window.confirm('Bạn có chắc muốn xóa tài khoản ' + user.taiKhoan)) {
                                    dispatch(deleteUserAction(user.taiKhoan))
                                }
                            }}
                    />
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '10%',
            // responsive: ['lg'],
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    const onSearch = (keyWord = '') => {
        http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${keyWord}`).then((response) => {
            console.log('response: ' + response);
            dispatch({
                type: SET_LIST_USER,
                listUser: response.data.content
            })
        }).catch(error => {
            console.log({error});
        })
    };

    return (
        <div>
            <Search
                placeholder="input search text"
                size='large' className='mb-5' allowClear onSearch={onSearch}
            />
            <Table columns={columns} dataSource={listUser} onChange={onChange}
                   // rowKey={"maPhim"}
            />
        </div>
    );
}


export default Users;
