import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { useField } from '../hooks/'
import { Form, Input } from './FormStyle'
import { Button } from './Button'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const userPassword = useField('password')

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(userLogin(username.value, userPassword.value))
    username.input.clear()
    userPassword.input.clear()
  }

  return (
    <Form onSubmit={handleLogin}>
      <div>
        <Input {...username} placeholder="username" />
      </div>
      <div>
        <Input {...userPassword} placeholder="password" />
      </div>
      <div>
        <Button type="submit" id="form-login-button">
          login
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
