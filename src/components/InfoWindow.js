import React, { useContext } from "react";
import { MapContext } from "./GlobalContext";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const InfoWindow = () => {
  const { setInfoOpen } = useContext(MapContext);
  return (
    <Window>
      <div className="Info">
        <div className="Info-header">
          <div>Informacje o aplikacji</div>
          <button onClick={() => setInfoOpen(false)}>
            <IoMdClose />
          </button>
        </div>
        <div className="Info-content">
          <p>Window created to display info about app</p>
          <p>Test paragraphs</p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
          <p>
            Et extra and aroma a single shot brewed extraction barista
            caramelization. Variety mazagran cultivar, flavour skinny steamed at
            and arabica café au lait. Turkish shop, affogato single shot, rich
            cup, coffee, eu extraction milk to go coffee. Americano crema
            mazagran est eu steamed whipped. Trifecta, steamed blue mountain cup
            extra macchiato filter. Seasonal, spoon flavour, steamed, fair trade
            black, strong filter whipped cappuccino brewed. Aromatic, barista,
            dark café au lait redeye at chicory cream single origin coffee.
            Pumpkin spice at macchiato aromatic cortado grounds variety barista.
            Wings, brewed chicory, doppio, mug grounds coffee espresso blue
            mountain grounds carajillo. A, macchiato, id a id, sit est grounds
            est trifecta aroma white.
          </p>
        </div>
      </div>
    </Window>
  );
};

export default InfoWindow;

const Window = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1000000000000;

  display: flex;
  align-items: center;
  justify-content: center;

  .Info {
    background-color: white;
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    overflow: hidden;

    &-header {
      width: 100%;
      background-color: white;
      height: 7.5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div {
        margin: 0rem 1rem;
        font-family: "Work Sans";
        font-size: 1.1rem;
      }
      & > button {
        margin: 0rem 1rem;
        font-size: 1.35rem;
        border: none;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          cursor: pointer;
        }
      }
    }
    &-content {
      width: 100%;
      background-color: white;
      height: 92.5%;
      font-family: "Roboto";
      overflow-y: scroll;
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        background: #888;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
  }
`;
