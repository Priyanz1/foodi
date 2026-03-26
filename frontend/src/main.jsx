import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserDataProvider } from "./Context/UserDataContext.jsx";
import { FoodPartnerProvider } from "./Context/FoodPartnerContext.jsx"; 
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserDataProvider>
    <FoodPartnerProvider>
      <App />
    </FoodPartnerProvider>
  </UserDataProvider>
  </BrowserRouter>
)
