import React from 'react'
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import CatalogPopular from '../pages/popular/Catalog_popular'
import Watch from '../pages/Watch';
// import NoMatch  from '../components/NoMatch';


const CustomRoutes = () => {
  return (
    //  <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          
          <Route path="/:category" element={<Catalog/>}/>
          <Route path="/:category/cate/:type" element={<CatalogPopular/>}/>
          <Route path="/:category/search/:keyword" element={<Catalog />} />
          <Route path="/:category/:id" element={<Detail/>} />
          <Route path="/:category/watch/:id" element={<Watch/>} />
          {/* <Route path="*" element={<NoMatch/>}/> */}
          
        </Routes>
     
    //  </Router>
   
  )
}

export default CustomRoutes;

// const Routes = () => {
//   return [
//     {path:'/',
//     element:<Home/>,
//     },
//     {path:'/:category',
//     element:<Catalog/>,
//     },
//     {path:'/:category/search/:keyword"',
//     element:<Catalog/>,
//     },
//     {path:'/:category/:id',
//     element:<Detail/>,
//     },
//     {path:'*',
//     element:<NoMatch/>,
//     },
//   ]
// }

// export default Routes;
