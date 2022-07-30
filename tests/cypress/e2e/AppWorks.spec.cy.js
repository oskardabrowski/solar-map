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

describe("Header & menu works", () => {
	it("passes", () => {
		cy.get(".header").should("be.visible");
		cy.get("#MenuBar").should("be.visible");

		cy.get("button.BtnClose").click();
		cy.get("button.CloseMiniMap").click();
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
		cy.wait(3000);
		cy.get("a.leaflet-control-zoom-out").click();
		cy.get("a.leaflet-control-zoom-out").click();
		cy.get("a.leaflet-control-zoom-out").click();

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

describe("Base maps works correctly", () => {
	it("passes", () => {
		cy.get("button[title='Mapy bazowe']").click();

		const span1 = cy.contains("span", "Open Street Map");
		const BaseMap1 = span1.parent().parent().click();
		cy.wait(3000);

		const span2 = cy.contains("span", "Open Street Map HOT");
		const BaseMap2 = span1.parent().parent().click();
		cy.wait(3000);

		const span3 = cy.contains("span", "Open Topo Map");
		const BaseMap3 = span1.parent().parent().click();
		cy.wait(3000);

		const span4 = cy.contains("span", "Carto DB Dark");
		const BaseMap4 = span1.parent().parent().click();
		cy.wait(3000);

		const span5 = cy.contains("span", "Carto DB Voyager");
		const BaseMap5 = span1.parent().parent().click();
		cy.wait(3000);

		const span6 = cy.contains("span", "Carto DB Positron");
		const BaseMap6 = span1.parent().parent().click();
		cy.wait(3000);

		const span7 = cy.contains("span", "Esri World Imagery");
		const BaseMap7 = span1.parent().parent().click();
		cy.wait(3000);

		const span8 = cy.contains("span", "Ortofotomapa 2021");
		const BaseMap8 = span1.parent().parent().click();
		cy.wait(3000);

		cy.contains("span", "Open Street Map").parent().parent().click();

		cy.get("button[title='Mapy bazowe']").click();
	})
})

describe("Info window works", () => {
	it("passes", () => {
		const infoWindow = cy.contains("span", "Informacje");
		infoWindow.parent().parent().click();

		cy.wait(3000);

		const infoWindowHeader = cy.get("div.Info-header");
		infoWindowHeader.children("button").click();
	})
})

describe("Coords window works", () => {
	it("passes", () => {
		cy.get("#CoordsLabel").should("be.visible");

		cy.get("select#CoordsSelection").select("84");
		cy.get("div#CoordsSelection84").should("be.visible");

		cy.get("select#CoordsSelection").select("92");
		cy.get("div#CoordsSelection92").should("be.visible");

		cy.get("select#CoordsSelection").select("2000");
		cy.get("div#CoordsSelection2000").should("be.visible");

		cy.get("select#CoordsSelection").select("84");
	})
})
