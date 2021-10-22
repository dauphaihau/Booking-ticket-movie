import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import loadingGif from '../../assets/img/dynamic point.gif'

function Loading(props) {

    const {isLoading} = useSelector(state => state.LoadingReducer)

    return <Fragment>
        {
            isLoading ?
                <div style={{
                    backgroundColor: 'white',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 11
                }}>
                    <img src={loadingGif} height={50} alt={loadingGif}/>
                </div>
                : ''
        }
    </Fragment>
}

export default Loading;