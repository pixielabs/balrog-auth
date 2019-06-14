const currentPassword = "123456";

describe("Unprotected Route", function() {
  it("has 'I am a public page'", function() {
    cy.visit("/");
    cy.get("h1").should("have.text", "I am a public page");
  });
});

describe("Protected Route", function() {
  it("redirects to Balrog Gate", function() {
    cy.visit("/admin");
    cy.get("button").should("have.text", "Login");
  });
});

describe("Protected Route", function() {
  it("redirects to Balrog Gate if incorrect password is entered", function() {
    cy.visit("/admin");
    cy.get("input").type("Not the correct password");
    cy.get("form").submit();
    cy.get("button").should("have.text", "Login");
  });
});

describe("Protected Route", function() {
  it("redirects to Balrog Gate if correct password is entered", function() {
    cy.visit("/admin");
    cy.get("input").type(currentPassword);
    cy.get("form").submit();
    cy.get("h1").should("have.text", "I am a protected page");
  });
});

describe("Logout Route", function() {
  it("removes Balrog Authentication from cookie", function() {
    cy.visit("/admin");
    cy.get("input").type(currentPassword);
    cy.get("form").submit();
    cy.get("h1").should("have.text", "I am a protected page");
    cy.get("form").submit();
    cy.visit("/admin");
    cy.get("button").should("have.text", "Login");
  });
});
