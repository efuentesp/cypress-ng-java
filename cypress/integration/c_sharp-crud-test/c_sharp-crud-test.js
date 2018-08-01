describe('Prueba de Aplicación', function() {
  it('Prueba integral para código generado en C# CRUD', function() {
	  
	//**************************************************************
	//************************** 1. Login **************************
	//**************************************************************
	cy.visit(Cypress.env('api_server'))
	cy.get('input#Auth_Email').type(Cypress.env('user'))
	cy.get('input#Auth_Password').type(Cypress.env('password'))
	cy.screenshot('paso_1_1')
	cy.get('input[type="submit"]').contains('Log In').click()
	cy.url().should('contain', Cypress.env('c_sharp_server'))
	cy.get('label[for="en-us"]>input[type="radio"]').check()
	cy.screenshot('paso_1_2')
	
	//**************************************************************
	//**** 2. Crear una Aplicación nueva con datos incompletos *****
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Application').click()
		})
	})
	cy.url().should('contain', '/Application')
	cy.get('a').contains('Create New').click()
	cy.get('input#Application_Code').type('test_application')
	cy.screenshot('paso_2_1')
	cy.get('input[type="submit"]').contains('Create').click()
	cy.get('span.field-validation-error.text-danger').should('contain', 'Required Data')
	cy.screenshot('paso_2_2')
	
	//**************************************************************
	//***** 3. Crear una Aplicación nueva con datos completos ******
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Application').click()
		})
	})
	cy.url().should('contain', '/Application')
	cy.get('a').contains('Create New').click()
	cy.get('input#Application_Code').type('test_application')
	cy.get('input#Application_Name').type('Test Application')
	cy.screenshot('paso_3_1')
	cy.get('input[type="submit"]').contains('Create').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se creo el registro!')
	})
	cy.screenshot('paso_3_2')
	
	//**************************************************************
	//******** 4. Editar la Aplicación con datos incompletos *******
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Application').click()
		})
	})
	cy.url().should('contain', '/Application')
	cy.get('table>tbody>').contains('tr', 'Test Application').within(() => {
		cy.get('td>a').contains('Edit').click()
	})
	cy.get('input#Application_Code').clear()
	cy.screenshot('paso_4_1')
	cy.get('input[type="submit"]').contains('Save').click()
	cy.get('span.field-validation-error.text-danger').should('contain', 'Required Data')
	cy.screenshot('paso_4_2')
	
	//**************************************************************
	//***** 5. Editar la Aplicación creada con datos completos *****
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Application').click()
		})
	})
	cy.url().should('contain', '/Application')
	cy.get('table>tbody>').contains('tr', 'Test Application').within(() => {
		cy.get('td>a').contains('Edit').click()
	})
	cy.url().should('contain', '/Application/Edit')
	cy.get('input#Application_Code').clear().type('test_application_edited')
	cy.get('input#Application_Name').clear().type('Test Application Edited')
	cy.screenshot('paso_5_1')
	cy.get('input[type="submit"]').contains('Save').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se actualizo el registro!')
	})
	cy.screenshot('paso_5_2')
	
	//**************************************************************
	//******** 6. Crear un Modulo asociado a la Aplicación *********
	//******************* con datos incompletos ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Module').click()
		})
	})
	cy.url().should('contain', '/Module')
	cy.get('a').contains('Create New').click()
	cy.url().should('contain', '/Module/Create')
	cy.get('a.btn.btn-default').contains('Buscar').click()
	cy.wait(1000)
	cy.screenshot('paso_6_1')
	cy.get('div#myModal').within(() => {
		cy.get('table>tbody').contains('tr', 'Test Application Edited').within(() => {
			cy.get('td>a').contains('Select').click()
		})
	})
	cy.screenshot('paso_6_2')
	cy.get('input[type="submit"]').contains('Create').click()
	cy.get('span.field-validation-error.text-danger').should('contain', 'Required Data')
	cy.screenshot('paso_6_3')
	
	
	//**************************************************************
	//******** 7. Crear un Modulo asociado a la Aplicación *********
	//******************** con datos completos *********************
	//**************************************************************	
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Module').click()
		})
	})
	cy.url().should('contain', '/Module')
	cy.get('a').contains('Create New').click()
	cy.url().should('contain', '/Module/Create')
	cy.get('a.btn.btn-default').contains('Buscar').click()
	cy.wait(1000)
	cy.screenshot('paso_7_1')
	cy.get('div#myModal').within(() => {
		cy.get('table>tbody').contains('tr', 'Test Application Edited').within(() => {
			cy.get('td>a').contains('Select').click()
		})
	})
	cy.get('input#Module_Code').type('test_module')
	cy.get('input#Module_Name').type('Test Module')
	cy.screenshot('paso_7_2')
	cy.get('input[type="submit"]').contains('Create').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se creo el registro!')
	})
	cy.screenshot('paso_7_3')
	
	//**************************************************************
	//********* 8. Editar el Modulo con datos incompletos **********
	//****************** validar que marque error ******************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Module').click()
		})
	})
	cy.url().should('contain', '/Module')
	cy.get('table>tbody>').contains('tr', 'Test Module').within(() => {
		cy.get('td>a').contains('Edit').click()
	})
	cy.url().should('contain', '/Module/Edit')
	cy.get('input#Module_Code').clear()
	cy.screenshot('paso_8_1')
	cy.get('input[type="submit"]').contains('Save').click()
	cy.get('span.field-validation-error.text-danger').should('contain', 'Required Data')
	cy.screenshot('paso_8_2')
	
	//**************************************************************
	//********** 9. Editar el Modulo con datos completos ***********
	//******************** validar que se editó ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Module').click()
		})
	})
	cy.url().should('contain', '/Module')
	cy.get('table>tbody>').contains('tr', 'Test Module').within(() => {
		cy.get('td>a').contains('Edit').click()
	})
	cy.url().should('contain', '/Module/Edit')
	cy.get('input#Module_Code').clear().type('test_module_edited')
	cy.get('input#Module_Name').clear().type('Test Module Edited')
	cy.screenshot('paso_9_1')
	cy.get('input[type="submit"]').contains('Save').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se actualizo el registro!')
	})
	cy.screenshot('paso_9_2')
	
	//**************************************************************
	//* 10. Crear un Menú asociado al Modulo con datos incompletos *
	//****************** validar que marque error ******************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Menu').click()
		})
	})
	cy.url().should('contain', '/Menu')
	cy.get('a').contains('Create New').click()
	cy.url().should('contain', '/Menu/Create')
	cy.get('a.btn.btn-default').contains('Buscar').click()
	cy.wait(1000)
	cy.screenshot('paso_10_1')
	cy.get('div#myModal').within(() => {
		cy.get('table>tbody').contains('tr', 'Test Module Edited').within(() => {
			cy.get('td>a').contains('Select').click()
		})
	})
	cy.get('input#Menu_Code').clear().type('test_menu')
	cy.screenshot('paso_10_2')
	cy.get('input[type="submit"]').contains('Create').click()
	cy.get('span.field-validation-error.text-danger').should('contain', 'Required Data')
	cy.screenshot('paso_10_3')
	
	//**************************************************************
	//** 11. Crear un Menú asociado al Modulo con datos completos **
	//******************** validar que se creó *********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Menu').click()
		})
	})
	cy.url().should('contain', '/Menu')
	cy.get('a').contains('Create New').click()
	cy.url().should('contain', '/Menu/Create')
	cy.get('a.btn.btn-default').contains('Buscar').click()
	cy.wait(1000)
	cy.screenshot('paso_11_1')
	cy.get('div#myModal').within(() => {
		cy.get('table>tbody').contains('tr', 'Test Module Edited').within(() => {
			cy.get('td>a').contains('Select').click()
		})
	})
	cy.get('input#Menu_Code').clear().type('test_menu')
	cy.get('input#Menu_Path').clear().type('Test Menu')
	cy.screenshot('paso_11_2')
	cy.get('input[type="submit"]').contains('Create').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se creo el registro!')
	})
	cy.screenshot('paso_11_3')
	
	//**************************************************************
	//****** 12. Editar el Menú creado con datos incompletos *******
	//****************** validar que marque error ******************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Menu').click()
		})
	})
	cy.url().should('contain', '/Menu')
	cy.get('table>tbody>').contains('tr', 'Test Menu').within(() => {
		cy.get('td>a').contains('Edit').click()
	})
	cy.url().should('contain', '/Menu/Edit')
	cy.get('input#Menu_Code').clear()
	cy.get('input#Menu_Path').clear()
	cy.screenshot('paso_12_1')
	cy.get('input[type="submit"]').contains('Save').click()
	cy.get('span.field-validation-error.text-danger').should('contain', 'Required Data')
	cy.screenshot('paso_12_2')
	
	//**************************************************************
	//******* 13. Editar el Menú creado con datos completos ********
	//*******************  validar que se editó. *******************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Menu').click()
		})
	})
	cy.url().should('contain', '/Menu')
	cy.get('table>tbody>').contains('tr', 'Test Menu').within(() => {
		cy.get('td>a').contains('Edit').click()
	})
	cy.url().should('contain', '/Menu/Edit')
	cy.get('input#Menu_Code').clear().type('test_menu_edited')
	cy.get('input#Menu_Path').clear().type('Test Menu Edited')
	cy.screenshot('paso_13_1')
	cy.get('input[type="submit"]').contains('Save').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se actualizo el registro!')
	})
	cy.screenshot('paso_13_2')
	
	//**************************************************************
	//*** 14. Crear un Servicio Funcional con datos incompletos ****
	//*****************  validar que marque error. *****************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'FunctionalService').click()
		})
	})
	cy.url().should('contain', '/FunctionalService')
	cy.get('a').contains('Create New').click()
	cy.url().should('contain', '/FunctionalService/Create')
	cy.get('a.btn.btn-default').contains('Buscar').click()
	cy.wait(1000)
	cy.screenshot('paso_14_1')
	cy.get('div#myModal').within(() => {
		cy.get('table>tbody').contains('tr', 'Test Menu Edited').within(() => {
			cy.get('td>a').contains('Select').click()
		})
	})
	cy.screenshot('paso_14_2')
	cy.get('input[type="submit"]').contains('Create').click()
	cy.get('span.field-validation-error.text-danger').should('contain', 'Required Data')
	cy.screenshot('paso_14_3')
	
	//**************************************************************
	//**** 15. Crear un Servicio Funcional con datos completos *****
	//*******************   validar que se creó ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'FunctionalService').click()
		})
	})
	cy.url().should('contain', '/FunctionalService')
	cy.get('a').contains('Create New').click()
	cy.url().should('contain', '/FunctionalService/Create')
	cy.get('a.btn.btn-default').contains('Buscar').click()
	cy.wait(1000)
	cy.screenshot('paso_15_1')
	cy.get('div#myModal').within(() => {
		cy.get('table>tbody').contains('tr', 'Test Menu Edited').within(() => {
			cy.get('td>a').contains('Select').click()
		})
	})
	cy.get('input#FunctionalService_Code').type('functional_service_test')
	cy.get('input#FunctionalService_Name').type('Functional Service Test')
	cy.get('input#FunctionalService_Description').type('Application Test')
	cy.get('input#FunctionalService_Size').clear().type('1')
	cy.get('select[name="FunctionalService_Complexity').select('Muy Simple')
	cy.get('input#FunctionalService_Repetitions').clear().type('1')
	cy.get('select[name="FunctionalService_Repository"]').select('De 2 a 4')
	cy.get('select[name="FunctionalService_Data"]').select('De 0 a 10')
	cy.get('select[name="FunctionalService_AlgorithmType"]').select('Mover información')
	cy.get('select[name="FunctionalService_Reusability"]').select('Reutiliza diseño')
	cy.get('input#FunctionalService_Comments').type('This is only a test')
	cy.screenshot('paso_15_2')
	cy.get('input[type="submit"]').contains('Create').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se creo el registro!')
	})
	cy.screenshot('paso_15_3')
	
	//**************************************************************
	//*** 16. Editar un Servicio Funcional con datos incompletos ***
	//****************** validar que marque error ******************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'FunctionalService').click()
		})
	})
	cy.url().should('contain', '/FunctionalService')
	cy.get('table>tbody>').contains('tr', 'Functional Service Test').within(() => {
		cy.get('td>a').contains('Edit').click()
	})
	cy.url().should('contain', '/FunctionalService/Edit')
	cy.get('input#FunctionalService_Code').clear()
	cy.get('input#FunctionalService_Name').clear()
	cy.get('input#FunctionalService_Size').clear()
	cy.screenshot('paso_16_1')
	cy.get('input[type="submit"]').contains('Save').click()
	cy.get('span.field-validation-error.text-danger').should('contain', 'Required Data')
	cy.screenshot('paso_16_2')
	
	//**************************************************************
	//**** 17. Editar un Servicio Funcional con datos completos ****
	//******************* validar que se editó *********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'FunctionalService').click()
		})
	})
	cy.url().should('contain', '/FunctionalService')
	cy.get('table>tbody>').contains('tr', 'Functional Service Test').within(() => {
		cy.get('td>a').contains('Edit').click()
	})
	cy.url().should('contain', '/FunctionalService/Edit')
	cy.get('input#FunctionalService_Code').clear().type('functional_service_test_edited')
	cy.get('input#FunctionalService_Name').clear().type('Functional Service Test Edited')
	cy.get('input#FunctionalService_Size').clear().type('2')
	cy.screenshot('paso_17_1')
	cy.get('input[type="submit"]').contains('Save').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se actualizo el registro!')
	})
	cy.screenshot('paso_17_2')
	
	//**************************************************************
	//********** 18. Eliminar el Menu creado anteriormente *********
	//***************** validar que no se pueda ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Menu').click()
		})
	})
	cy.url().should('contain', '/Menu')
	cy.get('table>tbody>').contains('tr', 'Test Menu').within(() => {
		cy.get('td>a').contains('Delete').click()
	})
	cy.url().should('contain', '/Menu/Delete')
	cy.screenshot('paso_18_1')
	cy.get('input[type="submit"]').contains('Delete').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Error')
		cy.get('div.toast-message').should('contain', 'Ocurrio un error al eliminar!')
	})
	cy.screenshot('paso_18_2')
	
	//**************************************************************
	//** 19. Eliminar el Serivicio Funcional creado anteriormente **
    //****************** validar que se eliminó ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'FunctionalService').click()
		})
	})
	cy.url().should('contain', '/FunctionalService')
	cy.get('table>tbody>').contains('tr', 'Functional Service Test Edited').within(() => {
		cy.get('td>a').contains('Delete').click()
	})
	cy.url().should('contain', '/FunctionalService/Delete')
	cy.screenshot('paso_19_1')
	cy.get('input[type="submit"]').contains('Delete').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se elimino el registro!')
	})
	cy.screenshot('paso_19_2')
	
	//**************************************************************
	//******** 20. Eliminar el Modulo creado anteriormente *********
	//***************** validar que no se pueda ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Module').click()
		})
	})
	cy.url().should('contain', '/Module')
	cy.get('table>tbody>').contains('tr', 'Test Module Edited').within(() => {
		cy.get('td>a').contains('Delete').click()
	})
	cy.url().should('contain', '/Module/Delete')
	cy.screenshot('paso_20_1')
	cy.get('input[type="submit"]').contains('Delete').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Error')
		cy.get('div.toast-message').should('contain', 'Ocurrio un error al eliminar!')
	})
	cy.screenshot('paso_20_2')
	
	//**************************************************************
	//********* 21. Eliminar el Menu creado anteriormente **********
	//****************** validar que se eliminó ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Menu').click()
		})
	})
	cy.url().should('contain', '/Menu')
	cy.get('table>tbody>').contains('tr', 'Test Menu').within(() => {
		cy.get('td>a').contains('Delete').click()
	})
	cy.url().should('contain', '/Menu/Delete')
	cy.screenshot('paso_21_1')
	cy.get('input[type="submit"]').contains('Delete').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se elimino el registro!')
	})
	cy.screenshot('paso_21_2')
	
	//**************************************************************
	//****** 22. Eliminar la Aplicación creada anteriormente *******
	//***************** validar que no se pueda ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Application').click()
		})
	})
	cy.url().should('contain', '/Application')
	cy.get('table>tbody>').contains('tr', 'Test Application Edited').within(() => {
		cy.get('td>a').contains('Delete').click()
	})
	cy.url().should('contain', '/Application/Delete')
	cy.screenshot('paso_22_1')
	cy.get('input[type="submit"]').contains('Delete').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Error')
		cy.get('div.toast-message').should('contain', 'Ocurrio un error al eliminar!')
	})
	cy.screenshot('paso_22_2')
	
	//**************************************************************
	//******** 23. Eliminar el Modulo creado anteriormente *********
	//****************** validar que se eliminó ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').click()
		cy.wait(1000)
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Module').click()
		})
	})
	cy.url().should('contain', '/Module')
	cy.get('table>tbody>').contains('tr', 'Test Module Edited').within(() => {
		cy.get('td>a').contains('Delete').click()
	})
	cy.url().should('contain', '/Module/Delete')
	cy.screenshot('paso_23_1')
	cy.get('input[type="submit"]').contains('Delete').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se elimino el registro!')
	})
	cy.screenshot('paso_23_2')
	
	//**************************************************************
	//****** 24. Eliminar la Aplicación creada anteriormente *******
	//****************** validar que se eliminó ********************
	//**************************************************************
	cy.get('div#sidebar-menu').within(() => {
		cy.get('div.menu_section.active').contains('a', 'Demo SFN').as('menu')
		cy.get('@menu').parent().within(() => {
			cy.get('li').contains('a', 'Application').click()
		})
	})
	cy.url().should('contain', '/Application')
	cy.get('table>tbody>').contains('tr', 'Test Application Edited').within(() => {
		cy.get('td>a').contains('Delete').click()
	})
	cy.url().should('contain', '/Application/Delete')
	cy.screenshot('paso_24_1')
	cy.get('input[type="submit"]').contains('Delete').click()
	cy.get('div#toast-container').within(() => {
		cy.get('div.toast-title').should('contain', 'Exito')
		cy.get('div.toast-message').should('contain', 'Se elimino el registro!')
	})
	cy.screenshot('paso_24_2')
	
	//**************************************************************
	//**** 25. Logout, validar que se está en pantalla de Login ****
	//**************************************************************
	cy.get('div.profile_info').within(() => {
		cy.get('a').contains('Logout').click()
	})
	cy.screenshot('paso_25_1')
	cy.url().should('contain', '/Auth/LoginApp')
	cy.screenshot('paso_25_2')
	
  })
})

