import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog test', () => {
  const blog = {
    title: 'Two+two',
    url: 'https://google.es',
    likes: 10,
    author: 'Boris',
  }

  test('render blog and title, but not url or likes', () => {
    const component = render(<Blog blog={blog} />)

    expect(
      component.container.querySelector('.titleAndAuthor')
    ).toHaveTextContent(blog.title)
    expect(
      component.container.querySelector('.titleAndAuthor')
    ).toHaveTextContent(blog.author)
  })

  test('Url and likes show when click onbutton ', async () => {
    const compoennt = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)
    expect(compoennt.container).toHaveTextContent(blog.likes)
    expect(compoennt.container).toHaveTextContent(blog.url)
  })

  test('If button like clicked twices', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} updateBlog={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const buttonLike = screen.getByText('add likes')

    await user.click(buttonLike)
    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect()
    await user.click(buttonLike)
    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
