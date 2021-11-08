import React from 'react';
import dataNews from "../../assets/data/dataNews.json";

function News() {
    return <section id='news' className="text-gray-600 body-font">
        <div className="container px-5 lg:px-0 pt-24 mx-auto">
            <div className="flex flex-col">
                <div className="h-1 bg-gray-200 rounded overflow-hidden">
                    <div className="w-24 h-full bg-blue-500"/>
                </div>
                <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                    <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                        News
                    </h1>
                </div>
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                {dataNews.map((data, index) => {
                    return <div key={index} className="lg:p-4 lg:w-1/3  mb-12 md:mb-8 ">
                        <div className="rounded-lg h-64 overflow-hidden">
                            <img
                                alt={data.img}
                                className="object-cover object-center h-full w-full"
                                src={data.img}
                            />
                        </div>
                        <h2 className="text-xl font-medium title-font text-gray-900 hover:text-blue-500 cursor-pointer mt-5
                        transition duration-500 ease-in-out"
                            onClick={() => {
                                window.location.href = `${data.link}`
                            }}
                        >{data.title}</h2>
                        <p className="text-base leading-relaxed mt-2 ">{data.content.length > 180 ?
                            <span>{data.content.slice(0, 180)}..</span> : <span>{data.content}</span>}</p>
                    </div>
                })}
            </div>
        </div>
    </section>
}

export default News;