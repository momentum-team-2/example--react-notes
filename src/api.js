import axios from 'axios'

export function login (username, password) {
  axios.get('https://notes-api.glitch.me/api/notes', {
    auth: {
      username: username,
      password: password
    }
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        throw new Error('invalid credentials')
      }
    })
}
