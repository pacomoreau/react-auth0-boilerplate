/// <reference types="cypress" />

context("Login", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("base_url"))
  })

  it("redirect to login page", () => {
    cy.location().should((loc) => {
      expect(loc.host).to.eq(Cypress.env("auth_domain"))
      expect(loc.pathname).to.eq("/u/login")
    })
  })

  it("successfully log test user", () => {
    cy.loginWithUI()
  })
})
