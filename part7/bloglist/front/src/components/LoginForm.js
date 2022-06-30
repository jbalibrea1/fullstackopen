import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(userLogin(username, password))
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" name="username" id="form-login-username" />
      </div>
      <div>
        password
        <input type="password" name="password" id="form-login-password" />
      </div>
      <button type="submit" id="form-login-button">
        login
      </button>
    </form>
  )
}

export default LoginForm
