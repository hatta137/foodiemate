import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider, RequireAuth} from "react-auth-kit";

import App from './App';
import Hallo from './components/Hallo'
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import RecipeForm from "./components/RecipeForm";


import './styles/index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Feed from "./components/Feed";
import Recipes from "./components/Recipes";
import ShowProfile from "./components/ShowProfile";
import EditUserProfile from "./components/EditUserProfile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider authType={'cookie'}
                    authName={'_auth'}
                    cookieDomain={window.location.hostname}
                    cookieSecure={false}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navbar />}>
                  <Route path=""                element={<Home />} />
                  <Route path="contact"         element={<Contact />} />
                  <Route path="hallo"           element={<Hallo />} />
                  <Route path="login"           element={<App />} />
                  <Route path="feed"            element={ <RequireAuth loginPath={'/login'}><Feed /></RequireAuth>} />
                  <Route path="recipes"         element={ <RequireAuth loginPath={'/login'}><Recipes /></RequireAuth>} />
                  <Route path="newRecipe"       element={ <RequireAuth loginPath={'/login'}><RecipeForm /></RequireAuth>} />
                  <Route path="/profile"        element={ <RequireAuth loginPath={'/login'}><ShowProfile /></RequireAuth>} />
                  <Route path="editUserProfile" element={ <RequireAuth loginPath={'/login'}><EditUserProfile /></RequireAuth>} />
                  <Route path="*"               element={<PageNotFound />} />
              </Route>
          </Routes>
          <Footer></Footer>
      </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
