import one from "../../res/img/LsizeBackG/back0.jpg";
import two from "../../res/img/LsizeBackG/back01.jpg";
import three from "../../res/img/LsizeBackG/back03.jpg";
import four from "../../res/img/LsizeBackG/back04.jpg";
import five from "../../res/img/LsizeBackG/back05.jpg";
import six from "../../res/img/LsizeBackG/back06.jpg";
import seven from "../../res/img/LsizeBackG/back07.jpg";
import eight from "../../res/img/LsizeBackG/back08.jpg";
import nine from "../../res/img/LsizeBackG/back09.jpg";
import ten from "../../res/img/LsizeBackG/back10.jpg";
import eleven from "../../res/img/LsizeBackG/back11.jpg";
import twelve from "../../res/img/LsizeBackG/back12.jpg";
import thirteen from "../../res/img/LsizeBackG/back13.jpg";
import fourteen from "../../res/img/LsizeBackG/back14.jpg";
import fifteen from "../../res/img/LsizeBackG/back15.jpg";

import Sone from "../../res/img/SsizeBackG/smallBack01.jpg";
import Stwo from "../../res/img/SsizeBackG/smallBack02.jpg";
import Sthree from "../../res/img/SsizeBackG/smallBack03.jpg";
import Sfour from "../../res/img/SsizeBackG/smallBack04.jpg";
import Sfive from "../../res/img/SsizeBackG/smallBack05.jpg";
import Ssix from "../../res/img/SsizeBackG/smallBack06.jpg";
import Sseven from "../../res/img/SsizeBackG/smallBack07.jpg";
import Seight from "../../res/img/SsizeBackG/smallBack08.jpg";

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

export const RandomPic = (idx) => {
  // const chosenImage = bic[Math.floor(Math.random() * bic.length)];
  const returnNum = Math.abs(idx % bic.length);
  return bic[returnNum];
};

export const RandomSpic = (idx) => {
  const returnNum = Math.abs(idx % Small.length);
  return Small[returnNum];
};

export const RandomSpic2 = (idx) => {
  const returnNum = Math.abs((idx + 4) % Small.length);
  return Small[returnNum];
};
