import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {CarouselReducer} from "./reducers/CarouselReducer";
import {FilmsReducer} from "./reducers/FilmsReducer";

const rootReducer = combineReducers({
    CarouselReducer,
    FilmsReducer,

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
