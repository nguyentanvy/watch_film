import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CustomRoutes from '../../config/customRoutes';
import './layout.scss'

class Layout extends React.Component{
    render(){
        const top = () => {
            window.scrollTo(0, 0);
        }
        return(
            <>
            <Header {...this.props}/>
            {/* {console.log("props:",this.props)} */}
            <CustomRoutes/>
            <Footer/>
            <button onClick={top} className="topbtn">Top</button>
            </>
        )
    }
}
export default Layout;