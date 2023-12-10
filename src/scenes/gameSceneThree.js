import { Scene} from 'phaser'
import * as fnc from '../index.js';
import {cfg} from '../index.js'


export class GameSceneThree extends Scene {
  constructor() {
    super('GameSceneThree')
  }


  init() {
    console.log('Welcome to GameScene 2...')
    // this.game.sound.stopAll() //stop all sounds
    cfg.global.typeOfGame = 'three'
    this.isCoinToss = false
    this.linePos = 0
    this.player = ''
    this.planetArray = []
    this.randomPlanetsArray = []
    this.manPts = 0
    this.womanPts = 0
    this.stepsCount = 0
    this.planetsObj = {
      Sun: { x: 225, y: 460, frame: 0 },
      Mercury: { x: 140, y: 360, frame: 1 },
      Venus: { x: 240, y: 300, frame: 2 },
      Earth: { x: 340, y: 360, frame: 3 },
      Mars: { x: 400, y: 457, frame: 4 },
      Jupiter: { x: 345, y: 558, frame: 5 },
      Saturn: { x: 240, y: 630, frame: 6 },
      Uranus: { x: 135, y: 560, frame: 7 },
      Neptune: { x: 80, y: 462, frame: 8 },
    }
  }

  preload() {

    //#region -----------------------------------((((Load IMAGE)))) --------------------------------------

    //flares
    this.load.atlas('confetti', '../assets/images/particles/confetti.png', '../assets/images/particles/confetti.json')

    //----------------backgrounds
    this.load.image('bgGameSky', '../assets/images/backgrounds/bgGameSky.png')

    //coin sprite
    this.load.spritesheet('coin', '../assets/images/coin/coinSprite2.png', {
      frameWidth: 160,
      frameHeight: 150,
      startFrame: 0,
      endFrame: 11
    })

    //------------------ buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')

    //---btnSound
    this.load.image('btnSound', '/assets/images/buttons/btnSound.png')
    //---btnNoSound
    this.load.image('btnNoSound', '/assets/images/buttons/btnNoSound.png')
    
    //btn sound multi images
    this.btnSoundSpriteImagesArray = fnc.loadMultiImages(this, 'btnSounds', '../assets/images/buttons/soundBtnSprite/', 4)

    //play button
    this.load.image('btnPlay', '../assets/images/buttons/playBtn.png')

    
    //---playerOne
    this.load.image('playerMan', '../assets/images/icons/playerMan2.png')
    this.load.image('playerWoman', '../assets/images/icons/playerWomen.png')
    
    //---players symbols

    this.load.image('manSymbol', '../assets/images/icons/manSymbol.png')
    this.load.image('womanSymbol', '../assets/images/icons/womanSymbol.png')

    //vs
    this.load.image('vs', '../assets/images/vs/1.png')


    //sun rays
    this.load.image('sunRays2', '../assets/images/planets/sunRays2.png')

    //planets sprite
    this.planetsSpriteArr = fnc.loadMultiImages(this, 'planet', '../assets/images/planets/sprite/', 9)

    //#endregion ------------------------------ load Images ----------------------------------------

    //#region ------------------------------------((((load AUDIO)))) --------------------------------------
    this.load.audio('bgGameSound3', '/assets/sounds/background/bgGame3.mp3')
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickPlaySound', '/assets/sounds/effects/btnClick/click0.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')
    this.load.audio('ticSound', '../assets/sounds/effects/items/tic.wav')
    this.load.audio('tacSound', '../assets/sounds/effects/items/tac.wav')
    this.load.audio('coinRotateSound', '../assets/sounds/effects/items/coin.wav')
    this.load.audio('gongSound', '../assets/sounds/effects/items/gong.mp3')
    this.load.audio('lineSound', '../assets/sounds/effects/items/line.mp3')
    this.load.audio('tieSound', '../assets/sounds/effects/items/tie.wav')
    this.load.audio('planetLight', '../assets/sounds/effects/items/figureUP.wav')
    this.load.audio('startGameSound', '../assets/sounds/effects/btnClick/clickStart.mp3')
    this.load.audio('planetWrongSound', '../assets/sounds/effects/items/wrong.wav')

    //#endregion -------------------------------load Audio ------------------------------------

  }

  create() {
    //#region ---------------------------------((((add AUDIO))))----------------------------- 
    this.soundBgGame = this.sound.add('bgGameSound3').setLoop(true)//.setVolume(0.3)
    this.soundBtnClickPlay = () => fnc.createAudio(this, 'btnClickPlaySound').play()
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    this.soundLevelComplete = () => fnc.createAudio(this, 'levelCompleteSound').play()
    this.soundTic = () => fnc.createAudio(this, 'ticSound').play()
    this.soundTac = () => fnc.createAudio(this, 'tacSound').play()
    this.soundCoinRotate = () => fnc.createAudio(this, 'coinRotateSound').play()
    this.soundGong = () => fnc.createAudio(this, 'gongSound').play()
    this.soundLine = () => fnc.createAudio(this, 'lineSound').play()
    this.soundTie = () => fnc.createAudio(this, 'tieSound').play()
    this.soundPlanetLight = () => fnc.createAudio(this, 'planetLight').play()
    this.soundPlanetWrong = () => fnc.createAudio(this, 'planetWrongSound').play()
    this.soundStartGame = () => fnc.createAudio(this, 'startGameSound').play()
    // #endregion --------------------------------Audio------------------------------------------


    //#region -----------------------------------((((IMAGE)))) -------------------------------------------

    //create bg
    // this.bg = this.add.tileSprite(0, 0, 'bg').setOrigin(0, 0)//.setFlipY(true)
    this.bg = this.add.tileSprite(0, 0, cfg.width, this.cloudHeight, 'bgGameSky').setOrigin(0, 0)
    //----------- buttons  
    // this.btnReload = this.add.image(cfg.width - 65, 25, 'btnReload').setScale(0.3)
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 30, 30, 'btnExit').setScale(0.4).setDepth(1)
    //---btn sound
    this.btnSound = this.add.sprite(30, 30, 'btnSound').setScale(0.4).setDepth(1)
    
    //---btn play
    this.btnPlay = this.add.image(cfg.width / 2 - 10, cfg.height - 74, 'btnPlay').setScale(1.4)


    //------------------ player icon
    this.playerFirst = this.add.image(100, 125, 'playerWoman').setScale(0.3)
    this.playerSecond = this.add.sprite(cfg.width - 100, 127, 'playerMan').setScale(0.31)

    //-----------create line
    this.rectLine = this.add.rectangle(100, 205, 100, 13, 0xffffff, 0.9).setStrokeStyle(2, 0x0030ff)
      .setVisible(false)
    //coin
    this.coin = this.add.sprite(cfg.width / 2 - 5, 125, 'coin', 1).setScale(0.6)
      .setVisible(false)
    // two Players winner  symbol
    this.womanSymbol = this.add.image(65, cfg.height - 50, 'womanSymbol').setScale(0.075).setVisible(false)
    this.manSymbol = this.add.image(cfg.width - 65, cfg.height - 50, 'manSymbol').setScale(0.09).setVisible(false)
    this.circleFrame = this.add.circle(65, cfg.height - 50, 35, 0x000000)
      .setStrokeStyle(3, 0xffffff, 0.5).setAlpha(0.3).setVisible(false)
    
    //sun rays
    this.sunRays = this.add.image(240, 460, 'sunRays2').setScale(0.30)

   
  
    //#endregion -------------------------- Image--------------------------------------------  


    //#region -----------------------------------((((add TEXT))))-------------------------------------
    //---playBtnText
    this.playBtnText = fnc.createText(this, cfg.width / 4 + 10, cfg.height - 20, 'Press button to start', 14)
    
    //---timer
    this.clockPlayTime = fnc.createText(this, cfg.width / 2 - 100, 15, `Play Time ${'0:00'}`, 20)
      .setStroke('blue', 3).setAlpha(.9).setAlpha(0)

    //---vs
    this.vsText = fnc.createText(this, cfg.width / 2 - 30, 115, `vs`, 32).setStroke('blue', 8).setAlpha(.9).setVisible(false)

    //---------------------win lost tilt
    this.tieCounterText = fnc.createText(this, cfg.width / 2 - 40, cfg.height - 220, `ties\n\n\t\t${cfg.global.ties}`, 28,).setTint(0xf4af24, 0xf4af24, 0xf4af24, 0xf4af24)

    this.winCounterTextP1 = fnc.createText(this, 20, cfg.height - 220, `win\t ${cfg.global.wins}`, 28, 'crimson')
    this.lossCounterTextP1 = fnc.createText(this, 20, cfg.height - 170, `loss\t ${cfg.global.losses}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
   
    this.winCounterTextP2 = fnc.createText(this, cfg.width - 150, cfg.height - 220, `win\t ${cfg.global.winsP2}`, 28, 'crimson')
    this.lossCounterTextP2 = fnc.createText(this, cfg.width - 150, cfg.height - 170, `loss\t ${cfg.global.lossesP2}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
    
    this.winResultText = fnc.createText(this, cfg.width / 2, cfg.height - 85, 'Win', 80).setTint(0xea0936, 0xea0936, 0xea0936, 0xea0936)
    this.tieResultText = fnc.createText(this, cfg.width / 2, cfg.height - 85, 'Tie', 80).setTint(0xf4af24, 0xf4af24, 0xf4af24, 0x091020)
    this.lossResultText = fnc.createText(this, cfg.width / 2, cfg.height - 85, 'Loss', 80).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)

    //centerX text
    for (const txt of [this.winResultText, this.tieResultText, this.lossResultText]) {
      txt.setX((cfg.width - txt.width) / 2 - 10)
      txt.setVisible(false)
    }
  

    //-----round
    this.roundText = fnc.createText(this, cfg.width / 2, cfg.height - 65, `round: ${cfg.global.round}`, 30)
    this.roundText.setX((cfg.width - this.roundText.width) / 2).setVisible(false)

    //--- step counter
    this.countText = fnc.createText(this, 180, cfg.height - 130, `planets ${this.stepsCount}`, 16,)
      .setDepth(6).setVisible(false)

    //---watch  
    this.watchInfo = fnc.createText(this, cfg.width / 3 - 30, cfg.height - 65, 'watch')
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
      .setVisible(false)
    //---play
    this.playInfo = fnc.createText(this, cfg.width / 3 + 12, cfg.height - 65, 'play')
      .setTint(0xff0000, 0xff0000, 0x0000ff, 0x0000ff)
      .setVisible(false)
    //#endregion ---------------------------------Text---------------------------------------------  


    //#region ---------------------------------((((Animation))))---------------------------------

    this.confettiEmitter = this.add.particles(cfg.width / 2, 0, 'confetti', {
      frame: ['red', 'yellow', 'green', 'blue', 'white'],
      lifespan: 4000,
      speed: {
        min: 150,
        max: 250
      },
      scale: {
        start: 0.15,
        end: 0
      },
      gravityY: 600,
      bounce: 0.8,
      blendMode: 'ADD'
    })

    this.confettiEmitter.stop()


    this.showResultTweenAnimation = this.tweens.add({
      targets: [this.winResultText, this.tieResultText, this.lossResultText],
      scaleY: 1.05,
      scaleX: 1.05,
      duration: 300,
      yoyo: true,
      repeat: -1,
      ease: 'Linear'
    })

    this.showResultTweenAnimation.pause()


    //coin animation
    fnc.animation.createAnimationBySpriteOfImages(this, 'coinAnimation', 'coin', 0, 5, 2, 50)


    //sun rays animation
    this.sunRays = this.tweens.add({
      targets: this.sunRays,
      delay: 1000,
      angle: 360, // full rotation
      duration: 15000,
      ease: 'Linear',
      repeat: -1,
    })

    //----------------- create Clock - Play Timer
    this.time.addEvent({
      callbackScope: this,
      delay: 1000,
      loop: true,
      callback: () => {
        let time = cfg.global.playTime++
        let min = (Math.floor(time / 60)).toString()
        let sec = (time % 60).toString().padStart(2, '0')
        this.clockPlayTime.setText(`Play Time ${min} : ${sec}`)
      },
    })

    //--- show clock
    this.tweens.add({
      targets: this.clockPlayTime,
      alpha: {
        from: 0,
        to: 1
      },
      duration: 3000,
      delay: 1000
    })


    //------------------ round tween animation
    this.roundTweenAnimation = this.tweens.add({
      targets: this.roundText,
      // alpha: {from: 0, to: 1 },
      x: { from: 0, to: cfg.width / 2 - 80 },
      duration: 1000,
      delay: 1,
      // yoyo: true,
      ease: 'Elastic',
      onStart: () => {

        // this.roundText.setAlpha(0)
        this.roundText.setText(`round: ${cfg.global.round}`).setVisible(true)
      },
      onComplete: () => {
        this.tweens.add({
          targets: this.roundText,
          x: cfg.width + 100,
          duration: 500,
          delay: 0,
          ease: 'Linear',
          onStart: ()=> this.soundGong()
        })
      }
    })
    //--pause
    this.roundTweenAnimation.pause()


    //add multi sound images
    fnc.animation.createAnimationByArrayOfImages(this, 'btnSoundAnimation', this.btnSoundSpriteImagesArray, -1, 5)
    if (!cfg.global.isPausedSound) {
      this.btnSound.anims.play('btnSoundAnimation')
    } else {
      this.btnSound.setTexture('btnNoSound')
    }

    //play btn text animation
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, this.playBtnText, cfg.width / 3 - 40, 1000, -1, 800)
  
  
    //#endregion ----------------------------Animation-------------------------------------------


    //#region ------------------------------------((((code))))-------------------------------
   
 
    //--------------------------------((((Interactive Buttons)))) -------------------------------------------
    //-----------------------------------add interactive btn options
    Array.from([this.btnExit, this.btnSound, this.btnPlay]).forEach((btn, index) => {
      btn.setInteractive({
        cursor: 'pointer',
        index
      })
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) { //exit
            //----stop interval if create planet on process 
            clearInterval(this.intervalId)

            this.game.sound.stopAll()
            this.anims.anims.clear()
            this.soundBtnExitClick()
            this.scene.stop(this.scene.scene)
            cfg.global.isPausedSound = false
            this.scene.start('MenuScene')
          }

          if (index == 1) {
            // console.log('Music Pause ON/OFF')
            if (!cfg.global.isPausedSound) {
              this.sound.stopByKey('bgGameSound3')
              this.btnSound.setTexture('btnNoSound')
              this.btnSound.stop('btnSoundAnimation')
              cfg.global.isPausedSound = true
            } else {
              this.soundBgGame.onBlur = false
              this.soundBgGame.play()
              this.btnSound.setTexture('btnSound')
              this.btnSound.play('btnSoundAnimation')
              cfg.global.isPausedSound = false
            }
          }
          // manual start game
          if (index == 2) {
            this.startGame()
          }
        })

      //---play bg music  
      //  this.soundBgGame()
    })

   
    //----------------after animation  lot who plyer is first and more settings
    //--- and call function this.aiMove() if game not two players
    this.coin.on('animationcomplete', function (anim, frame) {
      //set visible players frames 
      this.rectLine.setVisible(true)

      //random player
      const lotPlayer = Phaser.Math.Between(0, 1) == 0 ? 'playerWoman' : 'playerMan'
      if (lotPlayer == 'playerWoman') {
        this.player = 'playerWoman'
        //disable click on screen
        this.isCoinToss = false
        this.linePos = 0
        this.rectLine.setPosition(100, 205)
      } else {
        this.player = 'playerMan'
        this.linePos = 1
        this.rectLine.setPosition(cfg.width - 100, 205)
      }

      this.coin.setTexture('coin', 0)
      this.winImage = this.add.image(this.coin.x, this.coin.y, lotPlayer).setScale(0.2)
      //hide coin
      setTimeout(() => {
        this.coin.setVisible(false)
        this.winImage.setVisible(false)
        this.vsText.setVisible(true)
        this.isCoinToss = true //enable click to screen
      }, 600)
    }, this)


    // play infinity bg sound
    let allSounds = this.sound.getAllPlaying().filter(x => x.key == 'bgGameSound3').length
    if (!this.sound.get('bgGameSound3').isPlaying && allSounds == 0 && this.btnSound.anims.isPlaying) {
      this.soundBgGame.onBlur = false
      this.soundBgGame.play()
    }

    //#endregion -------------------------------Code-----------------------------------------------------------

    //------------ create planets, point lights and set Interactive  
    for (const [namePlanet, { x, y, frame }] of Object.entries(this.planetsObj)) {
      if (namePlanet != 'Sun') {
        this.planet = this.add.image(x, y, this.planetsSpriteArr[frame])
          .setScale(2.8)
          .setName(namePlanet)
          .setDepth(1)
        if (namePlanet == 'Saturn') this.planet.setAngle(18)
      }
      else {
        this.planet = this.add.pointlight(240, 460, 0xffff00, 35, 10, 0.2)
          .setName('Sun')
      }
      
      //add planet to array
      this.planetArray.push(this.planet)
      
      //text name planets
      fnc.createText(this, x - 60, y - 10, namePlanet, 12).setDepth(5)
    }
   
   

    //============= (((grid create for dev test)))==========
    // fnc.createGridSystem(this)
  };


  update(time, delta) {
    this.bg.tilePositionY += 0.8 // move bg
    // this.bg.tilePositionX += 0.8 // move bg
  }

  //=============================(((Custom Functions)))====================
  
  
  //-----------------------------------start Game
  startGame() {
    this.soundStartGame()
    this.roundTweenAnimation.resume()
    this.btnPlay.setVisible(false)
    this.playBtnText.setVisible(false)
    this.countText.setVisible(true)

    //---click on planet interactive events
    this.createRandomPlanet()
  }

  //--------------------------- create random planet array
  createRandomPlanet() {
    let counter = cfg.global.round + 1
    counter = counter > 10 ? 10 : counter
    this.intervalId = setInterval(() => {
      counter--
      //--------------------------------------stop interval and more
      if (!counter) {
        //start coin animation
        setTimeout(() => {
          this.watchInfo.setVisible(false)
          this.playInfo.setVisible(true)
          setTimeout(() => this.playInfo.setVisible(false), 1200)
          this.rectLine.setVisible(true)
          this.coin.setVisible(true)
          this.coin.anims.play('coinAnimation')
          this.soundCoinRotate()
        }, 500)
        //---call function to set planet interactive
        this.setPlanetInteractive()

        //----stop interval 
        clearInterval(this.intervalId)
      }

      //else   generate random planet
      //--- increase step counter
      this.countText.setText(`planets: ${++this.stepsCount}`)
      this.watchInfo.setVisible(true)
      this.soundPlanetLight()
      const planets = Object.keys(this.planetsObj).slice(1,)
      const randomPlanet = Phaser.Math.RND.pick(planets)
      this.randomPlanetsArray.push(randomPlanet)
      const { x, y } = this.planetsObj[randomPlanet]
      
      let lightPoint = this.add.pointlight(x, y, 0, 66, 1, 0.1)
      lightPoint.color.setTo(255, 255, 222)
      randomPlanet == 'Saturn' ? lightPoint.y += 8 : null
      setTimeout(() => lightPoint.destroy(), 1000)
    }, 1500)
  }

  // --------------------------- set planet 
  isClickAvailable = true  //prevent fast click
  setPlanetInteractive() {
    this.planetArray.forEach((planet, index) => {
      planet.setInteractive({
        cursor: 'pointer',
        index,
      }).on('pointerdown', () => {
        if (this.isClickAvailable) {
          this.isClickAvailable = false
          //enable click
          setTimeout(() => this.isClickAvailable = true, 800)
          if (planet.name == 'Sun') return

          if (this.linePos & 1) {
            this.rectLine.setPosition(100, 205)
          } else {
            this.rectLine.setPosition(cfg.width - 100, 205)
          }
          this.linePos++
          this.clickedPlanet(planet, index)
        }

      })
    })
  }

  // ------------------------ clicked current planet
  clickedPlanet(planet, index) {
    //play sound 
    this.player == 'playerMan' ? this.soundTic() :  this.soundTac()
      
    if (planet.name != 'Sun') {
      let lightPoint = this.add.pointlight(planet.x, planet.y, 0, 66, 1, 0.1)
      planet.name == 'Saturn' ? lightPoint.y += 8 : null
      //--- if planet correct
      if (planet.name == this.randomPlanetsArray.shift()) {
        lightPoint.color.setTo(2, 255, 2)
        this.pointStatistics(true)
        setTimeout(() => this.soundLine(), 300)
      } else { // --- not correct planet
        lightPoint.color.setTo(255, 2, 2)
        this.pointStatistics(false)
        setTimeout(() => this.soundPlanetWrong() , 300) 
      }
   
      setTimeout(() => lightPoint.destroy(), 1000)
    }
  }

 
  pointStatistics(isPlanetMatch) {
    //--- decrease step counter
    this.countText.setText(`planets: ${--this.stepsCount}`)

    if (this.player == 'playerMan') {
      if (isPlanetMatch) {
        this.player = 'playerWoman'
        if (this.stepsCount <= 0)  this.gameOver('tie')
        return
      } else {
        this.gameOver('manLoss')
        return
      } 
  
    }
    if (this.player == 'playerWoman') {
      if (isPlanetMatch) {
        this.player = 'playerMan'
        if (this.stepsCount <= 0)  this.gameOver('tie')
        return
      } else {
        this.gameOver('womanLoss')
        return
      } 
    }

  }

  // ----------------------------- is game over
  gameOver(result) { 
    //----------tie
    if (result == 'tie') {
      // console.log('tie')
      this.soundTie()
      cfg.global.ties++
      this.tieCounterText.setText(`ties\n\n\t ${cfg.global.ties}`)
      this.tieResultText.setVisible(true)
      this.showResultTweenAnimation.play()
    } else if (result == 'manLoss') {
      //------------------  woman win
      this.circleFrame.setVisible(true)
      this.womanSymbol.setVisible(true)
      this.winCounterTextP1.setText(`win\t ${++cfg.global.wins}`)
      this.lossCounterTextP2.setText(`loss\t ${++cfg.global.lossesP2}`)
      this.winResultText.setVisible(true)
      
      this.confettiEmitter.start()     
      this.showResultTweenAnimation.play()
    } else if (result == 'womanLoss') {
      //------------------ man win
      this.circleFrame.setVisible(true).setX(cfg.width - 65)
      this.manSymbol.setVisible(true)
      this.lossCounterTextP1.setText(`loss\t ${++cfg.global.losses}`)
      this.winCounterTextP2.setText(`win\t ${++cfg.global.winsP2}`)
      this.winResultText.setVisible(true).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
      this.confettiEmitter.start()     
      this.showResultTweenAnimation.play()
    }

    console.log('Game Over');
    this.reloadScene()
  }
   
  //------------------------------ Reload Scene  
  reloadScene() {
    console.log('Reload')
    cfg.global.round++ //increase rounds
    this.isCoinToss = false // stop clicked matrix fields
    this.input.enabled = false // disable all click events on this Scene
    this.btnExit.setVisible(false)
    this.btnSound.setVisible(false)
    // fnc.createText(this, cfg.width / 2 - 165, cfg.height / 2, '  RELOADING... ', 50, 'white', 'black').setDepth(5)
    setTimeout(() => this.scene.start('ReloadScene'), 2500)
  }


}