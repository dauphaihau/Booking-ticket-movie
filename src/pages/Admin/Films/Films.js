import React, {Fragment, useEffect, useState} from 'react';
import {Table, Button, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {deleteFilmsAction, getDetailFilmsAction, getListFilmsAction} from "../../../store/actions/FilmsAction";
import {CalendarOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import Search from "antd/es/input/Search";


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
                        <Button type="primary" icon={<EditOutlined/>}/>
                    </NavLink>
                    <Button type="primary" danger icon={<CloseOutlined/>}
                            className='mx-4'
                            onClick={() => {
                                if (window.confirm('Bạn có chắc muốn xóa phim' + film.tenPhim)) {
                                    dispatch(deleteFilmsAction(film.maPhim))
                                }
                            }}
                    />
                    <NavLink to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
                             onClick={() => {
                                 localStorage.setItem('filmParams', JSON.stringify(film))
                             }}
                    >
                        <Button style={{backgroundColor: 'green', color: 'white', border: 'none'}}
                                icon={<CalendarOutlined/>}/>
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

    const onSearch = (values) => {
        console.log('values', values)
        dispatch(getListFilmsAction(values))
    };

    return (
        <div>
            <Search
                placeholder="input search text"
                size='large' className='mb-5' allowClear onSearch={onSearch}
            />
            <Table columns={columns} dataSource={arrFilmDefault} onChange={onChange} rowKey={"maPhim"}/>
        </div>
    );
}


export default Films;