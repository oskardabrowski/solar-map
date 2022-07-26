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
					el.click();
				}
			}
		);
		cy.get("img.leaflet-marker-icon").should("be.visible");

		cy.wait(1000);

		cy.get("button[title='Wyszukaj adres']").click();

		cy.get("img.leaflet-marker-icon").should("not.exist");
	});
});

describe("Tiles works", () => {
	it("passes", () => {
		const Button = cy.get("button[title='Warstwy tematyczne']");
		Button.click();

		const span = cy.contains("span", "Klasyfikacja powierzchni");
		const AreaClasses = span.parent().parent();

		AreaClasses.click();

		cy.wait(3000);
		cy.contains("span", "Klasyfikacja powierzchni").parent().parent().click();

		const span2 = cy.contains("span", "Gradient powierzchni");
		const AreaGradient = span2.parent().parent();

		AreaGradient.click();

		cy.wait(3000);
		cy.contains("span", "Gradient powierzchni").parent().parent().click();

		const span3 = cy.contains("span", "Widoczność nieba");
		const AreaView = span3.parent().parent();

		AreaView.click();

		cy.wait(3000);
		cy.contains("span", "Widoczność nieba").parent().parent().click();

		const span4 = cy.contains("span", "Obrysy Budynków");
		const AreaBorders = span4.parent().parent();

		AreaBorders.click();

		cy.wait(3000);
		cy.contains("span", "Obrysy Budynków").parent().parent().click();
		cy.get("button[title='Warstwy tematyczne']").click();
	});
});
