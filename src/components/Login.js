import React from 'react'
import axios from 'axios'

export default class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      error: null
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
      .catch(err => {
        if (err.response && err.response.status === 401) {
          this.setState({
            error: 'There is no user with that username and password.'
          })
        }
      })
  }

  render () {
    const { username, password, error } = this.state

    return (
      <form onSubmit={this.handleLogin}>
        {error && (
          <div style={{ color: 'red' }}>{error}</div>
        )}
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
