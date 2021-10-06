import React, {useEffect} from 'react';
import HomeMenu from "./HomeMenu/HomeMenu";
import {useDispatch, useSelector} from "react-redux";
import MultipleRowSlick from "../../components/RSslick/MultipleRowSlick";
import Film from "../../components/Film/Film";
import {getListFilmsAction} from "../../store/actions/FilmsAction";
import {CinemaSystemReducer} from "../../store/reducers/CinemaSystemReducer";
import {CinemaSystemActions} from "../../store/actions/CinemaSystemActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

function Home(props) {

    const dispatch = useDispatch();
    const {arrFilms} = useSelector(state => state.FilmsReducer)
    const {arrCinema} = useSelector(state => state.CinemaSystemReducer)

    // const renderListFilms = () => {
    //
    //     return arrFilms.map((film, index) => {
    //         return  <Film key={index} />
    //     })
    // }

    console.log('props', arrFilms)

    useEffect(() => {
        dispatch(getListFilmsAction());
        dispatch(CinemaSystemActions())
    }, [])

    return (
        <div className='container mx-auto my-0 px-11 mb-32'>
            <HomeCarousel />
            {/*<div className='container'>*/}
            <section className="text-gray-600 body-font mx-20">
                <div className="container px-5 py-24 mx-auto">
                    <MultipleRowSlick arrFilms={arrFilms}/>
                    {/*<div className="flex flex-wrap -m-4">*/}
                    {/*    {renderListFilms()}*/}
                    {/*</div>*/}
                </div>
            </section>

            <div className='mx-20 px-5'>
                <HomeMenu arrCinema={arrCinema}/>
            </div>
        </div>
    );
}

export default Home;