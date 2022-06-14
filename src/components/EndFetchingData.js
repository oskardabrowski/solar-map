import React, { useEffect, useContext } from "react";
import { MapContext } from "./GlobalContext";

const EndFetchingData = () => {
	const context = useContext(MapContext);
	console.log(context);
	const { isAppLoading, setIsAppLoading } = useContext(MapContext);

	useEffect(() => {
		setIsAppLoading(false);
	}, []);
	return null;
};

export default EndFetchingData;
