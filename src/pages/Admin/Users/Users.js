import React, {Fragment, useEffect} from 'react';
import {Table, Button, Tag} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import Search from "antd/es/input/Search";
import {GROUP_ID, http} from "../../../util/settings";
import {SET_LIST_USER} from "../../../store/types/Type";
import {deleteUserAction, getListUserAction} from "../../../store/actions/UserAction";


function Users() {

    const {listUser} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListUserAction())
    }, [dispatch])

    const columns = [
        {
            title: 'Username',
            dataIndex: 'taiKhoan',
            defaultSortOrder :'descend',
            width: '12%',
            sorter: (a, b) => a.taiKhoan - b.taiKhoan,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Password',
            dataIndex: 'matKhau',
            defaultSortOrder: 'descend',
            width: '13%',
            // responsive: ['md'],
        },
        {
            title: 'Name',
            dataIndex: 'hoTen',
            width: '15%',
            sorter: (a, b) => {
                let nameA = a.hoTen.toLowerCase().trim();
                let nameB = b.hoTen.toLowerCase().trim();
                if (nameA > nameB) {
                    return 1
                }
                return -1
            },
            sortDirections: ['descend', 'ascend'],
            // responsive: ['lg'],
        },
        {
            title: 'Type User',
            dataIndex: 'maLoaiNguoiDung',
            sortDirections: ['descend', 'ascend'],
            width: '15%',
            // responsive: ['md'],
            render: (item, user) => user.maLoaiNguoiDung === 'QuanTri' ?
                <Tag color="warning">{user.maLoaiNguoiDung}</Tag> : <Tag color="processing">{user.maLoaiNguoiDung}</Tag>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sortDirections: ['descend', 'ascend'],
            width: '20%',
            // responsive: ['lg'],
        },
        {
            title: 'Phone Number',
            dataIndex: 'soDt',
            sortDirections: ['descend', 'ascend'],
            width: '15%',
            // responsive: ['xxl'],
        },
        {
            title: 'Actions',
            dataIndex: 'hanhDong',
            fixed: 'right',
            render: (item, user) => {
                return <Fragment>
                    <div className='flex'>

                    <NavLink to={`/admin/users/edit/${user.taiKhoan}`}>
                        <Button type="primary" icon={<EditOutlined/>}/>
                    </NavLink>
                    <Button type="primary" danger icon={<CloseOutlined/>}
                            className='mx-4'
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete account ' + user.taiKhoan)) {
                                    dispatch(deleteUserAction(user.taiKhoan))
                                }
                            }}
                    />
                    </div>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '11%',
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
            <Search placeholder="input search text" size='large' className='mb-5'
                    allowClear onSearch={onSearch}
            />
            <Table columns={columns} dataSource={listUser} onChange={onChange}
           scroll={{x: 1200}}
            />
        </div>
    );
}


export default Users;
