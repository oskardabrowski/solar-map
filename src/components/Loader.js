import React, { useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { Grid } from "react-loader-spinner";
import { MapContext } from "./GlobalContext";

const Loader = () => {
	const loader = useRef();
	const { isAppLoading } = useContext(MapContext);
	useEffect(() => {
		if (isAppLoading) {
			loader.current.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
		} else {
			setTimeout(() => {
				loader.current.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0 100%)";
				setTimeout(() => {
					loader.current.style.clipPath =
						"polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
				}, 510);
			}, 1000);
		}
	}, [isAppLoading]);
	return (
		<LoadContainer ref={loader}>
			<Grid color="#001f45" width={150} height={150} />
		</LoadContainer>
	);
};

export default Loader;

const LoadContainer = styled.div`
	width: 100%;
	height: 100vh;
	position: absolute;
	z-index: 10000000;
	background-color: white;
	overflow: hidden;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	transition: all 0.5s ease-in-out;
`;
