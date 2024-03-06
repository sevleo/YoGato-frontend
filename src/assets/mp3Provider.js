import boatstraightlegs from "./poses_audios/boatstraightlegs.mp3";
import bow from "./poses_audios/bow.mp3";
import bridge from "./poses_audios/bridge.mp3";
import butterfly from "./poses_audios/butterfly.mp3";
import camel from "./poses_audios/camel.mp3";
import cat from "./poses_audios/cat.mp3";
import chair from "./poses_audios/chair.mp3";
import child from "./poses_audios/child.mp3";
import corpse from "./poses_audios/corpse.mp3";
import cow from "./poses_audios/cow.mp3";
import highlunge from "./poses_audios/highlunge.mp3";
import standingstretch from "./poses_audios/standingstretch.mp3";
import tree from "./poses_audios/tree.mp3";
import crow from "./poses_audios/crow.mp3";
import dolphin from "./poses_audios/dolphin.mp3";
import plank from "./poses_audios/plank.mp3";
import downdog from "./poses_audios/downdog.mp3";
import eagle from "./poses_audios/eagle.mp3";
import extendedhandtotoe from "./poses_audios/extendedhandtotoe.mp3";
import extendedsideangle from "./poses_audios/extendedsideangle.mp3";
import forearmstand from "./poses_audios/forearmstand.mp3";
import forwardfoldshoulderstretch from "./poses_audios/forwardfoldshoulderstretch.mp3";
import squat from "./poses_audios/squat.mp3";
import boatbentlegs from "./poses_audios/boatbentlegs.mp3";
import seatedspinaltwist from "./poses_audios/seatedspinaltwist.mp3";
import halfmoon from "./poses_audios/halfmoon.mp3";
import handstand from "./poses_audios/handstand.mp3";
import kingpigeon from "./poses_audios/kingpigeon.mp3";
import lotus from "./poses_audios/lotus.mp3";
import lowlunge from "./poses_audios/lowlunge.mp3";
import pigeon from "./poses_audios/pigeon.mp3";
import plow from "./poses_audios/plow.mp3";
import pyramid from "./poses_audios/pyramid.mp3";
import reverswarrior from "./poses_audios/reverswarrior.mp3";
import seatedforwardfold from "./poses_audios/seatedforwardfold.mp3";
import standingforwardfold from "./poses_audios/standingforwardfold.mp3";
import triangle from "./poses_audios/triangle.mp3";
import updog from "./poses_audios/updog.mp3";
import warrior1 from "./poses_audios/warrior1.mp3";
import warrior3 from "./poses_audios/warrior3.mp3";
import warrior2 from "./poses_audios/warrior2.mp3";
import wheel from "./poses_audios/wheel.mp3";
import wildthing from "./poses_audios/wildthing.mp3";
import shoulderstand from "./poses_audios/shoulderstand.mp3";
import sideplank from "./poses_audios/sideplank.mp3";
import straddlesplit from "./poses_audios/straddlesplit.mp3";
import sphinx from "./poses_audios/sphinx.mp3";
import splits from "./poses_audios/splits.mp3";

const poseAudios = {
  boatstraightlegs,
  bow,
  bridge,
  butterfly,
  camel,
  cat,
  chair,
  child,
  corpse,
  cow,
  highlunge,
  standingstretch,
  tree,
  crow,
  dolphin,
  plank,
  downdog,
  eagle,
  extendedhandtotoe,
  extendedsideangle,
  forearmstand,
  forwardfoldshoulderstretch,
  squat,
  boatbentlegs,
  seatedspinaltwist,
  halfmoon,
  handstand,
  kingpigeon,
  lotus,
  lowlunge,
  pigeon,
  plow,
  pyramid,
  reverswarrior,
  seatedforwardfold,
  standingforwardfold,
  triangle,
  updog,
  warrior1,
  warrior3,
  warrior2,
  wheel,
  wildthing,
  shoulderstand,
  sideplank,
  straddlesplit,
  sphinx,
  splits,
};

function mp3Provider(poseName) {
  return poseAudios[poseName] || null;
}

export default mp3Provider;
