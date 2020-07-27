import React from 'react'
import axios from 'axios'

export default class Notes extends React.Component {
  constructor () {
    super()
    this.state = {
      notes: [],
      newNoteText: ''
    }

    this.handleCreateNewNote = this.handleCreateNewNote.bind(this)
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

  handleCreateNewNote (e) {
    e.preventDefault()
    axios.post('https://notes-api.glitch.me/api/notes', {
      text: this.state.newNoteText
    }, {
      auth: this.props.auth
    })
      .then(res => {
        this.setState({
          notes: this.state.notes.concat([res.data]),
          newNoteText: ''
        })
      })
  }

  render () {
    const { notes, newNoteText } = this.state
    return (
      <div>
        <h1>Your notes</h1>
        {notes.map(note =>
          <div key={note._id}>{note.text}</div>
        )}
        <form onSubmit={this.handleCreateNewNote}>
          <textarea
            placeholder='Add a new note'
            value={newNoteText}
            onChange={e => this.setState({ newNoteText: e.target.value })}
          />
          <p><button type='submit'>Create new note</button></p>
        </form>
      </div>
    )
  }
}
