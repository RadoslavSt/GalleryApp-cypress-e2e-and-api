/// <reference types = "cypress"/>

import { createGalleryValidation } from "../support/utilities";
import { Cells1 } from "../support/utilities";
import { typeUrls } from "../support/utilities";

describe("Create My GAllery", () => {
  it("Create Gallery with one picture", () => {
    cy.PleaseLogin();

    const createValidation = ["Title:", "Descriptions:", "Images:"];
    createGalleryValidation(cy.get("div label"), createValidation);

    const title = "slika 1 naslov";
    cy.get("#title").type(title);
    cy.get("#description").type("This is picture 1 description");
    cy.get('[type="url"]').type(
      "https://freesvgplanet.com/wp-content/uploads/2019/10/pokemon-svg-free-30195-758x505.jpg"
    );
    cy.contains("Submit").click();
    cy.contains("Gallery App").click();

    Cells1(cy.get(".grid .cell"), title);
  });

  it.only("Create Gallery with two picture", () => {
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/galleries"
    ).as("postGallery");

    cy.PleaseLogin();
    const createValidation = ["Title:", "Descriptions:", "Images:"];
    createGalleryValidation(cy.get("div label"), createValidation);
    cy.get("#title").type("Gallery with two picture");
    cy.get("#description").type("Here is a two picture created");

    const urls = [
      "https://i.etsystatic.com/31255043/r/il/7ecd21/3372310746/il_fullxfull.3372310746_cqsg.jpg",
      "https://freesvgplanet.com/wp-content/uploads/2019/10/pokemon-svg-free-30195-758x505.jpg",
    ];

    cy.contains("Add image").click();
    typeUrls(cy.get('[type="url"]'), urls);
    cy.contains("Submit").click();

    cy.wait("@postGallery").then((lastGallery) => {
      console.log(lastGallery);
      expect(lastGallery.request.body.images).length(2);
    });
  });
});
