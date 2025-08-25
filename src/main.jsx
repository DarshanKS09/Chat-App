import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ChatAppContext from './components/context/ChatAppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatAppContext>
       <App />
    </ChatAppContext>
   
  </StrictMode>,
)
