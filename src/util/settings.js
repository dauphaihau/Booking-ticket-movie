import createSagaMiddleware from 'redux-saga'
import {createBrowserHistory} from "history";



export const middleWareSaga = createSagaMiddleware();
export const history = createBrowserHistory();
