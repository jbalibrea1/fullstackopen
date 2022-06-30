import React from 'react'

import { UlStyle, LiStyle } from './ListStyle'
const UsersList = ({ blogUser }) => {
  if (!blogUser) {
    return null
  }

  return (
    <div>
      <h1>{blogUser.username}</h1>
      <p>added blogs</p>
      <UlStyle>
        {blogUser.blogs.map((blog) => (
          <LiStyle key={blog.id}>{blog.title}</LiStyle>
        ))}
      </UlStyle>
    </div>
  )
}

export default UsersList
