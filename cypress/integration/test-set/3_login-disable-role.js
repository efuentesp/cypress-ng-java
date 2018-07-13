describe('Login user with disable role', function() {
  it('Add data on fields and get a login successful but no menu options', function() {
	
	//This turn off uncaught errors 
	Cypress.on('uncaught:exception', (err, runnable) => {
		return false
	})
	
	//Visit page
	cy.visit('http://172.16.69.108:4200/login')
	
	//Fill fields
	cy.get('input[name="username"]').type('user-rol-disabled')
	cy.get('input[name="password"]').type('user-rol-disabled')
	
	//Click 'Login' button
	cy.get('button').contains('Login').click()
	
	//Wait for new URL
	cy.url().should('contain', '/admin')
	
	cy.wait(3000)
	
	//Validate that menu-section 
	cy.get('div[class="menu_section"]').eq(0).within(() => {
		cy.get('li').should('have.length', 0)
	})
	
	
	
  })
})