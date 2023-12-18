import { Scene} from 'phaser'
import * as fnc from '../index.js';
import {cfg} from '../index.js'



export class GameSceneTwo extends Scene {
  constructor() {
    super('GameSceneTwo')
  }


  init() {
    console.log('Welcome to GameScene 2...')
    // this.game.sound.stopAll() //stop all sounds
    cfg.global.typeOfGame = 'two'
    this.isCoinToss = false
    this.player = ''
    this.cardsArray = []
    this.cardsPositionObj = {}
    this.manPts = 0
    this.womanPts = 0
    this.stepsCount = 0
  }

  preload() {

    //#region -----------------------------------((((Load IMAGE)))) --------------------------------------

    //flares
    this.load.atlas('confetti', '../assets/images/particles/confetti.png', '../assets/images/particles/confetti.json')

    //----------------backgrounds
    this.load.image('bgGreen', '../assets/images/backgrounds/bgGreen.png')

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

    // //---btnSound
    this.load.image('btnSound', '/assets/images/buttons/btnSound.png')
    // //---bgnNoSound
    this.load.image('btnNoSound', '/assets/images/buttons/btnNoSound.png')
    
    //btn sound multi images
    this.btnSoundSpriteImagesArray = fnc.loadMultiImages(this, 'btnSounds', '../assets/images/buttons/soundBtnSprite/', 4)


    
    //---cards
    this.load.spritesheet('card', '../assets/images/cards/cardBackSprite_100_78.png', {
      frameWidth: 78,
      frameHeight: 100,
      startFrame: 0,
      endFrame: 4
    })

    this.load.image('cardEmpty', '../assets/images/cards/cardEmpty.png')
    this.load.image('cardEmptyWin', '../assets/images/cards/cardEmptyWin.png')
    this.load.image('cardEmptyWrong', '../assets/images/cards/cardEmptyWrong.png')
   

    //emoticon
    this.load.spritesheet('emoticon', '../assets/images/icons/spriteEmotion_72.png', {
      frameWidth: 72,
      frameHeight: 72,
      startFrame: 0,
      endFrame: 96
    })

  

    //---playerOne
    this.load.image('playerMan', '../assets/images/icons/playerMan2.png')
    this.load.image('playerWoman', '../assets/images/icons/playerWomen.png')
    
    //---players symbols
    this.load.image('manSymbol', '../assets/images/icons/manSymbol.png')
    this.load.image('womanSymbol', '../assets/images/icons/womanSymbol.png')

    //vs
    this.load.image('vs', '../assets/images/vs/1.png')



    //#endregion ------------------------------ load Images ----------------------------------------

    //#region ------------------------------------((((load AUDIO)))) --------------------------------------
    this.load.audio('bgGameSound2', '../assets/sounds/background/bgGame2.mp3')
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')
    this.load.audio('ticSound', '../assets/sounds/effects/items/tic.wav')
    this.load.audio('tacSound', '../assets/sounds/effects/items/tac.wav')
    this.load.audio('coinRotateSound', '../assets/sounds/effects/items/coin.wav')
    this.load.audio('gongSound', '../assets/sounds/effects/items/gong.mp3')
    this.load.audio('lineSound', '../assets/sounds/effects/items/line.mp3')
    this.load.audio('tieSound', '../assets/sounds/effects/items/tie.wav')
    this.load.audio('cardSlideSound', '../assets/sounds/effects/items/cardSlide1.wav')
    this.load.audio('cardWrongSound', '../assets/sounds/effects/items/wrong.wav')
    
    //#endregion -------------------------------load Audio ------------------------------------

  }

  create() {

    //#region ---------------------------------((((add AUDIO))))----------------------------- 
    this.soundBgGame = this.sound.add('bgGameSound2').setLoop(true)//.setVolume(0.3)
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    this.soundLevelComplete = () => fnc.createAudio(this, 'levelCompleteSound').play()
    this.soundTic = () => fnc.createAudio(this, 'ticSound').play()
    this.soundTac = () => fnc.createAudio(this, 'tacSound').play()
    this.soundCoinRotate = () => fnc.createAudio(this, 'coinRotateSound').play()
    this.soundGong = () => fnc.createAudio(this, 'gongSound').play()
    this.soundLine = () => fnc.createAudio(this, 'lineSound').play()
    this.soundTie = () => fnc.createAudio(this, 'tieSound').play()
    this.soundCardSlice = () => fnc.createAudio(this, 'cardSlideSound').play()
    this.soundCardsWrong = () => fnc.createAudio(this, 'cardWrongSound').play()

    // #endregion --------------------------------Audio------------------------------------------


    //#region -----------------------------------((((IMAGE)))) -------------------------------------------

    //create bg
    this.bg = this.add.image(0, 0, 'bgGreen').setOrigin(0, 0)//.setFlipY(true)
    // this.bg = this.add.tileSprite(0, 0, cfg.width, this.cloudHeight, 'bgGame').setOrigin(0, 0)
    //----------- buttons  
    // this.btnReload = this.add.image(cfg.width - 65, 25, 'btnReload').setScale(0.3)
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 30, 30, 'btnExit').setScale(0.4).setDepth(1)
    //---btn sound
    this.btnSound = this.add.sprite(30, 30, 'btnSound').setScale(0.4).setDepth(1)


    //------------------ player icon
    this.playerFirst = this.add.image(100, 125, 'playerWoman').setScale(0.3)
    this.playerSecond = this.add.sprite(cfg.width - 100, 127, 'playerMan').setScale(0.31)

    //-----------create line
    this.rectLine = this.add.rectangle(100, 205, 100, 13, 0xffffff, 0.9).setStrokeStyle(2, 0x0030ff)

    //coin
    this.coin = this.add.sprite(cfg.width / 2 - 5, 125, 'coin', 1).setScale(0.6)

    // two Players winner  symbol
    this.womanSymbol = this.add.image( 65, cfg.height - 45, 'womanSymbol').setScale(0.06).setVisible(false)
    this.manSymbol = this.add.image( cfg.width - 65, cfg.height - 45, 'manSymbol').setScale(0.075).setVisible(false)
    this.circleFrame = this.add.circle(65, cfg.height - 45, 40, 0x000000)
      .setStrokeStyle(3, 0xffffff, 0.5).setAlpha(0.3).setVisible(false)

    //#endregion -------------------------- Image--------------------------------------------  


    //#region -----------------------------------((((add TEXT))))-------------------------------------
    //---timer
    this.clockPlayTime = fnc.createText(this, cfg.width / 2 - 100, 15, `Play Time ${'0:00'}`, 20)
      .setStroke('blue', 3).setAlpha(.9).setAlpha(0)

    //---vs
    this.vsText = fnc.createText(this, cfg.width / 2 - 30, 115, `vs`, 32).setStroke('blue', 8).setAlpha(.9).setVisible(false)

    //---------------------win lost tilt
    this.tieCounterText = fnc.createText(this, cfg.width / 2 - 40, cfg.height - 220, `ties\n\n\t\t${cfg.global.ties}`, 28,).setTint(0xf4af24, 0xf4af24, 0xf4af24, 0xf4af24)

    this.winCounterTextP1 = fnc.createText(this, 20, cfg.height - 220, `win\t ${cfg.global.wins}`, 28, 'crimson')
    this.lossCounterTextP1 = fnc.createText(this, 20, cfg.height - 170, `loss\t ${cfg.global.losses}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
    this.ptsCounterTextP1 = fnc.createText(this, 20, cfg.height - 120, `pts\t ${this.manPts}`, 28).setTint(0xffffff, 0x00b600, 0x00ff00, 0x00ff00)
   

    this.winCounterTextP2 = fnc.createText(this, cfg.width - 150, cfg.height - 220, `win\t ${cfg.global.winsP2}`, 28, 'crimson')
    this.lossCounterTextP2 = fnc.createText(this, cfg.width - 150, cfg.height - 170, `loss\t ${cfg.global.lossesP2}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
    this.ptsCounterTextP2 = fnc.createText(this, cfg.width- 150, cfg.height - 120, `pts\t ${this.womanPts}`, 28).setTint(0xffffff, 0x00b600, 0x00ff00, 0x00ff00)


    this.winResultText = fnc.createText(this, cfg.width / 2, cfg.height -  85, 'Win', 80).setTint(0xea0936, 0xea0936, 0xea0936, 0xea0936)
    this.tieResultText = fnc.createText(this, cfg.width / 2, cfg.height -  85, 'Tie', 80).setTint(0xf4af24, 0xf4af24, 0xf4af24, 0x091020)
    this.lossResultText = fnc.createText(this, cfg.width / 2, cfg.height - 85, 'Loss', 80).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)

    //centerX text
    for (const txt of [this.winResultText, this.tieResultText, this.lossResultText]) {
      txt.setX((cfg.width - txt.width) / 2 - 10)
      txt.setVisible(false)
    }
  

    //-----round
    this.roundText = fnc.createText(this, cfg.width / 2, cfg.height - 65, `round: ${cfg.global.round}`, 30)
    this.roundText.setX((cfg.width - this.roundText.width) / 2)

    //--- step counter
    this.countText = fnc.createText(this, cfg.width / 2 - 68, cfg.height - 120, `Stp ${this.stepsCount}`, 28)


    //#endregion ---------------------------------Text---------------------------------------------  


    //#region --------------------------------((((Create sprite Objects)))) -------------------------------------------
    //#endregion ------------------------------------------Sprite --------------------------------------------


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



    fnc.animation.createAnimationBySpriteOfImages(this, 'coinAnimation', 'coin', 0, 5, 2, 50)
    this.coin.anims.play('coinAnimation')
    this.soundCoinRotate()

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
    this.tweens.add({
      targets: this.roundText,
      // alpha: {from: 0, to: 1 },
      x: { from: 0, to: cfg.width / 2 - 80 },
      duration: 2000,
      delay: 0,
      // yoyo: true,
      ease: 'Elastic',
      onStart: () => {
        // this.roundText.setAlpha(0)
        this.roundText.setText(`round: ${cfg.global.round}`)
      },
      onComplete: () => {
        this.tweens.add({
          targets: this.roundText,
          x: cfg.width + 100,
          duration: 500,
          delay: 1000,
          ease: 'Linear',
        })
      }
    })

    //add multi sound images
    fnc.animation.createAnimationByArrayOfImages(this, 'btnSoundAnimation', this.btnSoundSpriteImagesArray, -1, 5)
    if (!cfg.global.isPausedSound) {
      this.btnSound.anims.play('btnSoundAnimation')
    } else {
      this.btnSound.setTexture('btnNoSound')
    }
   
    
    //#endregion ----------------------------Animation-------------------------------------------

    //#region ------------------------------------((((code))))-------------------------------
    //----------------------create cards
    this.generateCards()
    
    //--------------------------------((((Interactive Buttons)))) -------------------------------------------
    //-----------------------------------add interactive btn options
    Array.from([this.btnExit, this.btnSound]).forEach((btn, index) => {
      btn.setInteractive({
        cursor: 'pointer',
        index
      })
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) { //exit
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
              this.sound.stopByKey('bgGameSound2')
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
      const lotPlayer = Phaser.Math.Between(0, 1) == 0 ? 'playerWoman': 'playerMan' 
      if (lotPlayer == 'playerWoman') { 
        this.player = 'playerWoman'
        //disable click on screen
        this.isCoinToss = false
        
      } else {
        this.player = 'playerMan'
        this.rectLine.setPosition(cfg.width - 100, 205)
      }

      this.coin.setTexture('coin', 0)
      this.winImage = this.add.image(this.coin.x, this.coin.y, lotPlayer).setScale(0.2)
      //hide coin
      setTimeout(() => {
        this.soundGong()
        this.coin.setVisible(false)
        this.winImage.setVisible(false)
        this.vsText.setVisible(true)
        this.isCoinToss = true //enable click to screen
      }, 600)
    }, this)

    // play infinity bg sound
    let allSounds = this.sound.getAllPlaying().filter(x => x.key == 'bgGameSound2').length
    if (!this.sound.get('bgGameSound2').isPlaying && allSounds == 0 && this.btnSound.anims.isPlaying) {
      this.soundBgGame.onBlur = false
      this.soundBgGame.play()
    }

    //#endregion -------------------------------Code-----------------------------------------------------------
    
    //grid create for dev test
    // fnc.createGridSystem(this)
  };


  update(time, delta) {
    // this.bg.tilePositionX += 0.8 // move bg
    // this.bg.tilePositionY += 0.8 // move bg
  }

  //=============================(((Custom Functions)))====================
  
  //------------------------------- generation random emoticon numbers
  generateCards() {
    let tenRandomNumbers = []
    this.twentyRandomNumbers = []

    //--- generate 10 random numbers 
    while (tenRandomNumbers.length < 10) {
      let randomNumber = Phaser.Math.Between(1, 96)
      if (!tenRandomNumbers.includes(randomNumber)) {
        tenRandomNumbers.push(randomNumber)
      }
    }

    //---generate 20 duplicate numbers
    setTimeout(() => {
      this.twentyRandomNumbers = tenRandomNumbers.concat(tenRandomNumbers)
      Phaser.Utils.Array.Shuffle(this.twentyRandomNumbers)
      // console.table(this.twentyRandomNumbers);
      //call function to add cards and emoticons
      this.addCards()
    }, 200)
  }

  // ------------------------------ add card to display
  addCards() {
    const randCardFace = Phaser.Math.Between(0, 3)
    let index = 0
    let startPosX = 60
    let startPosY = cfg.height / 3 - 35

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        let itemNum = this.twentyRandomNumbers.shift()
        const xPosition = startPosX + col * 90
        const yPosition = startPosY + row * 120
        
        // add card background
        let cardBack = this.add.sprite(xPosition, yPosition, 'cardEmpty', 0).setScale(1.1)//.setVisible(false)
        // add emoticons
        let item = this.add.sprite(xPosition, yPosition, 'emoticon', itemNum)//.setVisible(false)
       
        // add card ,and set to interactive
        let cardFace = this.add.sprite(xPosition, yPosition, 'card', randCardFace).setScale(1.1)
        this.cardsArray.push(cardFace)  //.setAlpha(0.4)

        // add cardFace, cardBack, itemNum
        this.cardsPositionObj[index] = { cardFace, cardBack, item, itemNum }
        index++
      }
    }
    // call function click cards only array not empty
    setTimeout(() => {
      if (this.cardsArray.length) {
        this.activateInteractiveCards()
      } else {
        this.input.enabled = false // disable all click events on this Scene
      }
    }, 200);
  
 
  }
 
  //------------------------------ interactive cards 
  isClickAvailable = true  //prevent fast click
  activateInteractiveCards() {
    this.cardsArray.forEach((card, cardIndex) => {
        card.setInteractive().on('pointerdown', (event) => {
          if (this.isClickAvailable && this.cardsArray.length) {
            this.isClickAvailable = false
            //enable click
            setTimeout(() => this.isClickAvailable = true, 300)
            if (this.isCoinToss) {
              this.cardsManipulator(card, cardIndex)
              this.soundCardSlice()
            }
          }
            
        })
      })
  }


  //------------------------------ cards manipulation
  firstCardItemNum = ''
  secondCardItemNum = ''
  
  cardsManipulator(card, cardIndex) {
    //--- hide face card
    card.setVisible(false)
    
    //---- get item num
    if (!this.firstCardItemNum) {
      this.firstCardBack = this.cardsPositionObj[cardIndex].cardBack
      this.firstCardItemNum = this.cardsPositionObj[cardIndex].itemNum
    } else {
      this.secondCardBack = this.cardsPositionObj[cardIndex].cardBack
      this.secondCardItemNum = this.cardsPositionObj[cardIndex].itemNum
    }
   
    //------------------- is two cards open
    if (this.firstCardItemNum && this.secondCardItemNum) {
      this.input.enabled = false // disable all click events on this Scene

    // --- two cards match
    if (this.firstCardItemNum == this.secondCardItemNum) {
      this.soundLine()
      this.firstCardBack.setTexture('cardEmptyWin')
      this.secondCardBack.setTexture('cardEmptyWin')
      setTimeout(() => {
        for (const [key, val] of Object.entries(this.cardsPositionObj)) {
          if ([this.firstCardItemNum, this.secondCardItemNum].includes(val.itemNum)) { 
            //hide item and cardBack
            // this.cardsPositionObj[key].item.setVisible(false)
            // this.cardsPositionObj[key].cardBack.setVisible(false)
            // destroy
            this.cardsPositionObj[key].item.destroy()
            this.cardsPositionObj[key].cardBack.destroy()
     
             //delete keys form object
            delete this.cardsPositionObj[key]
          }
        }
        //--- call function to add point and move rectLine
        this.pointStatistics(true)
      }, 1000)
   
      } else { //------------------- card not match
        this.firstCardBack.setTexture('cardEmptyWrong')
        this.secondCardBack.setTexture('cardEmptyWrong')
        //show face card again
        setTimeout(() => {
          this.soundCardsWrong()
          for (const [key, val] of Object.entries(this.cardsPositionObj)) {
            if ([this.firstCardItemNum, this.secondCardItemNum].includes(val.itemNum)) {
              this.cardsPositionObj[key].cardFace.setVisible(true)
            }
          }
          //--- call function to add point and move rectLine
          this.pointStatistics(false)
       
        }, 1000)
    }
      //----------- check is Game Over and call function gameOver
      setTimeout(() => {
        if (!Object.keys(this.cardsPositionObj).length) { 
          this.input.enabled = false // disable all click events on this Scene
           this.gameOver()
        } else {
        //----------- call function to clear data
        this.clearData()
        }
      }, 1300)
    }
  }

  pointStatistics(isTwoCardsMatch) {
    //--- increase step counter
    this.countText.setText(`Stp: ${++this.stepsCount}`)

    if (this.player == 'playerMan') {
      if (isTwoCardsMatch) {
        this.ptsCounterTextP2.setText(`pts ${++this.womanPts}`) 
      } else {
        this.rectLine.setPosition(100, 205)
        this.player = 'playerWoman'
      }
    } else { // player is woman
        if (isTwoCardsMatch) {
          this.ptsCounterTextP1.setText(`pts ${++this.manPts}`)
        } else {
          this.rectLine.setPosition(cfg.width - 100, 205)
          this.player = 'playerMan'    
        }
     }
      
      //-------check points is max 5
      if (this.manPts > 5 || this.womanPts > 5) {
        this.gameOver() 
      } 
   }

  
  //------------------------------- clear data
  clearData() {
    // enable all click events on this Scene and clear data
    this.input.enabled = true
    try {
      this.firstCardBack.setTexture('cardEmpty')
      this.secondCardBack.setTexture('cardEmpty')
    } catch {
      // console.log('Try to fix bug cards hide')
    }
 
    this.firstCardItemNum = ''
    this.secondCardItemNum = ''
  }

  // ----------------------------- is game over
  gameOver() { 
    //----------tie
    if (this.manPts == this.womanPts) {
      // console.log('tie')
      this.soundTie()
      cfg.global.ties++
      this.tieCounterText.setText(`ties\n\n\t ${cfg.global.ties}`)
      this.tieResultText.setVisible(true)
      this.showResultTweenAnimation.play()
    } else if (this.womanPts > 5) {
      //------------------  woman win
      this.winCounterTextP2.setText(`loss\t ${++cfg.global.winsP2}`)
      this.lossCounterTextP1.setText(`win\t ${++cfg.global.losses}`)
      this.winResultText.setVisible(true).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
      this.manSymbol.setVisible(true)
      this.circleFrame.setVisible(true).setX(cfg.width - 65)
      this.confettiEmitter.start()     
      this.showResultTweenAnimation.play()
    } else {
      //------------------ man win
      this.winCounterTextP1.setText(`win\t ${++cfg.global.wins}`)
      this.lossCounterTextP2.setText(`loss\t ${++cfg.global.lossesP2}`)
      this.winResultText.setVisible(true)
      this.womanSymbol.setVisible(true).setX(65)
      this.circleFrame.setVisible(true)
      this.confettiEmitter.start()     
      this.showResultTweenAnimation.play()
    }

    console.log('Game Over');
    this.reloadScene()
  }
   

  //------------------------------ Reload Scene  
  reloadScene() {
    console.log('Reload')
    this.input.enabled = false // disable all click events on this Scene
    cfg.global.round++ //increase rounds
    this.isCoinToss = false // stop clicked matrix fields
    this.btnExit.setVisible(false)
    this.btnSound.setVisible(false)
    // fnc.createText(this, cfg.width / 2 - 165, cfg.height / 2, '  RELOADING... ', 50, 'white', 'black').setDepth(5)
    try {
      setTimeout(() => this.scene.launch('ReloadScene'), 3000);
  } catch (error) {
      console.error('Error launching scene:', error);
  }
  }


}
