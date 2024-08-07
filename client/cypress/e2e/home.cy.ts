import "cypress-file-upload";

describe("E2E tests", () => {
  beforeEach(() => {
    cy.session("user", () => {
      cy.visit("/");
      cy.get("[data-cy=login-email]").type("cypress@test.com");
      cy.get("[data-cy=login-password]").type("test");
      cy.get("[data-cy=login-submit]").click();
      cy.url().should("include", "/main");
    });
  });

  it("should load the login page successfully", () => {
    cy.visit("/");
    cy.contains("Don't have an account? Register");
  });

  it("should be logged in on the main page", () => {
    cy.visit("/main");
    cy.url().should("include", "/main");
  });

  it("should create a car successfully", () => {
    cy.visit("/main");
    cy.url().should("include", "/main");

    cy.get("[data-cy=car-name]").type("test");
    cy.get("[data-cy=car-price]").type("5000");
    cy.get("[data-cy=car-zipcode]").type("08080");
    cy.get("[data-cy=car-image]").attachFile("test.jpeg");

    cy.intercept("POST", "http://localhost:5001/cars").as("createCar");

    cy.get("[data-cy=car-submit]").click();

    cy.wait("@createCar").its("response.statusCode").should("equal", 201);
  });

  it("should load my cars page successfully", () => {
    cy.visit("/user-cars");
    cy.contains("My Cars");
  });

  it("should delete one of my cars successfully", () => {
    cy.visit("/user-cars");
    cy.contains("My Cars");

    cy.intercept("DELETE", "http://localhost:5001/cars/*").as("deleteCar");

    cy.get("[data-cy=car-delete]").first().click();

    cy.wait("@deleteCar").then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(200);
      }
    });
  });

  it("should logout successfully", () => {
    cy.visit("/main");
    cy.get("[data-cy=logout]").click();
    cy.url().should("include", "/");
  });
});
