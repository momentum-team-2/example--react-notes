import React, { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import EditNote from './components/EditNoteWithHooks'
import OldEditNote from './components/EditNote'
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom'

export default function App () {
  let authFromStorage = window.sessionStorage.getItem('auth')
  if (authFromStorage) {
    authFromStorage = JSON.parse(authFromStorage)
  }

  const [auth, setAuth] = useState(authFromStorage)

  const setAuthCredentials = function (creds) {
    setAuth(creds)
    if (creds) {
      window.sessionStorage.setItem('auth', JSON.stringify(creds))
    } else {
      window.sessionStorage.removeItem('auth')
    }
  }

  return (
    <Router>
      <div className='App'>
        {auth
          ? (
            <div>
              <p>Hello, {auth.username}</p>
              <p><button onClick={() => setAuthCredentials(null)}>Log out</button></p>
              <nav>
                <ul>
                  <li><Link to='/'>All notes</Link></li>
                  <li><Link to='/new-note'>Create new note</Link></li>
                </ul>
              </nav>
              <Switch>
                <Route path='/edit/:noteId'>
                  <EditNote auth={auth} />
                </Route>
                <Route path='/new-note'>
                  <NewNote auth={auth} />
                </Route>
                <Route path='/'>
                  <Notes auth={auth} setAuthCredentials={setAuthCredentials} />
                </Route>
              </Switch>
            </div>
          )
          : <Login setAuthCredentials={setAuthCredentials} />}

      </div>
    </Router>
  )
}
