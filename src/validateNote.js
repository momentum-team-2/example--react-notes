const validateNote = (note) => {
  const errors = {}
  if (!note.text) {
    errors.text = ['cannot be blank']
  }
  if (note.text && note.text.length > 1000) {
    errors.text = ['must be 1000 or less chars']
  }
  return [Object.keys(errors).length === 0, errors]
}

export default validateNote
