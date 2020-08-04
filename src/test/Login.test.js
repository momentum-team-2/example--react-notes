/* globals test, expect */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Login from '../components/Login'

const loginAlwaysFail = (username, password) => {
  return new Promise((resolve, reject) => {
    reject(new Error('invalid credentials'))
  })
}

test('username label appears', () => {
  const { getByText } = render(<Login setAuthCredentials={() => {}} login={() => {}} />)
  const usernameLabel = getByText('Username')
  expect(usernameLabel).toBeInTheDocument()

  const passwordLabel = getByText('Password')
  expect(passwordLabel).toBeInTheDocument()
})

test('error message shows when username and password are invalid', async () => {
  const { getByLabelText, getByRole, findByText } = render(<Login login={loginAlwaysFail} setAuthCredentials={() => {}} />)
  const usernameField = getByLabelText('Username')
  fireEvent.change(usernameField, { target: { value: 'bocephus1' } })

  const passwordField = getByLabelText('Password')
  fireEvent.change(passwordField, { target: { value: 'jambalaya' } })

  const button = getByRole('button')
  fireEvent.click(button)

  const errorMsg = await findByText('There is no user with that username and password.')
  expect(errorMsg).toBeInTheDocument()
})
