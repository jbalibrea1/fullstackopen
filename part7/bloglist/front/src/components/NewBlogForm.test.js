import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlogForm'

describe('New Blog Form test', () => {
  test('new blog create well', async () => {
    const mockHandler = jest.fn()
    const component = render(<NewBlog createBlog={mockHandler} />)
    const create = screen.getByText('create')

    const title = component.container.querySelector('#blog-title')
    const author = component.container.querySelector('#blog-author')
    const url = component.container.querySelector('#blog-url')
    await userEvent.type(title, 'testing a form...')
    await userEvent.type(author, 'Boris')
    await userEvent.type(url, 'https://www.google.es')
    await userEvent.click(create)

    expect(mockHandler.mock.calls[0][0].title).toBe('testing a form...')
    expect(mockHandler.mock.calls[0][0].author).toBe('Boris')
    expect(mockHandler.mock.calls[0][0].url).toBe('https://www.google.es')
  })
})
