import React from 'react'

// userMatchId.blogs.map((blog) => <UserList key={blog.id} blogUser={blog}/>)}/>
const UsersList = ({ blogUser }) => {
  if(!blogUser){
    return null
  }

  return (
    <div>
      <h2>{blogUser.username}</h2>
      <p>added blogs</p>
      <ul>
        {blogUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UsersList