import React, {useEffect} from 'react';
import HomeMenu from "./HomeMenu/HomeMenu";
import {useDispatch, useSelector} from "react-redux";
import MultipleRowSlick from "../../components/RSslick/MultipleRowSlick";
import {getListFilmsAction} from "../../store/actions/FilmsAction";
import {CinemaSystemActions} from "../../store/actions/CinemaSystemActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import Simple from "antd/lib/empty/simple";
import SimpleSlider from "../../templates/HomeTemplate/Layout/HomeCarousel/SimpleSlider";
import DaisyCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/DaisyCarousel";

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

    console.log('arrfilm', arrFilms)

    useEffect(() => {
        dispatch(getListFilmsAction());
        dispatch(CinemaSystemActions())
    }, [])

    return <div>
        {/*<HomeCarousel/>*/}
        {/*<SimpleSlider/>*/}
        <DaisyCarousel/>

        <section className='container mx-auto my-0 px-11 mb-32'>
            {/*<div className='container'>*/}
            <div className="text-gray-600 body-font mx-20">
                <div className="px-5 py-24 mx-auto">
                    <MultipleRowSlick arrFilms={arrFilms}/>
                    {/*<div className="flex flex-wrap -m-4">*/}
                    {/*    {renderListFilms()}*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className='mx-20 px-5'>
                <HomeMenu arrCinema={arrCinema}/>
            </div>
        </section>
    </div>
}

export default Home;