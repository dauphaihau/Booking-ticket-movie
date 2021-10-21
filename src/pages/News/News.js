import React, {useState} from 'react';

function News(props) {

    const data = [
        {title: '28 chuyện lạ đã xảy ra khi thực hiện cuốn phim “Cuộc khổ nạn Chúa Giêsu” vào năm 2004.', content: 'Gibson đã chiến thắng được chứng bệnh chán đời muốn tự tử qua “cuộc khổ nạn”. Gibson đã tiết lộ với tờ báo Úc Châu Herald Sun: “Dạo trước tôi có cảm giác lạc lối trong bóng tối, tôi hoàn toàn thất vọng. Tôi chẳng thiết sống nữa, nhưng cũng chưa sẵn sàng để ra đi..', img: 'https://m.media-amazon.com/images/M/MV5BMTM4NTA3NDI1Nl5BMl5BanBnXkFtZTcwMzk0MDU5NA@@._V1_.jpg', link:'https://conggiao.vn/nhieu-phep-la-thuat-lai-tu-dien-vien-dong-vai-chua-giesu-phim-cuoc-kho-nan-chua-giesu/'},
        {title: 'Bộ phim “Thiên Chúa không chết” (God’s Not Dead) đoạt Giải thưởng GMA Dove Awards', content: 'Bộ phim Thiên Chúa không chết kể về một chàng sinh viên mới đến với ngưỡng cửa đại học tên\n                            Josh Wheaton (do diễn viên Shane Harper thủ vai). Chàng trai trẻ này đăng ký vào một lớp triết học và gặp phải một ông thầy khét tiếng độc đoán – giáo sư ...', img: 'https://wapnaija.net/wp-content/uploads/2020/12/SKyHHK.jpg', link: 'http://phimconggiao.net/articles/bo-phim-“thien-chua-khong-chet”-god’s-not-dead-doat-giai-thuong-gma-dove-awards_28.html'},
        {title: 'Khi Hollywood làm phim về Kitô giáo', content: 'Heaven is for Real (Thiên đường là có thật) là một bộ phim về câu chuyện của một cậu bé quả quyết rằng mình đã đặt chân đến Thiên đàng cùng Chúa Giêsu trong một lần cận kề cái chết của\n                            đạo diễn Randall Wallace đang được trình chiếu tại nhiều rạp trên thế giới với những con số doanh thu phòng vé ấn tượng.', img: 'https://flixwatch.co/wp-content/uploads/70295734.jpg', link: 'http://phimconggiao.net/articles/khi-hollywood-lam-phim-ve-thien-chua-giao_18.html'},
    ]

    return <>
        <section className="text-gray-600 body-font">
            <div className="container px-5 pt-24 mx-auto">
                <div className="flex flex-col">
                    <div className="h-1 bg-gray-200 rounded overflow-hidden">
                        <div className="w-24 h-full bg-blue-500"/>
                    </div>
                    <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                        <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                            Tin tức
                        </h1>
                    </div>
                </div>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                    {data.map((data, index) => {
                        return <div key={index} className="lg:p-4 lg:w-1/3  mb-12 md:mb-8 ">
                            <div className="rounded-lg h-64 overflow-hidden">
                                <img
                                    alt="https://m.media-amazon.com/images/M/MV5BMTM4NTA3NDI1Nl5BMl5BanBnXkFtZTcwMzk0MDU5NA@@._V1_.jpg"
                                    className="object-cover object-center h-full w-full"
                                    src={data.img}
                                />
                            </div>
                            <h2 className="text-xl font-medium title-font text-gray-900 hover:text-blue-500 cursor-pointer mt-5"
                                onClick={() => {window.location.href=`${data.link}`}}
                            >{data.title}</h2>
                            <p className="text-base leading-relaxed mt-2 ">{data.content.length > 100 ? <span>{data.content.slice(0,100)}..</span> : <span>{data.content}</span> }</p>
                        </div>
                    })}
                </div>
            </div>
        </section>

    </>
}

export default News;