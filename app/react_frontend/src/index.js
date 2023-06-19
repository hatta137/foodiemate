import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hallo from './components/Hallo'
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navbar />}>
                  <Route path="" element={<Home />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="hallo" element={<Hallo />} />
                  <Route path="login" element={<App />} />

                  <Route path="*" element={<PageNotFound />} />
              </Route>
          </Routes>
          <Footer></Footer>
      </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
