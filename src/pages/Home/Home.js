import React, {useEffect} from 'react';
import HomeMenu from "./HomeMenu/HomeMenu";
import {useDispatch, useSelector} from "react-redux";
import MultipleRowSlick from "../../components/RSslick/MultipleRowSlick";
import Film from "../../components/Film/Film";
import {FilmsAction} from "../../store/actions/FilmsAction";

function Home(props) {

    const dispatch = useDispatch();
    const {arrFilms} = useSelector(state => state.FilmsReducer)

    // const renderListFilms = () => {
    //
    //     return arrFilms.map((film, index) => {
    //         return  <Film key={index} />
    //     })
    // }

    console.log('props', arrFilms)
    
    useEffect(() => {
      dispatch(FilmsAction())
    },[])

    return (
        <div className='container mx-auto my-0'>
        {/*<div className='container'>*/}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <MultipleRowSlick arrFilms={arrFilms}/>
                    {/*<div className="flex flex-wrap -m-4">*/}
                    {/*    {renderListFilms()}*/}
                    {/*</div>*/}
                </div>
            </section>

            <div className='mx-20'>
                <HomeMenu/>
            </div>
        </div>
    );
}

export default Home;