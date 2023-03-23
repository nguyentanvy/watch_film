import React from 'react'
import './page-header.scss';
import bg from '../../assets/footer-bg.jpg';

const PageHeader = props => {
  return (
    <div className="page-header" style={{backgroundImage: `url(${bg})`}}>
      <h2>{props.children === 'Movies' ? (
        <>
        <i className="bx bxs-movie cus-icon"></i>
        Movies
        </>
        ) : (
        <>
        <i className='bx bxs-tv cus-icon'></i>TV Series
        </>
      )}
      </h2>
      {/* <h2>{props.children}</h2> */}
    </div>
  )
}

export default PageHeader
