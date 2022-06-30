import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { useField } from '../hooks/'

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
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...userPassword}/>
      </div>
      <button type="submit" id="form-login-button">
        login
      </button>
    </form>
  )
}

export default LoginForm
