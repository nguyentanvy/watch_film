import React, { useEffect, useState } from 'react'

import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import { useParams } from 'react-router-dom'

const CastList = props => {
    const {category} = useParams();
    const [casts, setCasts] = useState([]);
    useEffect(() => {
       const getCredits = async () => {
        const res = await tmdbApi.credits(category, props.id);
        // console.log("res:",res)
        setCasts(res.cast.slice(0, 5));
       }
       getCredits()
        
    }, [category, props.id]);
    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <p className="casts__item_name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList