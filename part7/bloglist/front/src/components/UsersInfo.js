import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const UsersInfo = () => {
  const usersState = useSelector((state) => state.users)
  return (
    <div>
      {usersState.map((user) => {
        return(
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link> has {user.blogs.length} blogs
          </div>
        )
      })}
    </div>
  )
}

export default UsersInfo