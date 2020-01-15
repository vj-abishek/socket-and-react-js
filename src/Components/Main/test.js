import React, { Component } from 'react'
import io from 'socket.io-client'

let socket
export default class test extends Component {
  state = {
    msg: ''
  }
  componentDidMount() {
    socket = io('localhost:9000')
  }
  componentWillUpdate() {
    socket.on('message', msg => {
      this.setState({ msg })
      console.log(msg)
    })
  }
  componentWillUnmount() {
    socket.emit('disconnect')
    socket.off()
  }
  handleSubmit = e => {
    console.log(e.target.value)
    socket.emit('message', { msg: this.state.msg }, this.setState({ msg: '' }))
  }
  handleChange = e => {
    console.log(e.target.value)
    this.state.msg = e.target.value
  }

  render() {
    return (
      <div>
        This is the test Component {this.state.msg}
        <textarea
          className='Messsage'
          placeholder='Message...'
          onChange={this.handleChange}
          autoFocus
        ></textarea>
        <button className='send-btn' onClick={this.handleSubmit}>
          Send
        </button>
      </div>
    )
  }
}
