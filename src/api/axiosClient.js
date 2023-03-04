import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient = axios.create({//Đối tượng client được tạo ra thông qua hàm axios.create() và được gán cho biến axiosClient
    baseUrl: apiConfig.baseUrl,// đường dẫn cơ sở cho các request.
    headers:{//đại diện cho các header mà client gửi trong request
        'Content-Type': 'application/json'
    },
    paramsSerializer : params => queryString.stringify({...params, api_key: apiConfig.apiKey}),//hàm này sẽ sử dụng thư viện query-string để chuyển đổi các tham số thành một chuỗi query string, đồng thời thêm tham số api_key với giá trị được lấy từ thuộc tính apiKey của đối tượng apiConfig
})
axiosClient.interceptors.request.use(async (config) => config);// thay đổi hoặc xử lý các yêu cầu trước khi gửi chúng đến server
axiosClient.interceptors.request.use((response) => {
    if(response && response.data){
        return response.data;
    }
    return response;//Trong hàm callback này, nếu response.data có giá trị thì nó sẽ được trả về như là kết quả của yêu cầu, ngược lại, đối tượng response gốc sẽ được trả về. 
}, (error) => {
    throw error;//lỗi được ném ra bằng từ khóa throw để thông báo cho phía gọi hàm biết rằng đã có lỗi xảy ra.
});
export default axiosClient;