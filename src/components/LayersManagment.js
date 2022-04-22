import React from 'react';
import styled from 'styled-components';

const LayersManagment = () => {
  const DragAndMove = (e) => {
    const MovingElement = e.target;
    MovingElement.style.top = '100px';
    MovingElement.style.right = '20px';

  }
  return (
    <LMWindow onMouseDown={(e) => DragAndMove(e)}>
        something
    </LMWindow>
  )
}

const LMWindow = styled.div`
position: absolute;
top: 80px;
right: 10px;
width: 10rem;
height: 25rem;
z-index: 10000;
background-color: white;



`;



export default LayersManagment