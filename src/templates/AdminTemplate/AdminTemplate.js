import {NavLink, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, Fragment} from "react";
import {history, USER_LOGIN} from "../../util/settings";
import {OPEN_MODAL} from "../../store/types/Type";

// UI
import {Layout, Menu} from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';

const {Sider, Content} = Layout;
const {SubMenu} = Menu;

const AdminTemplate = (props) => {

    const {Component, ...restProps} = props;
    const {userLogin} = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!localStorage.getItem(USER_LOGIN)) {
            dispatch({type: OPEN_MODAL})
        }
    }, [dispatch])

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
                    <div className="bg-white logo text-center flex justify-center py-6">
                        <div className="flex flex-col items-center mt-6 -mx-2">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <h4 className="mx-2 mt-2 cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:underline"
                                onClick={() => {
                                    history.push(`/setting/profile/${userLogin.taiKhoan}`)
                                }}
                            >{userLogin.hoTen}</h4>
                        </div>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" icon={<VideoCameraOutlined/>} title="Film Management">
                            <Menu.Item key="1">
                                <NavLink to='/admin/films'>Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to='/admin/films/addfilms'>Add Film</NavLink>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" icon={<UserOutlined/>} title="User Management">
                            <Menu.Item key="3">
                                <NavLink to='/admin/users'>Users</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink to='/admin/users/adduser'>Add User</NavLink>
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="5" icon={<PoweroffOutlined/>}
                                   onClick={() => {
                                       localStorage.clear();
                                       window.location.href = '/login'
                                   }}>
                            Log out
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout className="site-layout ">
                    <Content
                        className="site-layout-background"
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

export default AdminTemplate
