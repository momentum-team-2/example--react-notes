import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'

export default function EditNote ({ auth }) {
  const [note, setNote] = useState({})
  const [newText, setNewText] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [noteEdited, setNoteEdited] = useState(false)
  const { noteId } = useParams()

  useEffect(() => {
    axios.get('https://notes-api.glitch.me/api/notes/', {
      auth: auth
    })
      .then(res => {
        const note = res.data.notes.find(note => note._id === noteId)
        setLoaded(true)
        setNote(note)
        setNewText(note.text)
      })
  }, [noteId, auth])

  const handleUpdateNote = function (e) {
    e.preventDefault()
    axios.put('https://notes-api.glitch.me/api/notes/' + noteId, {
      text: newText,
      title: note.title,
      tags: note.tags
    }, {
      auth: auth
    })
      .then(res => {
        setNoteEdited(true)
      })
  }

  if (noteEdited) {
    return <Redirect to='/' />
  }

  return (
    <div className='Edit'>
      {loaded
        ? (
          <form onSubmit={handleUpdateNote}>
            <textarea
              placeholder='Add a new note'
              value={newText}
              onChange={e => setNewText(e.target.value)}
            />
            <p><button type='submit'>Update note</button></p>
          </form>
        )
        : <div>Loading...</div>}
    </div>
  )
}
