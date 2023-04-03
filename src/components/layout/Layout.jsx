import React, { useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CustomRoutes from '../../config/customRoutes';
import './layout.scss'
import { useRef } from 'react';

// class Layout extends React.Component{
//     render(){
//         const top = () => {
//             window.scrollTo(0, 0);
//         }
//         return(
//             <>
//             <Header {...this.props}/>
//             {/* {console.log("props:",this.props)} */}
//             <CustomRoutes/>
//             <Footer/>
//             <button onClick={top} className="topbtn">Top</button>
//             </>
//         )
//     }
// }

function Layout(props) {
    const top = () => {
        window.scrollTo(0, 0);
    }
    const buttonRef = useRef(null);
    useEffect(() => {
        const shrinkButton = () => {//kiểm tra vị trí cuộn hiện tại của trang và thay đổi lớp CSS của phần tử header dựa trên vị trí cuộn đó.
          if(document.body.scrollTop > 600 || document.documentElement.scrollTop > 600){
            buttonRef.current.classList.add('showbtn');//hêm một lớp CSS mới có tên là 'shrink' để thu nhỏ kích thước của header
          }else{
            buttonRef.current.classList.remove('showbtn')//nếu vị trí cuộn nhỏ hơn hoặc bằng 100px, phần tử header sẽ bị xóa lớp CSS 'shrink'
          }
        }
        window.addEventListener('scroll', shrinkButton);//đăng ký một sự kiện lắng nghe (event listener) cho sự kiện cuộn trang (scroll)
        //hàm shrinkButton() sẽ được gọi mỗi khi người dùng cuộn trang và phần tử header sẽ được thay đổi kích thước tương ứng
        return () => {
          window.removeEventListener('scroll', shrinkButton);
        };
      }, []);
    return(
        <>
        <Header {...props}/>
        {/* {console.log("props:",props)} */}
        <CustomRoutes/>
        <Footer/>
        <button ref={buttonRef} onClick={top} className="topbtn showbtn"><i class='bx bxs-chevron-up'></i></button>
        </>
    )
}
export default Layout;