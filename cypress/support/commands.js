// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("loginWithUI", (overrides = {}) => {
  Cypress.log({
    name: "loginWithUI",
  })

  cy.get("input[type=text]").type(Cypress.env("auth_username"))
  cy.get("input[type=password]").type(Cypress.env("auth_password"))
  cy.get("button[value=default]").click()

  cy.location().should((loc) => {
    const domain = new URL(Cypress.env("base_url"))
    expect(loc.host).to.eq(domain.host)
    expect(loc.pathname).to.eq("/")
  })
})
