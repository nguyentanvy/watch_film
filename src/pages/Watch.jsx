import React, { useEffect, useState } from 'react';

import tmdbApi from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';
import { useParams } from 'react-router-dom';
import '../pages/detail/detail.scss';
import MovieList from '../components/movie-list/MovieList';
// import ReactPlayer from 'react-player';

const Watch = () => {
  // window.scrollTo(0, 0);
  const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
             console.log("watch",response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);
    console.log("item",item)

  return (
   <>
    {
      item && (
        <>
          <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage
          (item.backdrop_path || item.poster_path)})`}}></div>
          <div className="container">
            <div className="section mb-3">
                <div className="video">
                    
                    <div className="player-wrapper">
                        <iframe
                            allowFullScreen
                            title="video"
                            width="100%"
                            height="100%"
                            controls={true}
                            className="react-player"
                            src={`https://www.2embed.to/embed/tmdb/movie?id=${item.id}`}
                        ></iframe>
                    </div>
                    <div className="video__title">
                        <h2>{item.title || item.name}</h2>
                    </div>
                    <p className="overview">{item.overview}</p>
                
                </div>
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

export default Watch;