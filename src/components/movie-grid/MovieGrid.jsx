import React, { useCallback, useEffect, useRef, useState } from 'react';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/input';

const MovieGrid = props => {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const {keyword} = useParams();
    console.log("keyword:",keyword);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if(keyword === undefined) {
                const params = {};
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params})//lấy ra danh sách phim sắp ra mắt
                        console.log("response:movie",response);
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {params})
                        console.log("response:tv",response);

                }
            } else{
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params});
            }
            setItems(response.results);
            console.log("responsersuilt:", response.results);
            setTotalPage(response.total_pages);
        }
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {params});
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, {params});//load thêm trang dựa theo keyword
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch items={items} category={props.category} keyword={keyword}/>
                
                {/* <div className="dropdown">
                    {  keyword && items.filter(item => {
                        const searchTerm = keyword.toLowerCase();
                        const title = item.title.toLowerCase();
                        return searchTerm && title.startsWith(searchTerm);
                    })
                    .map((item) => (
                    <div className="dropdown-row">{item.title}</div>
                        ))
                    }
                </div> */}

            </div>
            <div className="movie-grid">
                {
                    items.map((item,i) => 
                    <MovieCard category={props.category} item={item} key={i}/> )
                }
            </div>
            {
                page < totalPage ? (//Nếu page nhỏ hơn totalPage, một nút "Load more" sẽ được hiển thị
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}><i class='bx bxs-chevron-down' ></i> Load more</OutlineButton>
                    </div>
                ):null
            }
        </>
    )
}

const MovieSearch = props => {
    let navigate = useNavigate();
    const headerRef = useRef(null);
    // const [items, setItems] = useState([]);
    // useEffect(() => {
    // const getList = async() =>{
    //     const params = {};
    // let response = [];
    // let page = 1;
    // let totalPages = 1;

    // switch(props.category) {
    // case category.movie:
    //     while (page <= totalPages) {
    //     const result = await tmdbApi.getMoviesList(movieType.upcoming, {params, page});
    //     response = [...response, ...result.results];
    //     totalPages = result.total_pages;
    //     console.log("totalpages", totalPages);
    //     console.log(page);
    //     page++;
    //     }
    //     console.log("responseAll:movie",response);
    //     console.log(
    //         response.map(itemm => (
    //             itemm.title
    //         ))
    //     )
        
    //     break;
    // default:
    //     while (page <= totalPages) {
    //     const result = await tmdbApi.getTvList(tvType.popular, {params, page});
    //     response = [...response, ...result.results];
    //     totalPages = result.total_pages;
    //     console.log("totalpages", totalPages);
    //     console.log(page);
    //     page++;
    //     }
    //     console.log("responseAll:tv",response);
    //     break;
    // }

    // setItems(response);
    // }
    // getList();
    // },[props.category]);

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    // console.log("keyword1: ", keyword);
    const onSearch = (searchTerm) =>{
        if(searchTerm.trim().length > 0){
            navigate(`/${category[props.category]}/search/${searchTerm}`)
        }
        setKeyword(searchTerm);
        // console.log("search ", searchTerm);
    }
    const goToSearch = useCallback(
        () => {
            if(keyword.trim().length > 0){
                navigate(`/${category[props.category]}/search/${keyword}`)
            }
        },[keyword, props.category, navigate]
    )

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if(e.keyCode === 13){
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent)
        return () => {
            document.removeEventListener('keyup', enterEvent)
        };
    }, [keyword, goToSearch]);

    return(
        <>
            <div className="movie-search" onFocus={() => {headerRef.current.classList.add('Showdropdown')}}
            onBlur={() => {
                // Sử dụng setTimeout để xử lý việc click vào phần tử con trước khi nó bị ẩn
                setTimeout(() => {
                    headerRef.current.classList.remove('Showdropdown');
                }, 100);
            }}>

                <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                />
                <Button className="small" onClick={goToSearch}><i className='bx bx-search'></i> Search</Button>

            </div>
            <div ref={headerRef} className="dropdown" 
            >
            
                    {/* { keyword && props.items.filter(item => {
                        const searchTerm = keyword.toLowerCase();
                        // const title = item.title.toLowerCase();
                        const title = item.title ? item.title.toLowerCase() : '';
                        return searchTerm && title.startsWith(searchTerm) && title !== searchTerm;
                    }).slice(0,10)
                    .map((item) => (
                    <div onClick={()=> onSearch(item.title)} className="dropdown-row"
                    key={item.title}
                    >{item.title}</div>
                        ))
                    } */}

                    { keyword && props.items.filter(item => {
                        const searchTerm = keyword.toLowerCase();
                        // const title = item.title.toLowerCase();
                        const title = item.title ? item.title.toLowerCase() : item.name.toLowerCase();
                        return searchTerm && title.startsWith(searchTerm) && title !== searchTerm;
                    }).slice(0,10)
                    .map((item) => (

                        item.title ?
                        <div onClick={()=> onSearch(item.title)} className="dropdown-row"
                            key={item.title}
                        > <i className='bx bx-search'></i> {item.title}
                        </div>
                            : 
                        <div onClick={()=> onSearch(item.name)} className="dropdown-row"
                            key={item.name}
                        ><i className='bx bx-search'></i> {item.name}</div>
                            )
                        )
                    }
            </div>
        </>
    )
}
export default MovieGrid