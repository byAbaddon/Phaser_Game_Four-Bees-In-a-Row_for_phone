import {Scene} from'phaser';
import * as fnc from '../index.js';
import {cfg} from '../index.js'
import { GameScene } from "./gameScene.js";
import { GameSceneTwo } from './gameSceneTwo.js'
import { GameSceneThree } from './gameSceneThree.js'


export class ReloadScene extends Scene {
  constructor() {
    super('ReloadScene')
  }
  init() {
    console.log('GameScene was loading...')
    // this.game.sound.stopAll()
    // this.events.removeAllListeners()    //remove all events from Scene
    this.input.enabled = false;            // disable all click events on this Scene
  }

  preload() {
    //#region ------------------------------------((((load IMAGE)))) --------------------------------------
    this.load.image('bee', '../assets/images/icons/bee.png')
    this.load.image('spider', '../assets/images/icons/spider.png')
    this.load.image('manWomanSymbol', '../assets/images/icons/man_woman_symbol.png')
    //#endregion -------------------------------load Audio ------------------------------------

    //#region ------------------------------------((((load AUDIO)))) --------------------------------------
    //#endregion -------------------------------load Audio ------------------------------------
  }
 
  create() { 
    if (cfg.global.typeOfGame == 'one') {
      this.add.image(cfg.width / 2, cfg.height / 2, (Phaser.Math.Between(0, 1) == 0) ? 'bee' : 'spider')
    } else if (cfg.global.typeOfGame == 'two') {
        this.add.image(cfg.width / 2 , cfg.height / 2, 'manWomanSymbol').setScale(1)
    } else {
        this.add.image(cfg.width / 2 , cfg.height / 2, 'manWomanSymbol').setScale(1)
    }
    
    // this.cameras.main.setBackgroundColor('#ff0000')
    // fnc.tweenAnimation.transitionBetweenScene(this, cfg)
    fnc.createText(this, 110, cfg.height - 240, 'LOADING...', 45,)
      .setStroke('blue', 8).setAlpha(.9)
    
    //remove and add scene again to reset all level
    this.anims.anims.clear();

    let scene;
    let cls;
    if (cfg.global.typeOfGame == 'one') { 
      scene = 'GameScene'
      cls = GameScene
    } else if (cfg.global.typeOfGame == 'two') {
      scene = 'GameSceneTwo'
      cls = GameSceneTwo
    } else {
      scene = 'GameSceneThree'
      cls = GameSceneThree
    }

    setTimeout(() => this.scene.remove(scene), 100);     
    setTimeout(() => this.scene.add(scene, cls), 200);    
    setTimeout(() => this.scene.start(scene, cls), 500);


    //=====================(((grid create for dev test)))===========
    // fnc.createGridSystem(this)
  }

  update(time, delta) {}
}

