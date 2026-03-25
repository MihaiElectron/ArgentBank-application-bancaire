import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Ajout : active le système de routing
import { Provider } from "react-redux";
import { store } from './store/store';
import './styles/reset.css'
import App from './App.jsx'
import { loginUser, fetchUserProfile } from "./features/userSlice";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter permet à React Router de gérer les URL */}
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

window.store = store;
window.loginUser = loginUser;
window.fetchUserProfile = fetchUserProfile;
