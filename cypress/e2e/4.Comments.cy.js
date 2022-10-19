/// <reference types = "cypress"/>

describe("Comments test e2e and APi", () => {
  beforeEach("Login and go to my Gallety", () => {
    cy.PleaseLogin();
    cy.contains("My Galleries").click();
  });

  it("Add comment on my first gallery", () => {
    cy.get(".cell h2").eq(0).click();
    cy.get('[placeholder="Comment..."]').type("First comment in my gallery");
    cy.contains("Submit").click();
  });

  it("Api Posted comment", () => {
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/comments",
      (zahtevam) => {
        console.log(zahtevam);
        zahtevam.body.body = "THIS IS API COMMENT";
      }
    ).as("PostComment");

    cy.get(".cell h2").eq(0).click();
    cy.get('[placeholder="Comment..."]').type("My Api comment");
    cy.contains("Submit").click();

    cy.wait("@PostComment").then((komentar) => {
      console.log(komentar);
      expect(komentar.response.body[0].body).eq("THIS IS API COMMENT");
    });
  });

  it("New Api comment", () => {
    //ovako mogu da proverim GET metodu
    cy.get(".cell h2").eq(0).click();
    cy.request("https://gallery-api.vivifyideas.com/api/galleries/751").then(
      (response) => {
        console.log(response);
        expect(response.body.comments[0].body).eq("THIS IS API COMMENT");
      }
    );
  });

  it("Deleted All comments", () => {
    cy.get(".cell h2").eq(0).click();
    cy.get('[class="fas fa-trash"]').then((trashBtns) => {
      cy.wrap(trashBtns).click({ multiple: true });
    });
  });

  it("Post comment on first Gallery", () => {
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/comments",
      (ApiUpis) => {
        console.log(ApiUpis);
        ApiUpis.body.body = "THIS IS API COMMENT BY USER ON THE FIRST PICTURE";
      }
    ).as("ApiPostcomm");

    cy.contains("All Galleries").click();
    cy.wait(1000);
    cy.get(".cell h2").eq(0).click();

    cy.get('[placeholder="Comment..."]').type(
      "This is User comment on the first picture in the Array"
    );
    cy.contains("Submit").click();
  });

  it.only("Get Api comment on my gallery and deleted someone commnet posted on my gallery", () => {
    cy.intercept(
      "GET",
      "https://gallery-api.vivifyideas.com/api/galleries/750",
      { fixture: "myGallComment.json" }
    ); //jednostavno sam u fix izmenjao tudje podatke sa mojim, i onda sam mogao da obrisem tudji komentar kao moj
    cy.get(".cell h2").eq(1).click();
    cy.get('[class="fas fa-trash"]').click(); //ovde brisem tudji komentar kao svoj

    //ovaj test ce verovatno pasti jer vise nema ovog komentara ,ali je jako zanimljiv postupak
    //1. u fixturu sam napravio file sa responsivom
    //2.umesto tudjih stavio sam svoje podatke
  });
});
