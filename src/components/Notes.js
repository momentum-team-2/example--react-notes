import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Notes extends React.Component {
  constructor () {
    super()
    this.state = {
      notes: []
    }
  }

  componentDidMount () {
    axios.get('https://notes-api.glitch.me/api/notes', {
      auth: this.props.auth
    })
      .then(res => {
        this.setState({
          notes: res.data.notes.sort((a, b) => {
            if (a.updated > b.updated) {
              return 1
            } else if (a.updated === b.updated) {
              return 0
            } else {
              return -1
            }
          })
        })
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          this.props.setAuthCredentials(null)
        }
      })
  }

  render () {
    const { notes } = this.state
    return (
      <div>
        <h1>Your notes</h1>
        {notes.map(note =>
          <div key={note._id}>
            {note.text} {' '}
            <Link to={`/edit/${note._id}`}>Edit</Link>
          </div>
        )}
      </div>
    )
  }
}
