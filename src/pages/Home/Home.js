import React, {useEffect} from 'react';
import HomeMenu from "./HomeMenu/HomeMenu";
import {useDispatch, useSelector} from "react-redux";
import MultipleRowSlick from "../../components/RSslick/MultipleRowSlick";
import {getListFilmsAction} from "../../store/actions/FilmsAction";
import {CinemaSystemActions} from "../../store/actions/CinemaSystemActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import News from "../News/News";

function Home() {

    const dispatch = useDispatch();
    const {arrFilms} = useSelector(state => state.FilmsReducer)
    const {arrCinema} = useSelector(state => state.CinemaSystemReducer)

    useEffect(() => {
        dispatch(getListFilmsAction());
        dispatch(CinemaSystemActions())
    }, [])

    return <div>

        <div className='overflow-x-hidden'>
            <HomeCarousel/>
        </div>
        <section className='lg:container lg:mx-auto my-0 lg:px-4 xl:px-0 px-7 mb-32'>
            <div className="px-0 lg:px-0 py-24 mx-auto text-gray-600 body-font mx-0">
                <MultipleRowSlick arrFilms={arrFilms}/>
            </div>
            <div className='mx-0 px-0'>
                <HomeMenu arrCinema={arrCinema}/>
                <News className='rounded-full overflow-scroll h-[-550px]'/>
            </div>
        </section>
    </div>
}

export default Home;