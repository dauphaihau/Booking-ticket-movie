import React, {Fragment, useEffect, useState} from 'react';
import {Table, Button, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getDetailFilmsAction, getListFilmsAction} from "../../../store/actions/FilmsAction";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

function Films(props) {

    const {arrFilmDefault} = useSelector(state => state.FilmsReducer)
    const dispatch = useDispatch();
    console.log('arr-film-default', arrFilmDefault)

    useEffect(() => {
        dispatch(getListFilmsAction())
    }, [])

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            width: '8%',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            defaultSortOrder: 'descend',
            width: '12%',
            render: (item, film, index) => {
                return <Fragment>
                    <img onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://picsum.photos/id/${index}/200/200`
                    }}
                         width={50} height={50}
                         src={film.hinhAnh} alt={film.tenPhim}/>
                </Fragment>
            }
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            width: '30%',
            sorter: (a, b) => {
                let nameFilmA = a.tenPhim.toLowerCase().trim();
                let nameFilmB = b.tenPhim.toLowerCase().trim();
                if (nameFilmA > nameFilmB) {
                    return 1
                }
                return -1
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (item, film, index) => {
                return <Fragment>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '35%'
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (item, film, index) => {
                return <Fragment>
                    <NavLink to={`/admin/films/edit/${film.maPhim}`}>
                        <Button className='mr-4' type="primary" icon={<EditOutlined/>}/>
                    </NavLink>

                    <NavLink to={`/admin/edit/${film.maPhim}`}>
                        <Button type="primary" danger icon={<CloseOutlined/>}/>
                    </NavLink>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '20%'
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div>
            <Table columns={columns} dataSource={arrFilmDefault} onChange={onChange}/>
        </div>
    );
}


export default Films;