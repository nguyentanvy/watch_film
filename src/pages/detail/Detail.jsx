import React, { useEffect, useState } from 'react';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useParams } from 'react-router-dom';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';

const Detail = () => {
  // window.scrollTo(0, 0);
  const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

  return (
   <>
    {
      item && (
        <>
          <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage
          (item.backdrop_path || item.poster_path)})`}}></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
              {/* nếu item.poster_path không tồn tại hoặc bằng chuỗi rỗng, thì item.backdrop_path sẽ được sử dụng thay thế */}
            </div>
            <div className="movie-content__infor">
              <h1 className="title">
                {item.title || item.name}
              </h1>
              <div className="genres">
                {
                  item.genres && item.genres.slice(0, 5).map((genre, i)=> (
                    <span key={i} className="genres__item">{genre.name}</span>
                  ))
                }
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                  
                </div>
                <CastList id={item.id}/>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id}/>
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                  <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id}/>
              {/* Lấy danh sách phim hoặc chương trình cùng thể loại */}
            </div>
          </div>
        </>
      )
    }
   </>
  )
}

export default Detail;