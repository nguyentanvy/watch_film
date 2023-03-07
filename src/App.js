// import { useRoutes } from 'react-router-dom';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import CustomRoutes from './config/customRoutes';

// import Header from './components/header/Header'
// import Footer from './components/footer/Footer'
import 'swiper/swiper.min.css';
import './assets/boxicons-2.1.4/css/boxicons.min.css'
import './App.scss';
import Layout from './components/layout/Layout';
function App() {
  // const routing = useRoutes([
  //   {
  //     path:'',
  //     element: (
  //       <>
  //       <Header/>
  //       <Routes/>
  //       <Footer/>
  //       </>
  //     )
  //   }
  // ])
    return (
      <Router>
        <Routes>
         <Route
         path="*"
        element={
            <>
            <Layout/>
                {/* <Header/>
                <CustomRoutes/>
                <Footer/> */}
            </>
    }
        />
         </Routes>
      </Router>    
    );
}
export default App;
