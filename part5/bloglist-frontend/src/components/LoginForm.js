import React from 'react'
import PropTypes from 'prop-types'

const Login = ({
  handleLogin,
  handleUserName,
  handlePassword,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUserName}
          id="form-login-username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
          id="form-login-password"
        />
      </div>
      <button type="submit" id="form-login-button">
        login
      </button>
    </form>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUserName: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default Login
