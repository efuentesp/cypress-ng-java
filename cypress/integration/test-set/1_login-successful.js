describe('Login Successful', function() {
  it('Add data on fields and get a login successful', function() {
	
	//This turn off uncaught errors 
	Cypress.on('uncaught:exception', (err, runnable) => {
		return false
	})
	
	//Visit page
	cy.visit(Cypress.env('api_server'))
	
	//Fill fields
	cy.get('input[name="username"]').type('admin')
	cy.get('input[name="password"]').type('admin')
	
	//Click 'Login' button
	cy.get('button').contains('Login').click()
	
	//Validate URL
	cy.url().should('contain', '/admin')
  })
})