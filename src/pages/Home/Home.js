import React, {useEffect} from 'react';
import HomeMenu from "./HomeMenu/HomeMenu";
import {useDispatch, useSelector} from "react-redux";
import MultipleRowSlick from "../../components/RSslick/MultipleRowSlick";
import {getListFilmsAction} from "../../store/actions/FilmsAction";
import {CinemaSystemActions} from "../../store/actions/CinemaSystemActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import News from "../News/News";

function Home(props) {

    const dispatch = useDispatch();
    const {arrFilms} = useSelector(state => state.FilmsReducer)
    const {arrCinema} = useSelector(state => state.CinemaSystemReducer)

    useEffect(() => {
        dispatch(getListFilmsAction());
        dispatch(CinemaSystemActions())
    }, [])

    return <div>
        <HomeCarousel/>

        <section className='container lg:mx-auto my-0 lg:px-36 px-11 mb-32'>
            {/*<div className="text-gray-600 body-font mx-20">*/}
            {/*    <div className="px-5 py-24 mx-auto">*/}
            {/*        <MultipleRowSlick arrFilms={arrFilms}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="px-0 lg:px-5 py-24 mx-auto text-gray-600 body-font mx-0
            {/*md:mx-20*/}
            ">
                    <MultipleRowSlick arrFilms={arrFilms}/>
            </div>

            <div className='
            mx-0
            {/*md:mx-20*/}
            px-0
            {/*md:px-9*/}
            '>
                <HomeMenu arrCinema={arrCinema}/>
                <News/>
            </div>
        </section>
    </div>
}

export default Home;