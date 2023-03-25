import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore, { Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

// import { Link } from 'react-router-dom';

// import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
// import apiConfig from '../../api/apiConfig';
import MovieCard from '../movie-card/MovieCard';


const MovieList = props => {
    SwiperCore.use([Navigation]);
    const swiperRef = useRef(null);
    const [items, setItems] = useState([]);
    
    
    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, []);
    return (
        <div className='movie-list'>
            <Swiper
             modules={[Navigation]}
            //  navigation={{
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            //   }}
              navigation
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
             grabCursor={true}
             spaceBetween={10}
             slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            {/* <img src={apiConfig.w500Image(item.poster_path)} alt="" /> */}
                            <MovieCard item={item} category={props.category}
                            
                                onmouseenter={() => {
                                    swiperRef.current.navigation.nextEl.classList.add('active');
                                    swiperRef.current.navigation.prevEl.classList.add('active');
                                }}
                                onmouseleave={() => {
                                    swiperRef.current.navigation.nextEl.classList.remove('active');
                                    swiperRef.current.navigation.prevEl.classList.remove('active');
                                }}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList;
