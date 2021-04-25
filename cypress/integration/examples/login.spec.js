/// <reference types="cypress" />

context("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("redirect to login page", () => {
    cy.location().should((loc) => {
      expect(loc.host).to.eq("dev-3p4qe21g.eu.auth0.com")
      expect(loc.pathname).to.eq("/u/login")
    })
  })
})
