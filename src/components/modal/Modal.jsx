import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './modal.scss';
// Cửa sổ thông báo
const Modal = props => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return (
        <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    );
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}
//định nghĩa các kiểu của các thuộc tính của component. Nếu một trong hai thuộc tính này không đúng kiểu, React sẽ hiển thị một cảnh báo trong console.

export const ModalContent = props => {

    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');//xóa lớp 'active' khỏi phần tử cha của phần tử DOM được tham chiếu bởi contentRef
        if (props.onClose) props.onClose();//Nếu props onClose được truyền vào và có giá trị, hàm sẽ gọi hàm đó để thực hiện các xử lý khác khi modal bị đóng
    }

    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose: PropTypes.func
}

export default Modal;