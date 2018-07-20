describe('Login with disable user', function() {
  it('Attempt to log in with disable user', function() {
	  
	//This turn off uncaught errors 
	Cypress.on('uncaught:exception', (err, runnable) => {
		return false
	})
	
	//Visit page
	cy.visit(Cypress.env('api_server'))
	
	//Fill fields
	cy.get('input[name="username"]').type('raulmoc')
	cy.get('input[name="password"]').type('raulmoc')
	
	//Click 'Login' button
	cy.get('button').contains('Login').click()
	
	//Validate disable user is not able to log in
	cy.get('div[class="alert alert-danger"]').should('contain', 'Username or password is incorrect')
  })
})