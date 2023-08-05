// import React from 'react';
import Header from './components/Header';
import Coins from './components/Coins';
import Home from './components/Home';
import Exchanges from './components/Exchanges';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinsDetails from './components/CoinsDetails';
import Footer from './components/Footer';



function App() {
  return (

     <Router>
     <Header/>
      <Routes>
        <Route path = "/Coins" element ={<Coins/>}/>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/Exchanges" element ={<Exchanges/>}/>
        <Route path="/coins/:id" element={<CoinsDetails />} />
      </Routes>
      <Footer/>
     </Router>
  );
}

export default App;
