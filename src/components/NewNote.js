import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewNote extends React.Component {
  constructor () {
    super()
    this.state = {
      newNoteText: '',
      noteCreated: false
    }

    this.handleCreateNewNote = this.handleCreateNewNote.bind(this)
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
          newNoteText: '',
          noteCreated: true
        })
      })
  }

  render () {
    const { newNoteText } = this.state

    if (this.state.noteCreated) {
      return <Redirect to='/' />
    }

    return (
      <div className='NewNote'>
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
