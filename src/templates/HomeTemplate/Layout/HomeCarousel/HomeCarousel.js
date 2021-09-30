import React from 'react';

import { Carousel } from 'antd';

const contentStyle = {
    height: '550px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};

function HomeCarousel(props) {
    return (
        <Carousel effect="fade" className='z-0'>
            <div >
                <img style={contentStyle} src='https://picsum.photos/1000' alt="..." className='w-full'/>
            </div>
            <div >
                <img style={contentStyle} src='https://picsum.photos/1000' alt="..." className='w-full'/>
            </div>
            <div >
                <img style={contentStyle} src='https://picsum.photos/1000' alt="..." className='w-full'/>
            </div>
            <div >
                <img style={contentStyle} src='https://picsum.photos/1000' alt="..." className='w-full'/>
            </div>
        </Carousel>
    );
}

export default HomeCarousel;