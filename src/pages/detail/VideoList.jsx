import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi'
import ReactPlayer from 'react-player';


const VideoList = props => {
    const {category} = useParams();
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const getVideos = async () => {
        const res = await tmdbApi.getVideos(category, props.id);
        // console.log("res:",res)
        setVideos(res.results.slice(0, 5));
        }
        getVideos()
        
    }, [category, props.id]);

  return (
    <>
        {
            videos.map((item, i) => (
                <Video key={i} item={item}/>
            ))
        }
    </>
  )
}

const Video = props => {
    const item = props.item;
    // const iframeRef = useRef(null);
    // const [playerHeight, setPlayerHeight] = useState(0);
    // const handlePlayerReady = (event) => {
    //     const aspectRatio = 9/16; // 16:9
    //     const playerWidth = event.target.offsetWidth;
    //     console.log(playerWidth);
    //     const playerHeight = playerWidth * aspectRatio + 'px';
    //     setPlayerHeight(playerHeight);
    //   }

    // useEffect(() => {
    //     const height = iframeRef.current.offsetWidth * 9/16 + 'px';
    //     iframeRef.current.setAttribute('height', height); //chiều cao sẽ được tính dựa trên chiều rộng theo tỉ lệ 9:16.
    // }, []);

    return(
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            {/* <iframe 
                src={`https:/www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            
            ></iframe> */}
            <div className='player-wrapper'>
                
            <ReactPlayer className="react-player"
                url={`https:/www.youtube.com/embed/${item.key}`}
                // ref={iframeRef}
                width="100%"
                height="100%"
                controls={true}
                config={{
                    youtube: {
                    playerVars: { modestbranding: 1, showinfo: 0 },
                    },
                }}
                // onReady={handlePlayerReady}
                // style={{ height: playerHeight }}
                // sử dụng useState để lưu giá trị chiều cao của player. Khi player sẵn sàng, chúng ta tính toán chiều cao và set lại giá trị của playerHeight. Sau đó, chúng ta truyền giá trị đó vào style của component để thiết lập chiều cao.
                
            />
        </div>
            </div>
    )
}

export default VideoList