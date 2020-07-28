import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class EditNote extends React.Component {
  constructor () {
    super()
    this.state = {
      newNoteText: '',
      note: {},
      loaded: false,
      noteEdited: false
    }

    this.handleUpdateNote = this.handleUpdateNote.bind(this)
  }

  componentDidMount () {
    const { noteId } = this.props
    axios.get('https://notes-api.glitch.me/api/notes/', {
      auth: this.props.auth
    })
      .then(res => {
        const note = res.data.notes.find(note => note._id === noteId)
        this.setState({
          loaded: true,
          note: note,
          newNoteText: note.text
        })
      })
  }

  handleUpdateNote (e) {
    e.preventDefault()
    const { noteId } = this.props
    const { newNoteText, note } = this.state
    axios.put('https://notes-api.glitch.me/api/notes/' + noteId, {
      text: newNoteText,
      title: note.title,
      tags: note.tags
    }, {
      auth: this.props.auth
    })
      .then(res => {
        this.setState({
          noteEdited: true
        })
      })
  }

  render () {
    const { newNoteText, loaded, noteEdited } = this.state

    if (noteEdited) {
      return <Redirect to='/' />
    }

    return (
      <div className='Edit'>
        {loaded
          ? (
            <form onSubmit={this.handleUpdateNote}>
              <textarea
                placeholder='Add a new note'
                value={newNoteText}
                onChange={e => this.setState({ newNoteText: e.target.value })}
              />
              <p><button type='submit'>Update note</button></p>
            </form>
          )
          : <div>Loading...</div>}
      </div>
    )
  }
}
