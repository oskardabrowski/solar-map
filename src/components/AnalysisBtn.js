import React from "react";

const AnalysisBtn = ({ fn, start }) => {
	const startBoth = () => {
		fn(true);
		start(true);
	};
	return (
		<span>
			<button onClick={() => startBoth()}>Przeprowadź analizę</button>
			<p className="Content-options-analysis-desc">
				Jest to analiza dająca dokładniejsze wyniki odnośnie promieniowania
				słonecznego dopływającego do panelu. Może ona zająć chwilę czasu w
				zależności od regionu miasta, przeglądarki i parametrów komputera.
			</p>
		</span>
	);
};

export default AnalysisBtn;
