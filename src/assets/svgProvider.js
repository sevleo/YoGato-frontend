import boatstraightlegs from "./poses_images/boatstraightlegs.svg";
import bow from "./poses_images/bow.svg";

function svgProvider(poseName) {
  switch (poseName) {
    case "boatstraightlegs":
      return boatstraightlegs;
    case "bow":
      return bow;
  }
}

export default svgProvider;
