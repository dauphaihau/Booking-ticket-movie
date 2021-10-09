import {NavLink, Redirect, Route} from "react-router-dom";
import React, {useEffect} from "react";
import {Layout, Menu} from 'antd';
import {Fragment, useState} from "react";
import {
    UserOutlined,
    VideoCameraOutlined,
    HistoryOutlined, PoweroffOutlined, HomeOutlined,
} from '@ant-design/icons';
import {USER_LOGIN} from "../../util/settings";
import {useSelector} from "react-redux";

const {Sider, Content} = Layout;
const {SubMenu} = Menu;

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
                        <div className="logo text-center flex justify-center mb-8 mt-4">
                            <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px"
                                 viewBox="0 0 225 225" style={{enableBackground: "new 0 0 225 225"}}
                                 xmlSpace="preserve">
                                <style type="text/css"
                                       dangerouslySetInnerHTML={{__html: "\n.st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                "}}/>
                                <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                    <g>
                                        <path id="Layer0_0_1_STROKES" className="st0"
                                              d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"/>
                                    </g>
                                </g>
                            </svg>
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
                            <NavLink to='/admin/films'>Lịch sử đặt vé</NavLink>
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
