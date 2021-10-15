/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {ACCESS_TOKEN, history, USER_LOGIN} from "../../../../util/settings";
import _ from "lodash";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const navigation = [
    {name: 'Trang chủ', href: '/', current: true},
    {name: 'Liên hệ', href: '/contact', current: false},
    {name: 'Tin tức', href: '/news', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {

    const [stateLang, setStateLang] = useState('Tiếng Anh')
    const {userLogin} = useSelector(state => state.UserReducer)
    const {t, i18n} = useTranslation();

    const handleChange = () => {
        setStateLang( 'Tiếng Việt')
        let keyLang = '';
        stateLang === 'Tiếng Việt' ? keyLang = 'en' : keyLang = 'vi';
        // if(stateLang === 'Tiếng Việt' ) return keyLang = 'en';
        i18n.changeLanguage(keyLang)
    }

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <>
                <button
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    onClick={() => {
                        history.push('/login')
                    }}
                >{t('Đăng nhập')}
                </button>
                <button
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    onClick={() => {
                        history.push('/register')
                    }}
                >{t('Đăng ký')}
                </button>
            </>
        }
        return <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({active}) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                onClick={() => {
                                    history.push(`/setting/profile/${userLogin.taiKhoan}`)
                                }}
                            >
                                Trang cá nhân
                            </a>
                        )}
                    </Menu.Item>
                    {/*<Menu.Item>*/}
                    {/*    {({active}) => (*/}
                    {/*        <a*/}

                    {/*            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}*/}
                    {/*            onClick={handleChange}*/}
                    {/*        >*/}
                    {/*            Tiếng Anh*/}
                    {/*            {stateLang}*/}
                    {/*        </a>*/}
                    {/*    )}*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item>
                        {({active}) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                onClick={() => {
                                    localStorage.removeItem(USER_LOGIN);
                                    localStorage.removeItem(ACCESS_TOKEN);
                                    history.push('/home');
                                    window.location.reload();
                                }}
                            >
                                Đăng xuất
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    }

    return (
        <Disclosure as="nav" className="z-10 bg-black fixed w-full bg-gray-100 opacity-70">
            {({open}) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px"
                                         viewBox="0 0 225 225" style={{enableBackground: "new 0 0 225 225"}} xmlSpace="preserve">
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
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                {renderLogin()}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
