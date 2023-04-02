import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'// đại diện cho các phim đang được phát sóng trên các kênh truyền hình.
}


const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);//Lấy danh sách phim từ TMDb, được phân loại theo loại (type) được truyền vào.
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);//Lấy danh sách chương trình truyền hình từ TMDb, được phân loại theo loại (type) được truyền vào.
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});//Lấy thông tin về video của một phim hoặc chương trình truyền hình được chỉ định.
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);// Tìm kiếm các phim hoặc chương trình truyền hình trên TMDb theo từ khóa được truyền vào.
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);//Lấy thông tin chi tiết về một phim hoặc chương trình truyền hình được chỉ định.
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});//Lấy danh sách những người tham gia vào việc sản xuất phim hoặc chương trình truyền hình được chỉ định.
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});//Lấy danh sách các phim hoặc chương trình truyền hình tương tự với phim hoặc chương trình truyền hình được chỉ định.
    },
    getGenres: (cate) => {
        const url = 'genre/' + category[cate] + '/list';
        return axiosClient.get(url, {params: {}})// lấy danh sách thể loại tv, movie
    },
    discover: (cate, params) => {
        const url = 'discover/' + category[cate];
        return axiosClient.get(url, params)// select theo id thể loại
    },
}
export default tmdbApi;