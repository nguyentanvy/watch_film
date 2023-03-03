const apiConfig ={
    baseUrl: 'http://api.themoviedb.org/3/',
    apiKey: '1ceddadfaf48d32c3310345afb9313e8',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}
export default apiConfig;