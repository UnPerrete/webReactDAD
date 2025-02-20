import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { BrowserRouter } from 'react-router'
import { LoginProvider } from './context/LoginProvider.jsx';

createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </LoginProvider>,
)
