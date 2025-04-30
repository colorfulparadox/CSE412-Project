import { useState } from 'react'
import './App.css'

import LandingPage from './pages/landing_page.jsx';
import Login from './pages/login.jsx';
import Page404 from './pages/404.jsx';
import UserProfile from './pages/user_profile.jsx';
import Collection from './pages/collection.jsx';
import Pokedex from './pages/globalpokedex.jsx';
import StatCompare from './pages/statcompare.jsx';

function App() {
  const path = window.location.pathname
  if (path === "/") {
    return <LandingPage/>
  }
  else if ((path.startsWith("/login"))) {
    return <Login/>
  }
  else if ((path.startsWith("/userprofile"))) {
    return <UserProfile/>
  }
  else if ((path.startsWith("/statcompare"))) {
    return <StatCompare/>
  }
  else if ((path.startsWith("/mypokedex"))) {
    return <Collection/>
  }
  else if ((path.startsWith("/globalpokedex"))) {
    return <Pokedex/>
  }
  else {
    return <Page404/>
  }
}

export default App
