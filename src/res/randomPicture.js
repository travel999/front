import one from "./img/LsizeBackG/back01.jpg";
import two from "./img/LsizeBackG/back02.jpg";
import three from "./img/LsizeBackG/back03.jpg";
import four from "./img/LsizeBackG/back04.jpg";
import five from "./img/LsizeBackG/back05.jpg";
import six from "./img/LsizeBackG/back06.jpg";
import seven from "./img/LsizeBackG/back07.jpg";
import eight from "./img/LsizeBackG/back08.jpg";
import nine from "./img/LsizeBackG/back09.jpg";
import ten from "./img/LsizeBackG/back10.jpg";
import eleven from "./img/LsizeBackG/back11.jpg";
import twelve from "./img/LsizeBackG/back12.jpg";
import thirteen from "./img/LsizeBackG/back13.jpg";
import fourteen from "./img/LsizeBackG/back14.jpg";
import fifteen from "./img/LsizeBackG/back15.jpg";

import Sone from "./img/SsizeBackG/smallBack01.jpg";
import Stwo from "./img/SsizeBackG/smallBack02.jpg";
import Sthree from "./img/SsizeBackG/smallBack03.jpg";
import Sfour from "./img/SsizeBackG/smallBack04.jpg";
import Sfive from "./img/SsizeBackG/smallBack05.jpg";
import Ssix from "./img/SsizeBackG/smallBack06.jpg";
import Sseven from "./img/SsizeBackG/smallBack07.jpg";
import Seight from "./img/SsizeBackG/smallBack08.jpg";

const bic = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  fourteen,
  fifteen,
];
const Small = [Sone, Stwo, Sthree, Sfour, Sfive, Ssix, Sseven, Seight];

export const randomPic = (idx) => {
  // const chosenImage = bic[Math.floor(Math.random() * bic.length)];
  const returnNum = Math.abs(idx % bic.length);
  return bic[returnNum];
};

export const randomSpic = (idx) => {
  const returnNum = Math.abs(idx % Small.length);
  return Small[returnNum];
};

export const randomSpic2 = (idx) => {
  const returnNum = Math.abs((idx + 4) % Small.length);
  return Small[returnNum];
};
