import React from 'react';

function News(props) {
    return <>
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col">
                <div className="h-1 bg-gray-200 rounded overflow-hidden">
                    <div className="w-24 h-full bg-indigo-500" />
                </div>
                <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                    <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                        Tin tức
                    </h1>
                    {/*<p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">*/}
                    {/*    Street art subway tile salvia four dollar toast bitters selfies quinoa*/}
                    {/*    yuccie synth meditation iPhone intelligentsia prism tofu. Viral*/}
                    {/*    gochujang bitters dreamcatcher.*/}
                    {/*</p>*/}
                </div>
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
                    <div className="rounded-lg h-64 overflow-hidden">
                        <img
                            alt="content"
                            className="object-cover object-center h-full w-full"
                            src="https://m.media-amazon.com/images/M/MV5BMTM4NTA3NDI1Nl5BMl5BanBnXkFtZTcwMzk0MDU5NA@@._V1_.jpg"
                        />
                    </div>
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                        28 chuyện lạ đã xảy ra khi thực hiện cuốn phim “Cuộc khổ nạn Chúa Giêsu” vào năm 2004.
                    </h2>
                    <p className="text-base leading-relaxed mt-2">
                        Gibson đã chiến thắng được chứng bệnh chán đời muốn tự tử qua “cuộc khổ nạn”. Gibson đã tiết lộ với tờ báo Úc Châu Herald Sun: “Dạo trước tôi có cảm giác lạc lối trong bóng tối, tôi hoàn toàn thất vọng. Tôi chẳng thiết sống nữa, nhưng cũng chưa sẵn sàng để ra đi..
                    </p>
                    <a href='https://conggiao.vn/nhieu-phep-la-thuat-lai-tu-dien-vien-dong-vai-chua-giesu-phim-cuoc-kho-nan-chua-giesu/' className="text-indigo-500 inline-flex items-center mt-3">
                        Tìm hiểu thêm
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
                    <div className="rounded-lg h-64 overflow-hidden">
                        <img
                            alt="content"
                            className="object-cover object-center h-full w-full"
                            src="https://lh3.googleusercontent.com/proxy/7QPkBWllzUNv-eYxQ2_dpl6U5sJSJAIBU7bKadTsX1MKYH2QZPwy4AhfQbYNp4AZrJ3xLiR8jOPRSFubP_2s2reaN40I1GTR-0tT9iw6ubbkOPDrcOydcdN1GMmf21Wa6I2hLADxsMrESMqYc8yhVpEJjMFo3GANPcJ2u3aDUeFUjvBWsRZ_rkfJ-1YQIiU"
                        />
                    </div>
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                        Bộ phim “Thiên Chúa không chết” (God’s Not Dead) đoạt Giải thưởng GMA Dove Awards
                    </h2>
                    <p className="text-base leading-relaxed mt-2">
                        Bộ phim Thiên Chúa không chết kể về một chàng sinh viên mới đến với ngưỡng cửa đại học tên Josh Wheaton (do diễn viên Shane Harper thủ vai). Chàng trai trẻ này đăng ký vào một lớp triết học và gặp phải một ông thầy khét tiếng độc đoán – giáo sư ...
                    </p>
                    <a href='http://phimconggiao.net/articles/bo-phim-“thien-chua-khong-chet”-god’s-not-dead-doat-giai-thuong-gma-dove-awards_28.html' className="text-indigo-500 inline-flex items-center mt-3">

                        Tìm hiểu thêm
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
                    <div className="rounded-lg h-64 overflow-hidden">
                        <img
                            alt="content"
                            className="object-cover object-center h-full w-full"
                            src="https://flixwatch.co/wp-content/uploads/70295734.jpg"
                        />
                    </div>
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                        Khi Hollywood làm phim về Kitô giáo
                    </h2>
                    <p className="text-base leading-relaxed mt-2">
                        Heaven is for Real (Thiên đường là có thật) là một bộ phim về câu chuyện của một cậu bé quả quyết rằng mình đã đặt chân đến Thiên đàng cùng Chúa Giêsu trong một lần cận kề cái chết của đạo diễn Randall Wallace đang được trình chiếu tại nhiều rạp trên thế giới với những con số doanh thu phòng vé ấn tượng.
                    </p>
                    <a className="text-indigo-500 inline-flex items-center mt-3" href='http://phimconggiao.net/articles/khi-hollywood-lam-phim-ve-thien-chua-giao_18.html'>
                        Tìm hiểu thêm
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

    </>
}

export default News;