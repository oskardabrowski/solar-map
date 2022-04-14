import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {IoLayers, IoSearch, IoMap, IoImages} from 'react-icons/io5';
import {BsArrowLeftShort, BsArrowRightShort, BsFillInfoCircleFill} from 'react-icons/bs';
import {RiMapFill} from 'react-icons/ri';
import {AiFillTool} from 'react-icons/ai';
import {MdInsertPhoto, MdPhoto} from 'react-icons/md';
import {GrThreeDEffects} from 'react-icons/gr';
import {SiThreedotjs, SiOpenstreetmap} from 'react-icons/si';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { MapContext } from './GlobalContext';

const Menu = () => {
    const {setSkyHDR, setMapTile, setSolarTile, mapType, setMapType} = useContext(MapContext);
    const [show, setShow] = useState(false);
    const [activePanel, setActivePanel] = useState('');
    const AllPanels = document.querySelectorAll('.PanelData');
    useEffect(() => {setShow(!show)}, [])
    const PanelHandler = async (target) => {
        await AllPanels.forEach(el => {
            el.style.clipPath = 'circle(0% at 0 0)';
        });
        AllPanels.forEach((el) => {
            let classArr = []
            el.classList.forEach(el => classArr.push(el));
            if(classArr.includes(target) && target !== activePanel) {
                setActivePanel(target);
                el.style.clipPath = 'circle(145% at 0 0)';
            } else if (classArr.includes(target) && target === activePanel) {
                setActivePanel('');
                el.style.clipPath = 'circle(0% at 0 0)';
            }
        })
    }
    return (
        <MenuBar>
            <div className="hideShow">
                <button onClick={() => setShow(!show)}>
                    {show ? <BsArrowLeftShort /> : <BsArrowRightShort />}
                </button>
            </div>
            {show && mapType === '2D' ? <div className="buttons">
                <button className="buttons-btn" onClick={() => PanelHandler('PanelSearch')}>
                    <IoSearch />
                    <div className='buttons-btn-desc'>
                        <span>Wyszukaj daną lokalizację</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('Layers')}>
                    <IoLayers />
                    <div className='buttons-btn-desc'>
                        <span>Warstwy tematyczne</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('Tools')}>
                    <AiFillTool />
                    <div className='buttons-btn-desc'>
                        <span>Narzędzia</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('Map')}>
                    <IoMap />
                    <div className='buttons-btn-desc'>
                        <span>Mapy bazowe</span>
                    </div>
                </button>
                <Link to="/model" onClick={() => setMapType('3D')} className="buttons-btn">
                    <SiThreedotjs />
                    <div className='buttons-btn-desc'>
                        <span>Wersja trójwymiarowa</span>
                    </div>
                </Link>
                <button className="buttons-btn">
                    <BsFillInfoCircleFill />
                    <div className='buttons-btn-desc'>
                        <span>Informacje</span>
                    </div>
                </button>
            </div>: ''}
            {show && mapType === '3D' ? <div className="buttons">
                <button className="buttons-btn" onClick={() => PanelHandler('Models')}>
                    <IoLayers />
                    <div className='buttons-btn-desc'>
                        <span>Modele</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('Photos')}>
                    <IoImages />
                    <div className='buttons-btn-desc'>
                        <span>Zdjęcia w tle</span>
                    </div>
                </button>
                <button className="buttons-btn" onClick={() => PanelHandler('3DTools')}>
                    <AiFillTool />
                    <div className='buttons-btn-desc'>
                        <span>Narzędzia</span>
                    </div>
                </button>
                <Link to="/" onClick={() => setMapType('2D')} className="buttons-btn">
                    <IoMap />
                    <div className='buttons-btn-desc'>
                        <span>Wersja dwuwymiarowa</span>
                    </div>
                </Link>
                <button className="buttons-btn">
                    <BsFillInfoCircleFill />
                    <div className='buttons-btn-desc'>
                        <span>Informacje</span>
                    </div>
                </button>
            </div>: ''}
            <div className="PanelData Panel Models">
                Here is models panel
            </div>
            <div className="PanelData Panel Photos">
                <button className="Map-tile" onClick={() => setSkyHDR('Terrain')}>
                    <MdPhoto className="Map-tile-ico" />
                    <span>Domyślny</span>
                </button>
                <button className="Map-tile" onClick={() => setSkyHDR('Sunflowers')}>
                    <MdPhoto className="Map-tile-ico" />
                    <span>Zachmurzony</span>
                </button>
                <button className="Map-tile" onClick={() => setSkyHDR('Clear')}>
                    <MdPhoto className="Map-tile-ico" />
                    <span>Czysty</span>
                </button>
            </div>
            <div className="PanelData Panel 3DTools">
                Here is 3D Tools panel
            </div>
            <div className="PanelData PanelSearch">
                <h2>Wpisz szukany adres:</h2>
                <form>
                    <input type="text" />
                    <button><IoSearch /></button>
                </form>
            </div>
            <div className="PanelData Panel Layers">
                <button className="Map-tile" onClick={() => setSolarTile('Roofs')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Dachy</span>
                </button>
                <button className="Map-tile" onClick={() => setSolarTile('All')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Całościowe</span>
                </button>
                <button className="Map-tile" onClick={() => setSolarTile('Static')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Statyczne</span>
                </button>
                <button className="Map-tile" onClick={() => setSolarTile('HQ')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>HQ</span>
                </button>
            </div>
            <div className="PanelData Panel Tools">here is tools</div>
            <div className="PanelData Panel Map">
                <button className="Map-tile" onClick={() => setMapTile('default')}>
                    <SiOpenstreetmap className="Map-tile-ico" />
                    <span>Open Street Map</span>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('topo')}>
                    <SiOpenstreetmap className="Map-tile-ico" />
                    <span>Open Topo Map</span>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('cartodbpositron')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Carto DB Positron</span>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('cartodbdark')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Carto DB Dark</span>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('cartodbvoyager')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Carto DB Voyager</span>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('stamentonerlite')}>
                    <RiMapFill className="Map-tile-ico" />
                    <span>Stamen Toner Lite</span>
                </button>
                <button className="Map-tile" onClick={() => setMapTile('esriworldimagery')}>
                    <MdInsertPhoto className="Map-tile-ico" />
                    <span>Esri World Imagery</span>
                </button>
            </div>
        </MenuBar>
    )
}

export default Menu

const MenuBar = styled.div`
display: flex;
flex-direction: row-reverse;
position: relative;
z-index: 100000;
box-shadow: 2px 0px 5px rgba(0,0,0,.25);

.Map {
    &-tile {
        width: 100%;
        font-size: 1.2rem;
        margin: 0.5rem 0rem;
        display: flex;
        align-items: center;
        justify-content: left;
        border: none;
        background:none;
        transition: all .5s ease-in-out;

        &-ico {
            font-size: 1.5rem;
            margin: 0.25rem;
        }

        &:hover {
            cursor: pointer;
            background-color: #A5DFFF;
        }
    }
}

.PanelSearch {
    position: absolute;
    left: 100%;
    width: 600%;
    height: 17.5%;
    background-color: white;
    transition: all .5s ease-in-out;
    clip-path: circle(0% at 0 0);
    min-width: 22rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h2 {
        margin: 1rem 0rem;
        width: 85%;
        font-family: 'Work Sans';
        /* background-color: red; */
    }
    & > form {
        width: 85%;
        position: relative;
        /* background-color: red; */
        & > h2 {

        }
        & > input {
            width: 100%;
            padding: .35rem;
            border-radius: 25px;
            border: 1px solid black
        }

        & > button {
            position: absolute;
            background: #001F45;
            border: none;
            color: white;
            padding: .25rem;
            border-radius: 50%;
            width: 1.85rem;
            height: 1.85rem;
            display: flex;
            align-items: center;
            justify-content: center;
            top: .05rem;
            right: -.8rem;
            font-size: 1.2rem;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
.Panel {
    position: absolute;
    left: 100%;
    width: 500%;
    height: 100%;
    background-color: white;
    transition: all .5s ease-in-out;
    clip-path: circle(0% at 0 0);
    min-width: 17.5rem;
}
.hideShow {
    & > button {
        height: 100%;
        background: none;
        border: none;
        font-size: .75rem;
        border-left: 1px solid #CFCFCF;
        border-right: 1px solid #CFCFCF;
        transition: all .5s ease-in-out;

        &:hover {
            cursor: pointer;
            background: #CFCFCF;
        }
    }
}
.buttons {
    display: flex;
    flex-direction: column;
    transition: all .5s ease-in-out;

    &-btn {
        background: none;
        border: none;
        font-size: 1.75rem;
        margin: .5rem;
        position: relative;
        color: black;

        &-desc {
            position: absolute;
            width: max-content;
            top: 0;
            left: 4rem;
            font-size: 1rem;
            background-color: white;
            padding: .5rem;
            border-radius: 15px 15px 15px 0px;
            clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
            font-family: 'Work Sans';
        }

        &:hover {
            cursor: pointer;
            .buttons-btn-desc {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            }
        }
    }
}

`;
