import React, { useCallback, useEffect, useRef, useState } from 'react';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/input';

const MovieGrid = props => {
    const [items, setItems] = useState([]);
    const [genreSelect, setGenreSelect] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    let navigate = useNavigate();
    const {keyword} = useParams();
    // console.log("keyword:",keyword);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if(keyword === undefined) {
                const params = {};
               
                if(genreSelect === ''){
                    switch(props.category) {
                        case category.movie:
                            response = await tmdbApi.getMoviesList(movieType.upcoming, {params})//lấy ra danh sách phim sắp ra mắt
                            console.log("response:movie",response);
                            break;
                        default:
                            response = await tmdbApi.getTvList(tvType.on_the_air, {params})
                            console.log("response:tv",response);
    
                    }
                }
                else{
                    const params ={
                        with_genres : genreSelect
                    }
                    switch(props.category) {
                        case category.movie:
                            response = await tmdbApi.discover(category.movie, {params})//lấy ra danh sách phim sắp ra mắt
                            console.log("response:movie",response);
                            break;
                        default:
                            response = await tmdbApi.discover(category.tv, {params})
                            console.log("response:tv",response);
    
                    }
                }
            } else{
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params});
            }
            setItems(response.results);
            // console.log("responsersuilt:", response.results);
            setTotalPage(response.total_pages);
        }
        getList();
    }, [genreSelect,props.category, keyword]);

    useEffect(()=>{
        const getGenres = async () => {
            let response = null;
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getGenres(category.movie);
                    // console.log("responseGenre:", response);
                    break;
                default:
                    response = await tmdbApi.getGenres(category.tv);
            }
          setGenres(response.genres);  
        }

        getGenres();
    },[props.category])

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

    const handleSelect = (e) =>{
        navigate(`/${category[props.category]}`)
        // console.log("target:", e.target.value);
        setGenreSelect(e.target.value);
    }

    return (
        <>
            <div className="section mb-3"  style={{ position: 'relative' }}>
                <MovieSearch items={items} category={props.category} keyword={keyword}/>
                <div>
                    <select name="genres" id="genres" onChange={handleSelect}>
                        <option style={{ display: "none" }} value={" "}>Genres</option>
                        {
                            genres.map((genre,i) => (
                                    <option key={i} name={genre.name} value={genre.id}>{genre.name}</option>
                            ))
                        }
                    </select>
                </div>

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
                        <OutlineButton className="small" onClick={loadMore}><i className='bx bxs-chevron-down' ></i> Load more</OutlineButton>
                    </div>
                ):null
            }
        </>
    )
}

const MovieSearch = props => {
    let navigate = useNavigate();
    const headerRef = useRef(null);
    const [items, setItems] = useState([]);
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    useEffect(() => {
    const getList = async() =>{
    let response = null;
    const params = {
        query: keyword
    }
    response = await tmdbApi.search(props.category, {params});

    setItems(response.results);
    }
    getList();
    },[props.category, keyword]);


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
            <div className="movie-search" onFocus={() => { headerRef.current.classList.add('Showdropdown')}}
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

                    { keyword && items.filter(item => {
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