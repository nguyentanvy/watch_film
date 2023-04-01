import React from 'react';

import { useParams } from 'react-router-dom';

import PageHeader from '../../components/page-header/PageHeader';

import { category as cate } from '../../api/tmdbApi';
import MovieGridPopular from './MovieGrid_popular';

const CatalogPopular = () => {
    window.scrollTo(0, 0);

    const { category } = useParams();
    const {type} = useParams();
    // console.log(category);

    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                <MovieGridPopular type={type} category={category}/>
                </div>
            </div>
            
        </>
    );
}

export default CatalogPopular;