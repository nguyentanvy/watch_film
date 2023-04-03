import React from 'react'
import '../../components/page-header/page-header.scss';
import bg from '../../assets/footer-bg.jpg';


const PageHeaderPopular = props => {
    // console.log("chil:",props.children)
  return (
    <div className="page-header" style={{backgroundImage: `url(${bg})`}}>
      <h2>{props.children === 'Trending Movies' ? (
        <>
        <i className="bx bxs-movie cus-icon"></i>
        Trending Movies
        </>
        ) : (
          props.children === 'Top Rated Movies' ? (<>
            <i className='bx bxs-movie cus-icon'></i>Top Rated Movies
            </>) : ( props.children === 'Trending TV' ? 
            (
              <>
              <i className="bx bxs-tv cus-icon"></i>
              Trending TV
              </>
              ) : <>
              <i className="bx bxs-tv cus-icon"></i>
              Top Rated TV
              </>
            )
      )}
      </h2>
      {/* <h2>{props.children}</h2> */}
    </div>
  )
}

export default PageHeaderPopular
