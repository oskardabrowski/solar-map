import React from 'react';
import styled from 'styled-components';
import AppLogo from '../images/SolarMapLogo.svg';
import UnivesityLogo from '../images/UMKAkronimLogo.svg';

const Head = styled.header`
width: 100%;
background-color: #001F45;
height: auto;
display: flex;
justify-content: space-between;
& > img {
    height: 2.5rem;
    margin: 1rem;
    width: auto;
}

`;



const Header = () => {
    return (
        <Head>
            <img className="AppLogo" src={AppLogo} alt={AppLogo} />
            <img className="UniversityLogo" src={UnivesityLogo} alt={UnivesityLogo} />
        </Head>
    )
}

export default Header
