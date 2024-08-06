
describe('Home Page', () => {
  it('should load the login page successfully', () => {
    cy.visit('/');
    cy.contains("Don't have an account? Register"); 
  });
});

describe('Login Functionality', () => {
  it('should navigate to the main page after successful login', () => {
    cy.visit('/'); // Visit the login page

    // Fill in the email and password fields
    cy.get('[data-cy=login-email]').type('cypress@test.com');
    cy.get('[data-cy=login-password]').type('test');

    // Click the login button
    cy.get('[data-cy=login-submit]').click();

    // Verify that the URL includes '/main'
    cy.url().should('include', '/main');
  });
});