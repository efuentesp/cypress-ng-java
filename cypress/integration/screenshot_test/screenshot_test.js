describe('Screenshot Tester', function() {
	it('Take screenshots from URLS', function() {
		
		//This turn off uncaught errors 
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false
		})
		
		var URLS = [
			{page: "http://localhost:1337/#!/cliente-administrar/", title: "Cliente-Administrar"},
			{page: "http://localhost:1337/#!/cliente-agregar/", title: "Cliente-Agregar"},
			{page: "http://localhost:1337/#!/cliente-eliminar/", title: "Cliente-Editar"},
			{page: "http://localhost:1337/#!/clientes-admin/", title: "Clientes-Admin"},
			{page: "http://localhost:1337/#!/clientes-agregar/", title: "Clientes-Agregar"},
			{page: "http://localhost:1337/#!/pedido-admin/", title: "Pedido-Admin"},
			{page: "http://localhost:1337/#!/pedido-agregar/", title: "Pedido-Agregar"},
			{page: "http://localhost:1337/#!/imss-registrar-pension/", title: "Imss-Registrar-Pension"},
			{page: "http://localhost:1337/#!/banorte-cargos-ops/", title: "Banorte-Cargos-Ops"},
			{page: "http://localhost:1337/#!/banorte-cargos-ligados-contratos/", title: "Banorte-Cargos-Ligados-Contratos"},
			{page: "http://localhost:1337/#!/reservaciones/", title: "Reservaciones"},
			{page: "http://localhost:1337/#!/cliente-administrar/", title: "Cliente-Administrar1"},
			{page: "http://localhost:1337/#!/cliente-agregar/", title: "Cliente-Agregar1"},
			{page: "http://localhost:1337/#!/cliente-eliminar/", title: "Cliente-Editar1"},
			{page: "http://localhost:1337/#!/clientes-admin/", title: "Clientes-Admin1"},
			{page: "http://localhost:1337/#!/clientes-agregar/", title: "Clientes-Agregar1"},
			{page: "http://localhost:1337/#!/pedido-admin/", title: "Pedido-Admin1"},
			{page: "http://localhost:1337/#!/pedido-agregar/", title: "Pedido-Agregar1"},
			{page: "http://localhost:1337/#!/imss-registrar-pension/", title: "Imss-Registrar-Pension1"},
			{page: "http://localhost:1337/#!/banorte-cargos-ops/", title: "Banorte-Cargos-Ops1"},
			{page: "http://localhost:1337/#!/banorte-cargos-ligados-contratos/", title: "Banorte-Cargos-Ligados-Contratos1"},
			{page: "http://localhost:1337/#!/reservaciones/", title: "Reservaciones1"},
		]; 	
		
		URLS.forEach(function(element) {
		  cy.visit(element.page)
		  cy.reload()
		  cy.get('sidebar').invoke('css', 'display', 'absolute')
		  cy.get('topbar').invoke('css', 'display', 'none')
		  cy.screenshot(element.title)
		});
		
	})
})