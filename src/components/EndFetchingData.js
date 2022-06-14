import React, { useEffect, useContext } from "react";
import { MapContext } from "./GlobalContext";

const EndFetchingData = () => {
	const context = useContext(MapContext);
	const { isAppLoading, setIsAppLoading } = useContext(MapContext);

	useEffect(() => {
		setIsAppLoading(false);
	}, []);
	return null;
};

export default EndFetchingData;
