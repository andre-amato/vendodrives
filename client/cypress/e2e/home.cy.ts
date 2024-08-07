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

  it("should create two cars successfully", () => {
    cy.visit("/main");
    cy.url().should("include", "/main");

    cy.get("[data-cy=car-name]").type("test");
    cy.get("[data-cy=car-price]").type("5000");
    cy.get("[data-cy=car-zipcode]").type("08080");
    cy.get("[data-cy=car-image]").attachFile("test.jpeg");

    cy.intercept("POST", "http://localhost:5001/cars").as("createCar");

    cy.get("[data-cy=car-submit]").click();

    cy.wait("@createCar").its("response.statusCode").should("equal", 201);

    cy.get("[data-cy=car-name]").type("test2");
    cy.get("[data-cy=car-price]").type("1000");
    cy.get("[data-cy=car-zipcode]").type("08210");
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
  it("should visit a car details page successfully", () => {
    cy.visit("/main");
    cy.intercept("GET", "http://localhost:5001/cars/*").as("getCarDetails");
    cy.get("[data-cy=car-card]").first().click();
    cy.wait("@getCarDetails").its("response.statusCode").should("equal", 200);
    cy.url().should("include", "/car-details/");
  });

  it("should contain name, price, zipcode, image and map of a car", () => {
    cy.visit("/main");
    cy.intercept("GET", "http://localhost:5001/cars/*").as("getCarDetails");
    cy.get("[data-cy=car-card]").first().click();
    cy.url().should("include", "/car-details/");
    cy.get("h1").should("not.be.empty");
    cy.get("p").contains("Price:").should("exist");
    cy.get("p").contains("Zip Code:").should("exist");
    cy.get("img").should("have.attr", "src").and("not.be.empty");
    cy.get(".leaflet-container").should("be.visible");
  });

  it("should logout successfully", () => {
    cy.visit("/main");
    cy.get("[data-cy=logout]").click();
    cy.url().should("include", "/");
    cy.visit("/main");
    cy.url().should("include", "/");
    cy.visit("/user-cars");
    cy.url().should("include", "/");
  });
});
