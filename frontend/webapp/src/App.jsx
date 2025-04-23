import { useState } from 'react'
import './App.css'

import LandingPage from './pages/landing_page.jsx';
import Login from './pages/login.jsx';
import Page404 from './pages/404.jsx';
import UserProfile from './pages/user_profile.jsx';

function App() {
  const path = window.location.pathname
  if (path === "/") {
    return <LandingPage/>
  }
  else if ((path.startsWith("/login"))) {
    return <Login/>
  }
  else if ((path.startsWith("/UserProfile"))) {
    return <UserProfile/>
  }
  else {
    return <Page404/>
  }
}

export default App
