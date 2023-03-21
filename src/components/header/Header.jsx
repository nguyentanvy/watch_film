import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import logo from '../../assets/tmovie.png';

const headerNav = [
  {
    display:'Home',
    path:'/'
  },
  {
    display:'Movies',
    path:'/movie'
  },
  {
    display:'TV series',
    path:'/tv'
  },
]

const Header = () => {
  const {pathname} = useLocation();//biến pathname sẽ lưu trữ giá trị đường dẫn hiện tại của trang web, ví dụ như "/movie" "/" hoặc "/tv"
  const headerRef = useRef(null);

  const active = headerNav.findIndex(e =>e.path === pathname);//tìm chỉ số (index) của phần tử đầu tiên trong mảng headerNav sao cho giá trị thuộc tính "path" của phần tử đó bằng với biến pathname

  useEffect(() => {
    const shrinkHeader = () => {//kiểm tra vị trí cuộn hiện tại của trang và thay đổi lớp CSS của phần tử header dựa trên vị trí cuộn đó.
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        headerRef.current.classList.add('shrink');//hêm một lớp CSS mới có tên là 'shrink' để thu nhỏ kích thước của header
      }else{
        headerRef.current.classList.remove('shrink')//nếu vị trí cuộn nhỏ hơn hoặc bằng 100px, phần tử header sẽ bị xóa lớp CSS 'shrink'
      }
    }
    window.addEventListener('scroll', shrinkHeader);//đăng ký một sự kiện lắng nghe (event listener) cho sự kiện cuộn trang (scroll)
    //hàm shrinkHeader() sẽ được gọi mỗi khi người dùng cuộn trang và phần tử header sẽ được thay đổi kích thước tương ứng
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
   <div ref={headerRef} className="header">
    <div className="header__wrap container">
      <div className="logo">
        <img src={logo} alt="" />
        <Link to="/">NTVMovie</Link>
      </div>
      <ul className="header__nav">
        {
          headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}>
                {e.display}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
   </div>
  )
}

export default Header
