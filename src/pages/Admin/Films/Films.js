import React, {Fragment, useEffect} from 'react';
import {Table, Button} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {deleteFilmsAction, getListFilmsAction} from "../../../store/actions/FilmsAction";
import {CalendarOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import Search from "antd/es/input/Search";
import {GROUP_ID, http} from "../../../util/settings";
import {SET_FILMS} from "../../../store/types/Type";


function Films() {

    const {arrFilmDefault} = useSelector(state => state.FilmsReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListFilmsAction())
    }, [dispatch])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'maPhim',
            width: '8%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend', 'ascend'],
            // responsive: ['md'],
        },
        {
            title: 'Image',
            dataIndex: 'hinhAnh',
            defaultSortOrder: 'descend',
            width: '12%',
            render: (item, film, index) => {
                return <Fragment>
                    <img onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://picsum.photos/id/${index}/200/200`
                    }}
                         className='w-20 h-20'
                         src={film.hinhAnh} alt={film.tenPhim}/>
                </Fragment>
            }
            // , responsive: ['lg'],
        },
        {
            title: 'Name Film',
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
            title: 'Describe',
            dataIndex: 'moTa',
            render: (item, film) => {
                return <Fragment>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '35%',
            // responsive: ['xxl'],
        },
        {
            title: 'Actions',
            dataIndex: 'hanhDong',
            render: (item, film) => {
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
                    <NavLink to={`/admin/films/showtime/${film.maPhim}`}
                             onClick={() => {
                                 localStorage.setItem('filmParams', JSON.stringify(film))
                             }}
                    >
                        <Button className='md:mt-0 mt-4'
                                style={{backgroundColor: 'green', color: 'white', border: 'none'}}
                                icon={<CalendarOutlined/>}/>
                    </NavLink>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '14%',
            fixed: 'right'
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    const onSearch = (nameMovie = '') => {
        http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${nameMovie}`).then((response) => {
            console.log('response: ' + response);
            dispatch({
                type: SET_FILMS,
                arrFilms: response.data.content
            })
        }).catch(error => {
            console.log({error});
        })
    };

    return <>
        <Search
            onSearch={onSearch}
            placeholder="input search text"
            size='large'
            className='mb-5'
            allowClear
        />

        <Table
            onChange={onChange}
            columns={columns}
            dataSource={arrFilmDefault}
            rowKey={"maPhim"}
            scroll={{x: 1200}}
        />
    </>
}


export default Films;