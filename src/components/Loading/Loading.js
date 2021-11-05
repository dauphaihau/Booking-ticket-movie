import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {Loading} from '@nextui-org/react';

function LoadingGif() {

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
                    <Loading color='#000000' size="xlarge"/>
                </div>
                : ''
        }
    </Fragment>
}

export default LoadingGif;