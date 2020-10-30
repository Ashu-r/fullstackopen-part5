describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user = {
			name: 'test sheep',
			username: 'testerman111',
			password: 'IamaStrongsheep123',
		};
		cy.request('POST', 'http://localhost:3001/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function () {
		cy.contains('login').click();
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click();
			cy.get('#username').type('testerman111');
			cy.get('#password').type('IamaStrongsheep123');
			cy.get('#login-button').click();

			cy.contains('test sheep logged-in');
		});

		it('fails with wrong credentials', function () {
			cy.contains('login').click();
			cy.get('#username').type('testerman111');
			cy.get('#password').type('imsmolweaksheep');
			cy.get('#login-button').click();

			cy.contains('Wrong credentials');
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({
				username: 'testerman111',
				password: 'IamaStrongsheep123',
			});
			cy.createBlog({
				title: 'me',
				author: 'man',
				url: 'testing',
				likes: 0,
			});
			cy.visit('http://localhost:3000');
		});

		it('A blog can be created', function () {
			cy.contains('me');
		});

		it('A blog can be liked', function () {
			cy.contains('view').click();
			cy.contains('like').click();
			cy.get('.likes').should('contain', 1);
		});

		it('A blog can be deleted', function () {
			cy.contains('view').click();
			cy.contains('Delete').click();
			cy.get('.blog').should('not.exist');
		});

		it('Blogs sorted according to likes', function () {
			cy.createBlog({
				title: 'me2',
				author: 'man',
				url: 'testing2',
				likes: 919,
			});
			cy.createBlog({
				title: 'me3',
				author: 'man',
				url: 'testing3',
				likes: 3,
			});
			cy.visit('http://localhost:3000');
			cy.get('.blog').first().should('contain', '919');
			cy.get('.blog').last().should('contain', '0');
		});
	});
});
