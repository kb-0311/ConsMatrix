import './App.css';
import Header from './component/layout/header/header.jsx'
import WebFont from 'webfontloader'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import React, { useEffect } from 'react';
import Footer from './component/layout/footer/footer.jsx'
import Home from './components/Home/Home.jsx'

function App() {

  useEffect(() => {
    WebFont.load({
      google : {
        families : [ 'Didact Gothic' ,'Gothic A1'  , 'Chilanka']
      }
    })
  
    
  })
  

  return (
    <Router>
      <Header/>
      
        <Route exact path="/" component = { Home } />
      
      <Footer/>
    </Router>
  );
}

export default App;
