import React, { useState, useEffect, useRef } from 'react';

import SwiperCore, { Autoplay, Pagination} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/pagination';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';
import { useNavigate } from 'react-router-dom';

const HeroSlide = () => {

    SwiperCore.use([Autoplay, Pagination]);//sử dụng module Autoplay trong Swiper bằng cách truyền nó vào trong một mảng, sau đó đưa mảng này vào phương thức use. Sau khi kích hoạt plugin này, ta có thể sử dụng các tùy chọn được cung cấp bởi plugin này để cấu hình chức năng autoplay cho Swiper
    // SwiperCore.use([Pagination]);
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}// params trả về danh sách phim ở trang đầu tiên
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});// call API bằng cách sử dụng phương thức "getMoviesList" được định trong mmodule tmdbAPI
                setMovieItems(response.results.slice(1, 10));//lấy ra phần tử từ vị trí thứ hai đến vị trí thứ tư (tức chỉ lấy 3 phim) và cập nhật state "movieItems".
                console.log(response);
            } catch(error){
                console.log('error:',error.message);
            }
        }
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                //đối tượng "Swiper" được sử dụng để tạo ra một thanh trượt cho danh sách các phim
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 3000}}
                
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                // <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                                // <img src={apiConfig.originalImage(item.backdrop_path)} alt="" />
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)//Hiển thị video trailer của các phim
            }
           
        </div>
    );
}

const HeroSlideItem = props => {
    let navigate = useNavigate();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);// tạo url cho ảnh nền rồi gán vào biến background
    
    const setModalActive = async() => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbApi.getVideos(category.movie, item.id);// danh sách các video liên quan đến một bộ phim cụ thể
        if(videos.results.length > 0){
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);//sử dụng phương thức querySelector của phần tử modal để tìm phần tử <iframe> có class là modal__content. Sau đó, đoạn code sử dụng phương thức setAttribute để thiết lập thuộc tính src của phần tử <iframe> với giá trị của biến videSrc.
        } else{
            modal.querySelector('.modal__content').innerHTML = 'No trailer'
        }
        modal.classList.toggle('active');// thêm lớp 'active' vào modal nếu nó chưa có, hoặc xóa nó nếu modal đã có lớp 'active'.
    }

    return(
        <div 
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate("/movie/" +item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt=""/>
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;
    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute('src','');
    return(
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px"
                title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;