import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCarouselAction} from "../../../../store/actions/CarouselAction";

function DaisyCarousel(props) {
    const {arrCarousel} = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [])


    const renderBanner = () => {
        return arrCarousel.map((banner, index) => {
            return <div className="carousel-item">
                <img src={banner.hinhAnh}
                height={900} width={1700}
                />
            </div>
        })

    }
    return (
        <div className="carousel w-full">
            {renderBanner()}
        </div>
    );
}

export default DaisyCarousel;