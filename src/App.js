import React from 'react'
import './App.css'
import Login from './components/Login'
import Notes from './components/Notes'

class App extends React.Component {
  constructor () {
    super()

    let auth = window.sessionStorage.getItem('auth')
    if (auth) {
      auth = JSON.parse(auth)
    }

    this.state = {
      auth: auth
    }

    this.setAuthCredentials = this.setAuthCredentials.bind(this)
  }

  setAuthCredentials (creds) {
    this.setState({ auth: creds })
    if (creds) {
      window.sessionStorage.setItem('auth', JSON.stringify(creds))
    } else {
      window.sessionStorage.removeItem('auth')
    }
  }

  render () {
    const { auth } = this.state
    return (
      <div className='App'>
        {auth
          ? (
            <div>
              <p>Hello, {auth.username}</p>
              <p><button onClick={() => this.setAuthCredentials(null)}>Log out</button></p>
              <Notes auth={auth} setAuthCredentials={this.setAuthCredentials} />
            </div>
          )
          : <Login setAuthCredentials={this.setAuthCredentials} />}

      </div>
    )
  }
}

export default App
