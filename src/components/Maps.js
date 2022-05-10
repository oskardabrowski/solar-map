import { SiOpenstreetmap } from "react-icons/si";
import { RiMapFill } from "react-icons/ri";
import { MdInsertPhoto } from "react-icons/md";

const AllMaps = {
  baseMaps: [
    {
      code: "default",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      attributionCode: (
        <>
          &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>{" "}
          contributors
        </>
      ),
      name: "Open Street Map",
      ico: <SiOpenstreetmap className="Map-tile-desc-ico" />,
    },
    {
      code: "topo",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      attributionCode: (
        <>
          Map data: &copy;{" "}
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
          contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map
          style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (
          <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>
          )
        </>
      ),
      name: "Open Topo Map",
      ico: <SiOpenstreetmap className="Map-tile-desc-ico" />,
    },
    {
      code: "cartodbdark",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      attributionCode: (
        <>
          &copy;{" "}
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>
        </>
      ),
      name: "Carto DB Dark",
      ico: <RiMapFill className="Map-tile-desc-ico" />,
    },
    {
      code: "cartodbvoyager",
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      attributionCode: (
        <>
          &copy;{" "}
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>
        </>
      ),
      name: "Carto DB Voyager",
      ico: <RiMapFill className="Map-tile-desc-ico" />,
    },
    {
      code: "cartodbpositron",
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      attributionCode: (
        <>
          &copy;{" "}
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>
        </>
      ),
      name: "Carto DB Positron",
      ico: <RiMapFill className="Map-tile-desc-ico" />,
    },
    {
      code: "stamentonerlite",
      url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png",
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      attributionCode: (
        <>
          Map tiles by <a href="http://stamen.com">Stamen Design</a>,{" "}
          <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>{" "}
          &mdash; Map data &copy;{" "}
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
          contributors
        </>
      ),
      name: "Stamen Toner Lite",
      ico: <RiMapFill className="Map-tile-desc-ico" />,
    },
    {
      code: "esriworldimagery",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      attributionCode: (
        <>
          Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX,
          GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User
          Community
        </>
      ),
      name: "Esri World Imagery",
      ico: <MdInsertPhoto className="Map-tile-desc-ico" />,
    },
  ],
  layers: [
    {
      code: "Roofs",
      url: "http://localhost:8080/Tiles/SolarRasterRoofs512/{z}/{x}/{y}.png",
      googleDrive:
        "https://drive.google.com/drive/folders/1sNAxT60z-XXNc5zr2Ts0fhbY3HPMG8fi?usp=sharing/SolarRasterRoofs512/{z}/{x}/{y}.png",
      name: "Klasyfikacja dachów",
      ico: <RiMapFill className="Map-tile-desc-ico" />,
    },
    {
      code: "All",
      url: "http://localhost:8080/Tiles/SolarRasterAll256/{z}/{x}/{y}.png",
      googleDrive: "",
      name: "Klasyfikacja powierzchni",
      ico: <RiMapFill className="Map-tile-desc-ico" />,
    },
    {
      code: "GradientAll",
      url: "http://localhost:8080/Tiles/SolarRasterAllGradient256/{z}/{x}/{y}.png",
      googleDrive: "",
      name: "Gradient powierzchni",
      ico: <RiMapFill className="Map-tile-desc-ico" />,
    },
    {
      code: "SkyView",
      url: "http://localhost:8080/Tiles/SkyViewMap256/{z}/{x}/{y}.png",
      googleDrive: "",
      name: "Widoczność nieba",
      ico: <RiMapFill className="Map-tile-desc-ico" />,
    },
  ],
};

export default AllMaps;
