/* eslint-disable no-undef */
describe("Render test" , function () {
    it("Show popup detail", function () {
        cy.viewport(1920, 1080)
        cy.visit("http://localhost:3000/covid-19")
        cy.get('.filter').select("TotalDeaths")
        cy.get('.filter').select("TotalRecovered")
        cy.get('.detail-btn').last().click()
    })
})