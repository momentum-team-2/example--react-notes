import React from 'react'
import './App.css'
import Login from './components/Login'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import EditNote from './components/EditNote'
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom'

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
      <Router>
        <div className='App'>
          {auth
            ? (
              <div>
                <p>Hello, {auth.username}</p>
                <p><button onClick={() => this.setAuthCredentials(null)}>Log out</button></p>
                <nav>
                  <ul>
                    <li><Link to='/'>All notes</Link></li>
                    <li><Link to='/new-note'>Create new note</Link></li>
                  </ul>
                </nav>
                <Switch>
                  <Route
                    path='/edit/:noteId' render={({ match }) => (
                      <EditNote auth={auth} noteId={match.params.noteId} />
                    )}
                  />
                  <Route path='/new-note'>
                    <NewNote auth={auth} />
                  </Route>
                  <Route path='/'>
                    <Notes auth={auth} setAuthCredentials={this.setAuthCredentials} />
                  </Route>
                </Switch>
              </div>
            )
            : <Login setAuthCredentials={this.setAuthCredentials} />}

        </div>
      </Router>
    )
  }
}

export default App
