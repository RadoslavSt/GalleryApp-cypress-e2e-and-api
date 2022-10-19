/// <reference types = "cypress"/>

import { typeUser } from "../support/utilities.js";

describe("Login Test", () => {
  it("Validation of home page and login", () => {
    cy.intercept(
      "GET",
      "https://gallery-api.vivifyideas.com/api/galleries?page=1&term=",
      { fixture: "articles.json" }
    );

    cy.visit("https://gallery-app.vivifyideas.com/");
    cy.viewport(1920, 1200);
    //const headersText = ["Gallery App", "All Galleries", "Login", "Register"];
   // HeaderValidation(cy.get(".navbar a"), headersText);
    cy.contains("Login").click();

    const userCredentials = ["bobaTest@gmail.com", "test12345"];
    typeUser(cy.get(".form-group input"), userCredentials);
    cy.contains("Submit").click();

    cy.get(".grid .cell").should("have.length", 10);
  });
});
