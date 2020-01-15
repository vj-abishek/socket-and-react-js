import React, { useRef, useEffect, useState } from 'react'
import io from 'socket.io-client'
// import Test from './test'

//declare  global variables and make connection
const ENDPOINT = 'https://abigo-server.herokuapp.com'
let socket = io(ENDPOINT)
const colors = ['#051937', '#A8EB12', '#845EC2']

export default function Main() {
  const textarea = useRef(null)
  const messageME = useRef(null)

  //state managment
  // const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  //listen to socket
  useEffect(() => {
    //listen to websocket events
    socket.on('message', messaged => {
      setMessages([...messages, messaged])
      // console.log(message)
    })
    scrollTO()
  }, [messages])

  //handle functions

  const handleChangeTextarea = e => {
    // console.log(e.target.value)
    // message.msg = e.target.value
    // textarea.current.style.height = 'auto'
    // textarea.current.style.height = textarea.current.scrollHeight + 'px'
  }

  const handleSubmit = e => {
    // console.log('form submit: ', textarea.current.value)
    // setMessage({ msg: textarea.current.value })

    // console.log('testing message data: ', message)
    socket.emit('message', {
      msg: textarea.current.value,
      color: colors[Math.floor(Math.random() * 3)]
    })
    textarea.current.value = ''
  }
  const handleKey = e => {
    if (e.which === 13) {
      handleSubmit()
    }
  }

  const scrollTO = () => {
    console.log(messageME)
    if (messageME.current !== null)
      messageME.current.scrollIntoView({ behavier: 'smooth' })
  }
  return (
    <div className='container'>
      <div className='Placeholder-div'>
        {messages &&
          messages.map((singleMesage, index) => {
            return (
              <div
                className='ContainerOfMessage'
                ref={messageME}
                style={{ backgroundColor: `${singleMesage.color}` }}
                key={index}
              >
                {singleMesage.msg}
              </div>
            )
          })}
      </div>
      <div className='text-area'>
        <textarea
          ref={textarea}
          onChange={handleChangeTextarea}
          onSubmit={handleSubmit}
          className='Messsage'
          placeholder='Message...'
          onKeyDown={handleKey}
          autoFocus
        ></textarea>

        <button className='send-btn' onClick={handleSubmit}>
          Send
        </button>
        {/* <Test /> */}
      </div>
    </div>
  )
}
