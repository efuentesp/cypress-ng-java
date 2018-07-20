describe('Add an existing user', function() {
  it('Go to "Agregar User" menu option, fill all fields with an existing user name and got an error message because of the existing user', function() {
	
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
	
	//Wait for new URL
	cy.url().should('contain', '/admin')
	
	cy.wait(3000)
	
	//Go to 'Agregar User' menu option
	cy.get('li>a').should('be.visible').contains('Agregar User').click()
	
	//Wait for page 'createUser'
	cy.url().should('contain', '/createUser')
	
	//Fill fields on 'createUser' page
	cy.get('input[name="username"]').type('admin')
	cy.get('input[name="password"]').type('admin')
	cy.get('input[name="firstname"]').type('Admin')
	cy.get('input[name="lastname"]').type('User')
	cy.get('input[name="email"]').type('admin.user@email.com')
	cy.get('div').contains('Activo').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('div>select').select('ADMIN')
	
	// Click on 'Agregar' button
	cy.get('button').contains('Agregar').click()
	
	//Validate error message due to existing user
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'User duplicated.')
	
  })
})