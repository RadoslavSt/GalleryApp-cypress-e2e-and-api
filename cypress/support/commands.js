
import {typeUser} from "../support/utilities"
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('RegisterApp', ()=>{
   
    const result = Math.random().toString(36).substring(2, 7);
    console.log(result);

    cy.get('#first-name').type('BobaTest')
    cy.get('#last-name').type('LTest')
    cy.get('#email').type( result + 'bobaTest@gmail.com')
    cy.get('#password').type('test12345')
    cy.get('#password-confirmation').type('test12345')
    cy.get('[type="checkbox"]').check()
    cy.contains('Submit').click()

})

Cypress.Commands.add('PleaseLogin', ()=>{

    cy.visit("https://gallery-app.vivifyideas.com/");
    cy.contains("Login").click();
    const credentials = ["bobaTest@gmail.com", "test12345"];
    typeUser(cy.get(".form-group input"), credentials);
    cy.contains('Submit').click()
    cy.contains("Create Gallery").click();


})
