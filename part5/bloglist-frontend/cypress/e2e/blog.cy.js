describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'jorge',
      name: 'admin',
      password: '1234',
    }
    cy.clearLocalStorage()
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#form-login-username').type('jorge')
      cy.get('#form-login-password').type('1234')
      cy.get('#form-login-button').click()
      cy.contains('blogs')
    })
    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#form-login-username').type('jorge')
      cy.get('#form-login-password').type('failpassword')
      cy.get('#form-login-button').click()
      cy.get('.notification').should('contain', 'wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#form-login-username').type('failname')
      cy.get('#form-login-password').type('1234')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('Login').click()
      cy.get('#form-login-username').type('jorge')
      cy.get('#form-login-password').type('1234')
      cy.get('#form-login-button').click()
    })
    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#blog-title').type('Title test')
      cy.get('#blog-author').type('Author test')
      cy.get('#blog-url').type('https://www.google.es')
      cy.get('#blog-create').click()
      cy.contains('Title test')
      cy.contains('Author test')
      cy.get('.notification').should(
        'contain',
        'a new blog Title test by Author test'
      )
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
    })
    it('User can like a blog', function () {
      cy.contains('New Blog').click()
      cy.get('#blog-title').type('Title test')
      cy.get('#blog-author').type('Author test')
      cy.get('#blog-url').type('https://www.google.es')
      cy.get('#blog-create').click()
      cy.contains('view').click()
      cy.contains('likes: 0')
      cy.contains('add likes').click()
      cy.contains('likes: 1')
    })

    it('User can deletede her blog', function () {
      cy.contains('New Blog').click()
      cy.get('#blog-title').type('Title test')
      cy.get('#blog-author').type('Author test')
      cy.get('#blog-url').type('https://www.google.es')
      cy.get('#blog-create').click()
      cy.contains('view').click()
      cy.contains('Delete').click()
      cy.wait(500)
      cy.contains('Blog Title test deleted successfully')
      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        expect(response.body).to.have.length(0)
      })
    })
  })
  describe('Blog order by number of likes', function () {
    beforeEach(function () {
      cy.login({ username: 'jorge', password: '1234' })
      cy.createBlog({
        title: 'The title with less likes',
        author: 'George',
        url: 'example.com',
        likes: '1',
      })
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'Mark',
        url: 'example1.com',
        likes: '5',
      })
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'Joe',
        url: 'example2.com',
        likes: '10',
      })
    })
    it('Blogs are order well', function () {
      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog')
        .eq(1)
        .should('contain', 'The title with the second most likes')
      cy.get('.blog').eq(2).should('contain', 'The title with less likes')
    })
  })
})
