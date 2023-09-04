import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Chatapp } from './Chatapp'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0()
  const [app, setApp] = useState(false)

  const handleChatapp = () => {
    if ((window.location.href = 'http://localhost:3000/chatapp')) {
      setApp(true)
    }
    window.location.href = 'http://localhost:3000/chatapp'
  }

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="../images/chat-app-icon.jpg"
          alt="applicationimage"
          style={{ width: '40%' }}
        />
        <h2>Welcome to Tittle-Tattle !</h2>
        {isAuthenticated && <h3>Hey! {user.name}&#x1F917;.</h3>}
        {isAuthenticated ? (
          <div>
            <button id="auth-btn" onClick={(e) => logout()}>
              Logout
            </button>
            <BrowserRouter>
              <Routes>
                <Route path="/chatapp" element={<Chatapp />} />
              </Routes>
            </BrowserRouter>
            {!app ? (
              <button onClick={handleChatapp} className="app-btn">
                Let's Chat
              </button>
            ) : (
              <button onClick={handleChatapp} className="app-btn">
                New Room...
              </button>
            )}
          </div>
        ) : (
          <div>
            <button id="auth-btn" onClick={(e) => loginWithRedirect()}>
              Please Authorize
            </button>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
