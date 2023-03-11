import React from "react";
import PropTypes from 'prop-types';

import './button.scss'

const Button = (props) => {
  return (
    <Button className={`btn ${props.className}`}
    onclick={props.onClick ? () => props.onClick() : null}> 
        {props.children}
    </Button>
  )
}

export const OutlineButton = (props) => {
    return (
        <Button
            className={`btn-outline ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}

        </Button>
    );
}

Button.propTypes = {
    onclick: PropTypes.func// định nghĩa kiểu dữ liệu cho thuộc tính onClick của Button là một hàm (function) bằng cách sử dụng kiểu dữ liệu PropTypes.func
    //Nếu thuộc tính này không được truyền vào hoặc kiểu dữ liệu không đúng, một cảnh báo (warning) sẽ xuất hiện trong console của trình duyệt khi chạy ứng dụng.
}
export default Button
