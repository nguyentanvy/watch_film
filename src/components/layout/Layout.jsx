import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CustomRoutes from '../../config/customRoutes';

class Layout extends React.Component{
    render(){
        return(
            <>
            <Header {...this.props}/>
            {/* {console.log("props:",this.props)} */}
            <CustomRoutes/>
            <Footer/>
            </>
        )
    }
}
export default Layout;