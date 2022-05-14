export class LoginPage {
  clickLoginLink() {
    return cy.get("#loginLink").click();
  }
  enterUsername(email: string) {
    return cy.get("#sessionEmail").type(email);
  }
  enterPassword(password: string) {
    return cy.get("#sessionPassword").type(password);
  }
  submitLogin() {
    return cy.get('input[type="submit"]').click();
  }

  login() {
      this.clickLoginLink();
      this.enterUsername(Cypress.env('account_email'));
      this.enterPassword(Cypress.env('account_password'));
      this.submitLogin();
  }
  
}