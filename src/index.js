import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from "./store/configStore";
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {DOMAIN} from "./util/settings";
import * as signalR from "@aspnet/signalr";
import './i18n'

export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

connection.start().then(function () {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
}).catch(errors => {
    console.log('errors', errors)
})

reportWebVitals();
