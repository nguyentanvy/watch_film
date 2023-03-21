import React from 'react'
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
// import { NoMatch } from '../components/NoMatch';


const CustomRoutes = () => {
  return (
    //  <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/:category" element={<Catalog/>}/>
          <Route path="/:category/search/:keyword" element={<Catalog />} />
          <Route path="/:category/:id" element={<Detail/>} />
          {/* <Route path="/movie" element={<Catalog/>}/>
          <Route path="/movie/:id" element={<Detail/>}/>
          <Route path="/tv" element={<Catalog/>}/> */}
          
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
