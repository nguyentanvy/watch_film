import React, { useEffect, useState } from 'react';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';
import Button from '../../components/button/Button';

const Detail = () => {
  // window.scrollTo(0, 0);
  const currentUrl = window.location.href;
  window.FB.XFBML.parse();
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  const { category, id } = useParams();
  let navigate = useNavigate();
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
                {/* {
                      <Button className="watch-btn" onClick={() => navigate("/"+category+"/watch/"+item.id)}>
                                      Watch now
                      </Button>
                  } */}
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

              <div className="module-btn">    
                {
                    <Button className="watch-btn" onClick={() => navigate("/"+category+"/watch/"+item.id)}>
                                    Watch now
                    </Button>
                }
                <a className="btn facebook-share-button" rel="noreferrer" href={facebookUrl} target="_blank">
                  Share on Facebook
                </a>
              </div>

              <div className="release-date">
                <h3 style={{display: 'inline-block'}}>Release:</h3>
                <p style={{display: 'inline-block'}}>
                {/* {item.release_date
                  ? item.release_date.toString()
                  .substring(
                    0,
                    item.release_date.indexOf("-")
                  )
                  :
                  item.first_air_date.toString()
                  .substring(
                    0,
                    item.first_air_date.indexOf("-")
                  )
                  } */}

                  {item.release_date
                    ? item.release_date.toString()
                      .substring(0, item.release_date.indexOf("-"))
                    : item.first_air_date
                      ? item.first_air_date.toString()
                        .substring(0, item.first_air_date.indexOf("-"))
                      : ""
                  }
                  {/* Nếu nó tồn tại, toString() sẽ chuyển đổi giá trị thành chuỗi và substring() sẽ trả về một phần của chuỗi (từ vị trí bắt đầu đến vị trí kết thúc được chỉ định). Trong trường hợp này, substring() được sử dụng để lấy chuỗi các chữ số đầu tiên của ngày phát hành của phim. */}
                </p>
                
              </div>

              <div className="runtime">
                <h3 style={{display: 'inline-block'}}>Runtime:</h3>
                <p style={{display: 'inline-block'}}>

                  {item.runtime
                    ? item.runtime + 'min'
                    : item.episode_run_time.length>0
                      ? item.episode_run_time[0] + 'min'
                      : "Updating"
                  }
                  {/* Nếu nó tồn tại, toString() sẽ chuyển đổi giá trị thành chuỗi và substring() sẽ trả về một phần của chuỗi (từ vị trí bắt đầu đến vị trí kết thúc được chỉ định). Trong trường hợp này, substring() được sử dụng để lấy chuỗi các chữ số đầu tiên của ngày phát hành của phim. */}
                </p>
                
              </div>

              <div className="rating">
                <h3 style={{display: 'inline-block'}}>Rating:</h3>
                <p title= {item.vote_count && item.vote_average ?
              item.vote_average.toFixed(1) + " base on " +item.vote_count +" user rating"  :
              ""
              } 
                
                
                style={{display: 'inline-block'}}>
                  
                  {item.vote_average
                    ? item.vote_average.toFixed(1) + '/10'
                    : "No voted"
                  }
                    {/* <p className="star" style={{display: 'inline-block'}}>
                      {item.vote_average > 0 &&
                      Array.from({ length: Math.floor(item.vote_average) }, (_, index) => (
                      <i key={index} className='bx bxs-star'></i>
                        ))
                      }
                    </p> */}
                   
                   {item.vote_average > 0 && (
                    <p className='star' style={{ display: 'inline-block' }}>
                      {Array.from({ length: 10 }, (_, index) => {
                        const isYellow = index < item.vote_average.toFixed();
                        return (
                          <i
                            key={index}
                            className='bx bxs-star'
                            style={{ color: isYellow ? '#f5c518' : 'inherit' }}
                          ></i>
                        );
                      })}
                    </p>
                  )}

                </p>
                
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
            <div className="fb-comments" data-href={currentUrl} 
              data-numposts="5" data-width=""></div>
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