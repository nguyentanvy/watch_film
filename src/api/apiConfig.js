const apiConfig ={
    baseUrl: 'https://api.themoviedb.org/3/',//baseUrl: địa chỉ cơ sở của API TMDb.
    apiKey: '1ceddadfaf48d32c3310345afb9313e8',//apiKey: mã API được sử dụng để xác thực và truy cập các tài nguyên từ TMDb.
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,//originalImage: phương thức arrow function nhận đầu vào là imgPath (đường dẫn ảnh) và trả về địa chỉ URL của ảnh gốc với kích thước đầy đủ (original).
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`//w500Image: phương thức arrow function tương tự như originalImage, nhưng trả về đường dẫn URL của ảnh có kích thước w500 (500px chiều rộng).
}
export default apiConfig;