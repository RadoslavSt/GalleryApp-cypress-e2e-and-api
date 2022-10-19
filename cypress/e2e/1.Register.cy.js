/// <reference types = "cypress"/>

import { HeaderValidation } from "../support/utilities.js";
import { registerValidation } from "../support/utilities.js";

describe("Register Test", () => {
  before(" Header Validation, Create new user, and form validation", () => {
    cy.visit("https://gallery-app.vivifyideas.com/");
    cy.viewport(1920, 800);

    const HeadersText = ["Gallery App", "All Galleries", "Login", "Register"];
    HeaderValidation(cy.get("#navbarTogglerDemo01 a"), HeadersText);
  });

  it("Registered and Form validations", () => {
    const registerLabels = [
      "First Name",
      "Last Name",
      "Email",
      "Password",
      "Confirmed Password",
      "Accepted terms and conditions",
    ];
    registerValidation(cy.get(".form-group label"), registerLabels);
    cy.RegisterApp();
   // cy.contains('Logout').click()
  });
});
