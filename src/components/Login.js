import React from 'react'
import axios from 'axios'

export default class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (event) {
    event.preventDefault()
    axios.get('https://notes-api.glitch.me/api/notes', {
      auth: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.setAuthCredentials({
            username: this.state.username,
            password: this.state.password
          })
        }
      })
  }

  render () {
    const { username, password } = this.state

    return (
      <form onSubmit={this.handleLogin}>
        <p>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
          />
        </p>
        <p>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </p>
        <p>
          <button type='submit'>Log In</button>
        </p>
      </form>
    )
  }
}
