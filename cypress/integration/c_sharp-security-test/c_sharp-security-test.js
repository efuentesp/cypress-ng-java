describe('Prueba de Seguridad', function() {
	
	function goToMenu(menuSection, menuName){
		var menuSectionRegex = new RegExp('\\b' + menuSection + '\\b')
		var menuNameRegex = new RegExp('\\b' + menuName + '\\b')
		
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('a', menuSectionRegex).parent().as('menu')
			cy.get('@menu').within(() => {
				cy.get('li>a').as('opts').then(opts => {
					if(opts.is(':visible')){
						cy.get('li').contains('a', menuNameRegex).click()
					} else {
						cy.get('@menu').click()
						cy.wait(1000)
						cy.get('li').contains('a', menuNameRegex).click()
					}
				})
			})
		})
	}
	
	function validateMessage(messageTitle, messageContent){
		cy.get('div#toast-container').within(() => {
			cy.get('div.toast-title').should('contain', messageTitle)
			cy.get('div.toast-message').should('contain', messageContent)
		})
	}
	
	function login(user = Cypress.env('admin_user'), userPassword = Cypress.env('admin_password'), idScreenshot = ''){
		cy.visit(Cypress.env('api_server'))
		cy.screenshot('login_1' + idScreenshot)
		cy.get('input#Auth_Email').type(user)
		cy.get('input#Auth_Password').type(userPassword)
		cy.screenshot('login_2' + idScreenshot)
		cy.get('input[type="submit"]').contains('Log In').click()
		cy.url().should('contain', Cypress.env('api_server'))
		cy.get('label[for="en-us"]>input[type="radio"]').check()
		cy.screenshot('login_3' + idScreenshot)
	}
		
	it('1. Crear un Authority (Rol) nuevo.', function() {
		login()
		goToMenu('Seguridad', 'Admin User Rol')
		cy.url().should('contain', '/AuthUserRol')
		cy.get('a').contains(/\bCreate New\b/).click()
		cy.get('input#AuthUserRol_Name').type('TEST_ROLE')
		cy.get('div').contains(/\bAuthUserRol_Active\b/).parent().within(() => {
			cy.get('input[type="checkbox"]').check()
		})
		cy.screenshot('paso_1_1')
		cy.get('input[type="submit"]').contains('Create').click()
		validateMessage('Exito', 'Se creo el registro!')
		cy.screenshot('paso_1_2')
	})
	
	it('2. Crear Usuario nuevo y asignarle el nuevo Rol.', function() {
		login()
		goToMenu('Seguridad', 'Admin Usuarios')
		cy.url().should('contain', '/Auth')
		cy.get('a').contains(/\bCreate New\b/).click()
		cy.get('input#Auth_Email').type('test_user@email.com')
		cy.get('input#Auth_Name').type('test_user')
		cy.get('input#Auth_Password').type('test_user')
		cy.get('input#Auth_ConfirmPassword').type('test_user')
		cy.get('select#Auth_IdRol').select('TEST_ROLE')
		cy.get('div').contains(/\bAuth_UserActive\b/).parent().within(() => {
			cy.get('input[type="checkbox"]').check()
		})
		cy.screenshot('paso_2_1')
		cy.get('input[type="submit"]').contains('Create').click()
		validateMessage('Exito', 'Se creo el registro!')
		cy.screenshot('paso_2_2')
	})
	
	it('3. Crear otro Usuario con el mismo username que el anterior.', function() {
		login()
		goToMenu('Seguridad', 'Admin Usuarios')
		cy.url().should('contain', '/Auth')
		cy.get('a').contains(/\bCreate New\b/).click()
		cy.get('input#Auth_Email').type('test_user@email.com')
		cy.get('input#Auth_Name').type('test_user')
		cy.get('input#Auth_Password').type('test_user')
		cy.get('input#Auth_ConfirmPassword').type('test_user')
		cy.get('select#Auth_IdRol').select('TEST_ROLE')
		cy.get('div').contains(/\bAuth_UserActive\b/).parent().within(() => {
			cy.get('input[type="checkbox"]').check()
		})
		cy.screenshot('paso_3_1')
		cy.get('input[type="submit"]').contains('Create').click()
		validateMessage('Error', 'Ocurrio un error al registrar!')
		cy.screenshot('paso_3_2')
	})
	
	it('4. Intentar borrar el Authority (Rol) creado.', function() {
		login()
		goToMenu('Seguridad', 'Admin User Rol')
		cy.url().should('contain', '/AuthUserRol')
		cy.get('table>tbody>').contains('tr', 'TEST_ROLE').within(() => {
			cy.get('a[name="AuthUserRol_IdRol"]').contains('Delete').click()
		})
		cy.url().should('contain', '/Delete')
		cy.screenshot('paso_4_1')
		cy.get('input[type="submit"]').contains('Delete').click()
		validateMessage('Error', 'Ocurrio un error al eliminar!')
		cy.screenshot('paso_4_2')
	})
	
	it('5. Desactivar el Rol.', function() {
		login()
		goToMenu('Seguridad', 'Admin User Rol')
		cy.url().should('contain', '/AuthUserRol')
		cy.get('table>tbody>').contains('tr', 'TEST_ROLE').within(() => {
			cy.get('a[name="AuthUserRol_IdRol"]').contains('Edit').click()
		})
		cy.url().should('contain', '/Edit')
		cy.get('div').contains(/\bAuthUserRol_Active\b/).parent().within(() => {
			cy.get('input[type="checkbox"]').click()
		})
		cy.screenshot('paso_5_1')
		cy.get('input[type="submit"]').contains('Save').click()
		validateMessage('Exito', 'Se actualizo el registro!')
		cy.screenshot('paso_5_2')
	})
	
	it('6. Activar nuevamente el Authority (Rol).', function() {
		login()
		goToMenu('Seguridad', 'Admin User Rol')
		cy.url().should('contain', '/AuthUserRol')
		cy.get('table>tbody>').contains('tr', 'TEST_ROLE').within(() => {
			cy.get('a[name="AuthUserRol_IdRol"]').contains('Edit').click()
		})
		cy.url().should('contain', '/Edit')
		cy.get('div').contains(/\bAuthUserRol_Active\b/).parent().within(() => {
			cy.get('input[type="checkbox"]').check()
		})
		cy.screenshot('paso_6_1')
		cy.get('input[type="submit"]').contains('Save').click()
		validateMessage('Exito', 'Se actualizo el registro!')
		cy.screenshot('paso_6_2')
	})
	
	it('7. Desactivar ahora el Usuario.', function() {
		login()
		goToMenu('Seguridad', 'Admin Usuarios')
		cy.url().should('contain', '/Auth')
		cy.get('table>tbody>').contains('tr', 'test_user@email.com').within(() => {
			cy.get('a[name="Auth_IdUser"]').contains('Edit').click()
		})
		cy.url().should('contain', '/Edit')
		cy.get('div').contains(/\bAuth_UserActive\b/).parent().within(() => {
			cy.get('input[type="checkbox"]').click()
		})
		cy.screenshot('paso_7_1')
		cy.get('input[type="submit"]').contains('Save').click()
		validateMessage('Exito', 'Se actualizo el registro!')
		cy.screenshot('paso_7_2')
	})
	
	it('8. Firmarse con el nuevo usuario, validar no se pueda entrar', function() {
		cy.visit(Cypress.env('api_server'))
		cy.screenshot('paso_8_1')
		cy.get('input#Auth_Email').type(Cypress.env('test_user'))
		cy.get('input#Auth_Password').type(Cypress.env('test_password'))
		cy.screenshot('paso_8_2')
		cy.get('input[type="submit"]').contains('Log In').click()
		cy.url().should('contain', Cypress.env('api_server'))
		cy.get('div').contains('Invalid email or password')
	})
	
	it('9. Eliminar el usuario nuevo.', function() {
		login()
		goToMenu('Seguridad', 'Admin Usuarios')
		cy.url().should('contain', '/Auth')
		cy.get('table>tbody>').contains('tr', 'test_user@email.com').within(() => {
			cy.get('a[name="Auth_IdUser"]').contains('Delete').click()
		})
		cy.screenshot('paso_9_1')
		cy.get('input[type="submit"]').contains('Delete').click()
		validateMessage('Exito', 'Se elimino el registro!')
		cy.screenshot('paso_9_2')
	})
	
	it('10. Eliminar el Authority (rol) nuevo, validar que se pueda.', function() {
		login()
		goToMenu('Seguridad', 'Admin User Rol')
		cy.url().should('contain', '/AuthUserRol')
		cy.get('table>tbody>').contains('tr', 'TEST_ROLE').within(() => {
			cy.get('a[name="AuthUserRol_IdRol"]').contains('Delete').click()
		})
		cy.screenshot('paso_10_1')
		cy.get('input[type="submit"]').contains('Delete').click()
		validateMessage('Exito', 'Se elimino el registro!')
		cy.screenshot('paso_10_2')
	})
	
	it('11. Firmarse con el nuevo usuario, validar no se pueda entrar', function() {
		cy.visit(Cypress.env('api_server'))
		cy.screenshot('paso_11_1')
		cy.get('input#Auth_Email').type(Cypress.env('test_user'))
		cy.get('input#Auth_Password').type(Cypress.env('test_password'))
		cy.screenshot('paso_11_2')
		cy.get('input[type="submit"]').contains('Log In').click()
		cy.url().should('contain', Cypress.env('api_server'))
		cy.get('div').contains('Invalid email or password')
	})
	
	
})