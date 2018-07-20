describe('Modify user', function() {
  it('Go to "Agregar User" menu option, ', function() {
	
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
	
	//Go to 'Administrar User' menu option
	cy.get('li>a').should('be.visible').contains('Administrar User').click()
	
	//Wait for page 'manageUser'
	cy.url().should('contain', '/manageUser')
	
	cy.wait(3000)
	
	//Get user from table and click on 'edit' button in order to change authority
	cy.get('table>tbody').contains('tr', 'test2').within(() => {
		cy.get('button>span[class="fa fa-pencil"]').click()
	})
	
	//Change Role
	cy.get('div>select').select('ADMIN')
	
	// Click on 'Modificar' button
	cy.get('button').contains('Modificar').click()
	
	//Validate message due to user with new role
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'User save successfully.')
	
  })
})