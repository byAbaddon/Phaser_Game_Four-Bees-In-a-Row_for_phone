import style from "./main.css";
import Phaser, { Game } from 'phaser';
import loadMultiImages from "./functions/loadMultiImages";
import createAudio from "./functions/createAudio";
import createText from "./functions/createText";
import createGridSystem from "./functions/createGridSystem";
import * as animation from "./functions/createAnimation";
import * as tweenAnimation from "./functions/createTween";
import checkOrientation from "./functions/checkOrientation";

import { LoadScene } from "./scenes/loadScene";
import { IntroScene } from "./scenes/introScene";
import { MenuScene } from "./scenes/menuScene";
import { ReloadScene } from "./scenes/reloadScene";
import { CreditsScene } from "./scenes/creditsScene";
import { GameScene } from "./scenes/gameScene";
import { GameSceneTwo } from "./scenes/gameSceneTwo";
import { GameSceneThree } from "./scenes/gameSceneThree";



const cfg = {
  width:  480, // window.innerWidth,  
  height: 960,  //window.innerHeight, 
  orientation: 'portrait', // set phone orientation  (portrait - vertical, landscape - horizontal)
  forceOrientation: true,
  backgroundColor: 'rgb(0, 0, 0)', //'rgb(0,0,100)'
  type: Phaser.AUTO,
  parent: 'game',
  scene: [GameSceneThree, GameSceneTwo, GameScene, LoadScene, IntroScene,MenuScene,  CreditsScene,ReloadScene,],
  physics: {
    default: 'arcade',
    arcade: {
      debug: !true, //false default
      gravity: { y: 160 }, // default gravity
    }
  },
  scale: {
    //  mode: Phaser.Scale.RESIZE,  // no back field but increase image
    // mode: Phaser.Scale.FIT,  // back field but correct proportion image
    mode: Phaser.Scale.SHOW_ALL, // best solution
    // mode: Phaser.Scale.PORTRAIT, // vertical orientation screen
    // mode: Phaser.Scale.LANDSCAPE, // vertical orientation screen
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH 
  },
  dom: {
    createContainer: true
  },
  global: {
    typeOfGame: 'one',
    round : 1,
    playTime: 0,
    wins:  0,
    winsP2:  0,
    ties:  0,
    losses:  0,
    lossesP2:  0,
    globalDataJSON: null, // Set initial JSON value to null
    globalImages: null, 
    isPausedSound: false,
  }
};

const game = new Phaser.Game(cfg)


export {
  cfg,
  createGridSystem,
  loadMultiImages,
  createAudio,
  createText,
  animation,
  tweenAnimation,
  checkOrientation,
}

