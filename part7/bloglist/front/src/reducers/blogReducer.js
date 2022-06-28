import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
      const id = action.payload.id
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    delBlog(state, action) {
      console.log('actionm', action)
      return state.filter(({ id }) => id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlogs, addLike, delBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlogs(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(delBlog(id))
  }
}

export const voteBlogs = (blog) => {
  return async (dispatch) => {
    const updateBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(addLike(updateBlog))
  }
}

export default blogSlice.reducer
