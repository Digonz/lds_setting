import React, {Suspense} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
//import Footer from './components/Footer';
//import Navbar from './components/Navbar';
//import './SCSS/myStyle.scss';
import './style/main.css';
//import Error from './views/Error';
import Finance from './views/Finance';
import injectContext from './store/appContext';

function App() {
  return (
    <>
    <Suspense fallback={<div>Cargando..</div>}>
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Finance />} />
          <Route path="/finanzas" element={<Finance />} />
        </Routes>
      </BrowserRouter>
      </div>
    </Suspense>
    </>
  );
}

export default (injectContext(App))
