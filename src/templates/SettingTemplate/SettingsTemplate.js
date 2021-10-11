import {NavLink, Redirect, Route} from "react-router-dom";
import React from "react";
import {Layout, Menu} from 'antd';
import {Fragment, useState} from "react";
import {
    UserOutlined,
    HistoryOutlined, PoweroffOutlined, HomeOutlined,
} from '@ant-design/icons';
import {history, USER_LOGIN} from "../../util/settings";
import {useSelector} from "react-redux";
import {Avatar} from "@nextui-org/react";

const {Sider, Content} = Layout;

export const SettingTemplate = (props) => {

    const {userLogin} = useSelector(state => state.UserReducer)
    const [state, setState] = useState({
        collapsed: false,
    })

    const {Component, ...restProps} = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không đủ quyền truy cập trang này !')
        return <Redirect to='/login'/>
    }

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };


    return <Route {...restProps} render={(propsRoute) => {

        return <Fragment>
            <Layout>
                <Sider width={200} className="site-layout-background"
                       breakpoint="lg"
                       collapsedWidth="0"
                       onBreakpoint={broken => {
                           console.log(broken);
                       }}
                       onCollapse={(collapsed, type) => {
                           console.log(collapsed, type);
                       }}
                >
                    <div className=" bg-white logo text-center flex justify-center py-6">
                        <div className="flex flex-col items-center mt-6 -mx-2">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                                <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">{userLogin.hoTen}</h4>
                        </div>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['2']}
                        // defaultOpenKeys={['1']}
                        style={{height: '100%', borderRight: 0}}
                    >

                        <Menu.Item key="1" icon={<HomeOutlined/>}>
                            <NavLink to='/'>Trang chủ</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined/>}>
                            <NavLink to={`/setting/profile/${userLogin.taiKhoan}`}>Thông tin tài khoản</NavLink>
                        </Menu.Item>


                        <Menu.Item key="3" icon={<HistoryOutlined/>}>
                            <NavLink to={`/setting/history/${userLogin.taiKhoan}`}>Lịch sử đặt vé</NavLink>
                        </Menu.Item>

                        <Menu.Item key="5" icon={<PoweroffOutlined/>}
                                   onClick={() => {
                                       localStorage.clear();
                                       window.location.href = '/login'
                                   }}>
                            Đăng xuất
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout ">
                    <Content
                        className="site-layout-background lg:m-auto"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: '100vh',
                        }}
                    >
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }}/>
}
