describe("App works", () => {
    it("passes", () => {
        cy.visit("http://localhost:3000/");

        cy.get("#AppContainer").should("be.visible");
        cy.get("button.BtnClose").click();
        cy.get("button.CloseMiniMap").click();
    });
});

describe("Minimap works", () => {
    it("passes", () => {
        cy.get("button[title='Narzędzia']").click();
        cy.contains("span", "Mini mapa").parent().click();

        const BtnMiniMapClose = cy.get("button.CloseMiniMap");
        BtnMiniMapClose.parent().should("be.visible");

        cy.get("button.CloseMiniMap").click();
    })
})

describe("Layers management works", () => {
    it("passes", () => {
        cy.contains("span", "Zarządzanie warstwami").parent().click();
    })
})
// describe("Measuerments works", () => {
//     it("passes", () => {
//         cy.contains("span", "Pomiary").parent().click();
//     })
// })
// describe("Draw panel works", () => {
//     it("passes", () => {
//         cy.contains("span", "Rysuj panel").parent().click();
//     })
// })
// describe("Download map works", () => {
//     it("passes", () => {
//         cy.contains("span", "Pobierz mapę").parent().click();
//     })
// })
