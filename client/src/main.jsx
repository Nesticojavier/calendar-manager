import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import { Provider } from 'react-redux'
//import { CookiesProvider } from 'react-cookie'
import App from './App.jsx'
// import Home from './Components/dashboard.jsx'
import { UserContextProvider } from "./Context/UserContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <UserContextProvider>
      <App />
    </UserContextProvider>

  </React.StrictMode>,
)
