import React from 'react';

import { useParams } from 'react-router-dom';

// import PageHeader from '../../components/page-header/PageHeader';
import { category as cate } from '../../api/tmdbApi';
import { movieType as typ } from '../../api/tmdbApi';
import MovieGridPopular from './MovieGrid_popular';
import PageHeaderPopular from './PageHeader_popular';

const CatalogPopular = () => {
    window.scrollTo(0, 0);

    const { category } = useParams();
    const {type} = useParams();
    console.log(category);
    console.log(type)

    return (
        <>
            <PageHeaderPopular>
                {(category === cate.movie && type === typ.popular)
                 ? 'Trending Movies' : 
                 (category === cate.movie && type === typ.top_rated ? 'Top Rated Movies'
                 : (category === cate.tv && type === typ.popular ? 
                    'Trending TV' : 'Top Rated TV'))
                 }
                 {/* {category === cate.movie ? 'Movies' : 'TV Series'} */}

            </PageHeaderPopular>
            <div className="container">
                <div className="section mb-3">
                <MovieGridPopular type={type} category={category}/>
                </div>
            </div>
            
        </>
    );
}

export default CatalogPopular;