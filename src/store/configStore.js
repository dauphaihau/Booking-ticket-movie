import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {CarouselReducer} from "./reducers/CarouselReducer";
import {FilmsReducer} from "./reducers/FilmsReducer";
import {CinemaSystemReducer} from "./reducers/CinemaSystemReducer";

const rootReducer = combineReducers({
    CarouselReducer,
    FilmsReducer,
    CinemaSystemReducer,

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
