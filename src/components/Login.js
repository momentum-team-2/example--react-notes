import React from 'react'
import PropTypes from 'prop-types'

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
    const { username, password } = this.state
    this.props.login(username, password)
      .then(
        this.props.setAuthCredentials({
          username: username,
          password: password
        })
      )
      .catch(err => {
        console.log(err)
        this.setState({
          error: 'There is no user with that username and password.'
        })
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
        </p>
        <p>
          <input
            id='username'
            type='text'
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
          />
        </p>
        <p>
          <label htmlFor='password'>Password</label>
        </p>
        <p>
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

Login.propTypes = {
  setAuthCredentials: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
}
