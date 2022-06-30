import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    addLike(state, action) {
      const { id } = action.payload
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    removeBlog(state, action) {
      return state.filter(({ id }) => id !== action.payload)
    },
    addComment(state,action){
      const { comments, id } = action.payload
      const blogToChange = state.find((n) => n.id === id)
      const updateBlog = {
        ...blogToChange,
        comments,
      }
      return state.map((blog) => (blog.id !== id ? blog : updateBlog))
    }
  },
})

export const { setBlogs, appendBlogs, addLike, removeBlog, addComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try{const newBlog = await blogService.create(content)
      dispatch(appendBlogs(newBlog))
      dispatch(setNotification( `a new blog ${content.title} by ${content.author}`, 'success', 10))
    }catch(error){
      dispatch(setNotification( `cant add a new blog called ${content.title}`, 'warning', 10))
    }
  }
}

export const deleteBlog = (blogId, blogTitle) => {
  return async (dispatch) => {
    try{
      await blogService.deleteBlog(blogId)
      dispatch(removeBlog(blogId))
      dispatch(
        setNotification(
          `Blogv2  '${blogTitle}' deleted successfully`,
          'success',
          10
        )
      )
    }catch(error){
      dispatch(setNotification(`cant delete ${blogTitle} blog`, 'warning', 10))
    }
  }

}

export const voteBlogs = (blog) => {
  return async (dispatch) => {
    const updateBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(addLike(updateBlog))
    dispatch(setNotification(`a new like to ${blog.title} added`, 'success', 10))
  }
}

export const commentBlog = (blog,comment) => {
  return async (dispatch) => {
    const newComment = await blogService.commentBlog(blog.id, {
      comment,
    })
    dispatch(addComment(newComment))
    dispatch(setNotification(`a new comment to ${blog.title} added`, 'success', 10))
  }
}

export default blogSlice.reducer
