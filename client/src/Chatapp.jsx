import React from 'react'
import Chat from './Chat'
import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'

const socket = io.connect('http://localhost:3001')

export const Chatapp = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }
  return (
    <div>
      {!showChat ? (
        <div className="joinChatContainer">
          <div id="title">TittleTattle&#x1F4AD;</div>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <input
            type="text"
            placeholder="Room's Id..."
            onChange={(event) => {
              setRoom(event.target.value)
            }}
          />
          <button onClick={joinRoom}>Start Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
}
