import bookmark_selected from '../assets/icons/bookmark_selected.png';
import bookmark_hover from '../assets/icons/bookmark_hover.png';
import bookmark_unselected from '../assets/icons/bookmark_unselected.png';
import search_black from '../assets/icons/search_black.png';
import search_white from '../assets/icons/search_white.png';
import app_logo from '../assets/icons/app_logo.png';

import route_not_found from '../assets/images/404-error.png';
import server_down from '../assets/images/server-down.jpg';
import no_internet from '../assets/images/no_internet.png';
import food_background from '../assets/images/food-background-1.jpg';

import loadingGif from '../assets/gifs/loader.gif';
import loadingSVG from '../assets/gifs/loader.svg';


const colorCodes: Object = {
  default: '#151f2d',
};

const icons = {
  bookmark_selected,
  bookmark_hover,
  bookmark_unselected,
  search_black,
  search_white,
  app_logo,
};

const images = {
  route_not_found,
  server_down,
  no_internet,
  food_background,
};

const gifs = {
  loadingGif,
};
const svgs = {
  loadingSVG,
};

const randomColorGenerator: any = () => {
  const colors = [
    '#2C3639',
    '#395B64',
    '#774360',
    '#B25068',
    '#51557E',
    '#A27B5C',
    '#E7AB79',
    '#A91079',
    '#816797',
    '#C74B50',
    '#570530',
    '#04293A',
    '#064663',
    '#A13333',
    '#864879',
    '#1E5128',
    '#3D2C8D',
    '#B42B51',
    '#334756',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export {colorCodes, icons, randomColorGenerator, images, gifs, svgs};

