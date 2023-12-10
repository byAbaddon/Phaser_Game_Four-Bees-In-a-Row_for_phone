import {Scene} from'phaser';
import * as fnc from '../index.js';
import {cfg} from '../index.js'


export class IntroScene extends Scene {
  constructor() {
    super('IntroScene')
  }

  init() {
    console.log('IntroScene was loading...')
  }

  preload() {
    //============================(((LOAD GLOBAL DATA)))================================

    //#region ------------------------------(((LOAD AUDIO)))---------------------
    // this.load.audio('bgIntro', '/assets/sounds/background/bgIntro.mp3')
    this.load.audio('btnStartClick', '/assets/sounds/effects/btnClick/click0.wav')
    this.load.audio('figure', '../assets/sounds/effects/items/figureUP.wav')
   
    //#endregion ------------------------------------------------------------------
   
    //#region -------------------------------((((LOAD IMAGES)))) -----------------
    //---bg
    this.load.image('bgIntro', '../assets/images/backgrounds/bgIntro.png')

    //---logo figure
    this.load.image('figureLogoOne', '/assets/images/logo/green.png')

    //---sun rays
    this.load.image('sunRays', '../assets/images/planets/sunRays1.png')

    //control buttons
    this.load.spritesheet('controlButtons', '../assets/images/buttons/longBtn_470_170.png',
      { frameWidth: 470, frameHeight: 170, startFrame: 0, endFrame: 5 })

    //emoticons
    this.load.spritesheet('emoticon', '../assets/images/icons/spriteEmotion_72.png', {
        frameWidth: 72,
        frameHeight: 72,
        startFrame: 0,
        endFrame: 96
      })

    
   //#endregion
   
  }
 

  create() {
    //#region  -------------------------------((((add AUDIO))))-----------------------------
   
    // this.soundBgIntro = fnc.createAudio(this, 'bgIntro', 0.5, true)
    // check is bg music not play, start music
    // if (!this.sound.getAllPlaying().length) this.soundBgIntro.play()
      
    this.soundBtnStartClick = () => fnc.createAudio(this, 'btnStartClick').play()
    this.sound.add('figure', { delay: 0.5 }).play()
    
    //#endregion ------------------------------------------------------

    //#region --------------------------------((((add IMAGES)))) --------------------------
    
    //---------------- add background by black color
    // this.cameras.main.setBackgroundColor('#000000')
    //---bg
    this.add.image( 0, 0,'bgIntro').setOrigin(0,0)

    //---logo Figure
    this.figureLogo = this.add.image(cfg.width / 4 + 120, cfg.height / 2, 'figureLogoOne')
      .setOrigin(0, 0)
      .setScale(0.85)
      .setAngle(45)
  
    
    //sunRays
    this.sunRays = this.add.image(cfg.width / 2, cfg.height / 2, 'sunRays')

    //create circle
    this.add.circle(cfg.width / 2, cfg.height / 2, 105,'black').setDepth(1)


    // ------------------------------buttons
    this.btnMenu = this.add.image(cfg.width / 2, cfg.height - 110, 'controlButtons', 1).setScale(0.4, 0.5)
   
    //---start btn label
    fnc.createText(this, cfg.width / 2 - 45, cfg.height - 120, 'MENU', 26)
      
    //---start menu label
    this.subTitleText = fnc.createText(this, cfg.width / 4, cfg.height - 50, 'Press button to Menu', 16)
    
    //---emo icon
    this.emo = this.add.image(cfg.width / 2, cfg.height / 2, 'emoticon', 0)
      .setScale(2.2).setDepth(2)

    //#endregion  -----------------------------------------------

    //#region --------------------------------((((add TEXT))))------------------------------
    //---title text
    this.titleText = fnc.createText(this, 15, 50, 'Three games for\n\b two players', 40)
      .setStroke('crimson', 12)
    
    //#endregion -------------------------------------------------------

    //#region ---------------------------------((((Code))))-----------------------
    this.btnMenu.setInteractive({ cursor: 'pointer' })                      //    write direct css command  in   setInteractive()
      .on('pointerover', () => this.btnMenu.setTint(0xe0e0e0))
      .on('pointerout', () => this.btnMenu.setTint(0xffffff))
      .on('pointerdown', () => {
        this.anims.remove('flyAnimationLogo')
        this.anims.anims.clear()
        //play sound
        this.soundBtnStartClick()
        setTimeout(() => this.scene.start('MenuScene'), 100)
      })

    //#endregion ---------------------------------------------------------------
    
    //#region ---------------------------------((((Animations))))-------------------

    //-------------------------------Tween Animations
    // fnc.tweenAnimation.createTextChangeColorAnimation(this, this.titleText.name)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, this.subTitleText, 100, 550, -1, 500, true)
   
    //logo animation
    this.tweens.add({
      targets: this.figureLogo,
      delay: 0,
      scale: { from: 0, to: 0.85 },
      duration: 3000,
      ease: 'Back',
      complete: () => {
        fnc.tweenAnimation.createRotateAnimation(this, this.figureLogo)
      }
    })
  

    //sun rays animation
    this.tweens.add({
      targets: this.sunRays,
      delay: 0,
      angle: -360, // full rotation
      duration: 15000,
      ease: 'Linear',
      repeat: -1,
      yoyo: true,    
    })


  //emo animation
  this.tweens.add({
    targets: this.emo,
    loop:-1,
    loopDelay: 3000,
    onLoop: () => {
        this.emo.setTexture('emoticon', Phaser.Math.Between(0, 90));
  }
  })


    //text animation
    this.tweens.add({
      targets: this.titleText,
      delay: 0,
      alpha: { from: 0.6, to: 1 },
      duration: 5000,
      ease: 'Back', 
      yoyo: true,
      repeat: -1,
    })

    //#endregion --------------------------------------------------------------
    
  //=================(((grid create for dev test)))==============
  // fnc.createGridSystem(this)
  
  }

};
