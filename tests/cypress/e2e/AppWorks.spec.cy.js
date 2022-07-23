describe("App works", () => {
	it("passes", () => {
		cy.visit("http://localhost:3000/");

		cy.get("#AppContainer").should("be.visible");
	});
});

describe("Map works", () => {
	it("passes", () => {
		cy.get("#MapContainer").should("be.visible");
	});
});

describe("Header && menu works", () => {
	it("passes", () => {
		cy.get(".header").should("be.visible");
		cy.get("#MenuBar").should("be.visible");
	});
});

describe("Searching works", () => {
	it("passes", () => {
		cy.get("button[title='Wyszukaj adres']").click();

		const panelSearch = cy.get("div.PanelSearch");
		panelSearch.should("be.visible");

		const SearchingInput = panelSearch.get("input");
		SearchingInput.type("UMK");
		const SuggestionsPanel = panelSearch.get("div.PanelSearch-suggestions");
		SuggestionsPanel.get("div.PanelSearch-suggestions-suggestion").each(
			(el, index) => {
				if (index === 2) {
					console.log(el);
					el.click();
				}
			}
		);
		cy.get("img.leaflet-marker-icon").should("be.visible");

		cy.wait(2250);

		cy.get("button[title='Wyszukaj adres']").click();

		cy.get("img.leaflet-marker-icon").should("not.exist");
	});
});
