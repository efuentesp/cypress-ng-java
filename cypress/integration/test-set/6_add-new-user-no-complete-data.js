describe('Add new user with no complete data', function() {
  it('Go to "Agregar User" menu option, fill some fields and assert that add button is disabled', function() {
	
	//This turn off uncaught errors 
	Cypress.on('uncaught:exception', (err, runnable) => {
		return false
	})
	
	//Visit page
	cy.visit('http://172.16.69.108:4200/login')
	
	//Fill fields
	cy.get('input[name="username"]').type('admin')
	cy.get('input[name="password"]').type('admin')
	
	//Click 'Login' button
	cy.get('button').contains('Login').click()
	
	//Wait for new URL
	cy.url().should('contain', '/admin')
	
	cy.wait(3000)
	
	cy.get('li>a').should('be.visible').contains('Agregar User').click()
	
	//Wait for page 'createUser'
	cy.url().should('contain', '/createUser')
	
	//Fill fields on 'createUser' page
	cy.get('input[name="username"]').type('new-user')
	cy.get('input[name="firstname"]').type('New')
	cy.get('input[name="email"]').type('new.user@email.com')
	cy.get('div').contains('Activo').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('div>select').select('ADMIN')
	
	cy.get('button').contains('Agregar').should('be.disabled')
	
	
  })
})