describe('Login Successful', function() {
  it('Add data on fields and get a login successful', function() {
	
	//This turn off uncaught errors 
	Cypress.on('uncaught:exception', (err, runnable) => {
		return false
	})
	
	//Visit page
	cy.visit(Cypress.env('api_server'))
	
	//Fill fields
	cy.get('input[name="username"]').type('dummy')
	cy.get('input[name="password"]').type('dummy')
	
	//Click 'Login' button
	cy.get('button').contains('Login').click()
	
	//Validate error message when we attempt to log in
	cy.get('div[class="alert alert-danger"]').should('contain', 'Username or password is incorrect')
	
  })
})