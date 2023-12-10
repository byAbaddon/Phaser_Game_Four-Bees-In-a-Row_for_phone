import {  Scene} from 'phaser'
import * as fnc from '../index.js';
import {cfg} from '../index.js'



export class GameScene extends Scene {
  constructor() {
    super('GameScene')
    this.isCoinToss = false
    this.stepPlayersCounter = 0
    this.player = 'X'
    this.lastStepPlayer = []
    this.timeBeforeAIPlay = 500
    this.boardMatrix = [
      ['', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', ''],
    ]
    this.boardButtonsMatrix = [
      ['', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', ''],
    ]
    this.matrixFieldPosition = {}

  }


  init() {
    console.log('Welcome to GameScene...')
    // this.game.sound.stopAll() //stop all sounds
    cfg.global.typeOfGame = 'one'
  }

  preload() {

    //#region -----------------------------------((((Load IMAGE)))) --------------------------------------

    //flares
    this.load.atlas('confetti', '../assets/images/particles/confetti.png', '../assets/images/particles/confetti.json')


    //----------------backgrounds
    this.load.image('bgGame', '../assets/images/backgrounds/bgGame.png')

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

    //---boards
    this.load.image('boardGold', '../assets/images/boards/gold.png')
    this.load.image('boardRed', '../assets/images/boards/red.png')
    this.load.image('boardBlue', '../assets/images/boards/blue.png')
    this.load.image('boardGreen', '../assets/images/boards/green.png')


    //---players tic
    this.load.image('bee', '../assets/images/tics/bee.png')
    this.load.image('spider', '../assets/images/tics/spider.png')
     
    

    //---playerOne
    this.load.image('playerBee', '../assets/images/icons/beeIconRed.png')
    this.load.image('playerSpider', '../assets/images/icons/spiderIcon.png')


    //vs
    this.load.image('vs', '../assets/images/vs/1.png')

    //#endregion ------------------------------ load Images ----------------------------------------

    //#region ------------------------------------((((load AUDIO)))) --------------------------------------
    this.load.audio('bgGameSound', '/assets/sounds/background/bgGame.mp3')

    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')
    this.load.audio('ticSound', '../assets/sounds/effects/items/tic.wav')
    this.load.audio('tacSound', '../assets/sounds/effects/items/tac.wav')
    this.load.audio('coinRotateSound', '../assets/sounds/effects/items/coin.wav')
    this.load.audio('gongSound', '../assets/sounds/effects/items/gong.mp3')
    this.load.audio('lineSound', '../assets/sounds/effects/items/line.mp3')
    this.load.audio('tieSound', '../assets/sounds/effects/items/tie.wav')

    //#endregion -------------------------------load Audio ------------------------------------

  }

  create() {
    //#region ---------------------------------((((add AUDIO))))----------------------------- 
    this.soundBgGame = this.sound.add('bgGameSound').setLoop(true)//.setVolume(0.3)
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    this.soundLevelComplete = () => fnc.createAudio(this, 'levelCompleteSound').play()
    this.soundTic = () => fnc.createAudio(this, 'ticSound').play()
    this.soundTac = () => fnc.createAudio(this, 'tacSound').play()
    this.soundCoinRotate = () => fnc.createAudio(this, 'coinRotateSound').play()
    this.soundGong = () => fnc.createAudio(this, 'gongSound').play()
    this.soundLine = () => fnc.createAudio(this, 'lineSound').play()
    this.soundTie = () => fnc.createAudio(this, 'tieSound').play()


    // #endregion --------------------------------Audio------------------------------------------


    //#region -----------------------------------((((IMAGE)))) -------------------------------------------

    //create bg
    // this.bg = this.add.image(0, 0, 'bgGame').setOrigin(0, 0)
    this.bg = this.add.tileSprite(0, 0, cfg.width, this.cloudHeight, 'bgGame').setOrigin(0, 0)
    //----------- buttons  
    // this.btnReload = this.add.image(cfg.width - 65, 25, 'btnReload').setScale(0.3)
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 30, 30, 'btnExit').setScale(0.4).setDepth(1)
    //---btn sound
    this.btnSound = this.add.sprite(30, 30, 'btnSound').setScale(0.4).setDepth(1)


    //------------------ player icon
    let plyerFirstFace = 'playerBee'
    let plyerSecondFace = 'playerSpider'


    this.playerFirst = this.add.image(100, 125, plyerFirstFace).setScale(0.2)
    this.playerSecond = this.add.sprite(cfg.width - 100, 125, plyerSecondFace).setScale(0.2)

    //-----------create line
    this.greenRectLine = this.add.rectangle(100, 205, 100, 13, 0xffffff, 0.9).setStrokeStyle(2, 0x0030ff)

    //coin
    this.coin = this.add.sprite(cfg.width / 2 - 5, 125, 'coin', 1).setScale(0.6)


    //---boards
    this.board = this.add.sprite(cfg.width / 2, cfg.height / 2, 'boardGold').setScale(0.95)

 
    // this.add.circle(55,  cfg.height / 2 - 102, 29, 0xff00ff)
    //#endregion -------------------------- Image--------------------------------------------  


    //#region -----------------------------------((((add TEXT))))-------------------------------------
    //---timer
    this.clockPlayTime = fnc.createText(this, cfg.width / 2 - 100, 15, `Play Time ${'0:00'}`, 20)
      .setStroke('blue', 3).setAlpha(.9).setAlpha(0)

    //---vs
    this.vsText = fnc.createText(this, cfg.width / 2 - 30, 115, `vs`, 32).setStroke('blue', 8).setAlpha(.9).setVisible(false)

    //---------------------win lost tilt
    this.tieCounterText = fnc.createText(this, cfg.width / 2 - 40, cfg.height - 220, `ties\n\n\t\t${cfg.global.ties}`, 28,).setTint(0xf4af24, 0xf4af24, 0xf4af24, 0xf4af24)

    if (cfg.global.typeOfGame == 'one') {

      this.winCounterTextP1 = fnc.createText(this, 20, cfg.height - 220, `win\t ${cfg.global.wins}`, 28, 'crimson')
      this.lossCounterTextP1 = fnc.createText(this, 20, cfg.height - 170, `loss\t ${cfg.global.losses}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)

      this.winCounterTextP2 = fnc.createText(this, cfg.width - 150, cfg.height - 220, `win\t ${cfg.global.winsP2}`, 28, 'crimson')
      this.lossCounterTextP2 = fnc.createText(this, cfg.width - 150, cfg.height - 170, `loss\t ${cfg.global.lossesP2}`, 28).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
    }
    this.winResultText = fnc.createText(this, cfg.width / 2, cfg.height - 100, 'Win', 80).setTint(0xea0936, 0xea0936, 0xea0936, 0xea0936)
    this.tieResultText = fnc.createText(this, cfg.width / 2, cfg.height - 100, 'Tie', 80).setTint(0xf4af24, 0xf4af24, 0xf4af24, 0x091020)
    this.lossResultText = fnc.createText(this, cfg.width / 2, cfg.height - 100, 'Loss', 80).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)

    //centerX text
    for (const txt of [this.winResultText, this.tieResultText, this.lossResultText]) {
      txt.setX((cfg.width - txt.width) / 2)
      txt.setVisible(false)
    }
    // two Players winner  symbol
    this.xTic = this.add.image(65, cfg.height - 65, 'bee').setScale(0.19).setVisible(false)
    this.oTic = this.add.image(cfg.width - 65, cfg.height - 65, 'spider').setScale(0.19).setVisible(false)
    this.circleFrame = this.add.circle(65, cfg.height - 65, 50, 0x000000)
      .setStrokeStyle(3, 0xffffff, 0.5).setAlpha(0.3).setVisible(false)

    //-----round
    this.roundText = fnc.createText(this, cfg.width / 2, cfg.height - 85, `round: ${cfg.global.round}`, 30)
    this.roundText.setX((cfg.width - this.roundText.width) / 2)
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

    //--------------------------frame board animation
    //---win frame
    this.winFrame = this.tweens.add({
      targets: this.board,
      alpha: { from: 0.1, to: 1 },
      duration: 200,
      repeat: 2,
      yoyo: true,
      onYoyo: () => {
        this.board.setTexture('boardRed')
      },
      onRepeat: () => {
        this.board.setTexture('boardGreen')
      },
      onComplete: () => {
        this.board.setTexture('boardRed').setAlpha(1)
      }
    })
    this.winFrame.pause()

    //---lost frame  
    this.lostFrame = this.tweens.add({
      targets: this.board,
      alpha: { from: 0.1, to: 1 },
      duration: 200,
      repeat: 2,
      yoyo: true,
      onYoyo: () => {
        this.board.setTexture('boardRed')
      },
      onRepeat: () => {
        this.board.setTexture('boardGreen')
      },
      onComplete: () => {
        this.board.setTexture('boardBlue').setAlpha(1)
      }
    })
    this.lostFrame.pause()

    //---tie frame
    this.tieFrame = this.tweens.add({
      targets: this.board,
      alpha: { from: 0.1, to: 1 },
      duration: 200,
      repeat: 2,
      yoyo: true,
      onYoyo: () => {
        this.board.setTexture('boardRed')
      },
      onRepeat: () => {
        this.board.setTexture('boardGreen')
      },
      onComplete: () => {
        this.board.setTexture('boardGold').setAlpha(1)
      }
    })
    this.tieFrame.pause()

    //#endregion ----------------------------Animation-------------------------------------------

    //#region ------------------------------------((((code))))-------------------------------

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
              this.sound.stopByKey('bgGameSound')
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

    // Iterate Matrix and set all btn interactive and call player move function
    //------------fill button matrix  &&  fill matrixFilePosition coordinate
    //---btnBoard
    for (let i = 0; i < this.boardButtonsMatrix.length; i++) {
      for (let j = 0; j < this.boardButtonsMatrix[i].length; j++) {
        let xPos = 53 + (63 * i)
        let yPos = cfg.height / 2 - 102 + (63 * j)
        if (i == 1 || i == 5) yPos -= 30
        if (i == 2 || i == 4) yPos -= 60
        if (i == 3) yPos -= 90
  
        let circleField = this.add.circle(xPos, yPos, 28, 0xff0000)
        circleField.setInteractive()
        this.boardButtonsMatrix[i][j] = circleField

        // --- fill matrixFilePosition coordinate
        let keyPos = i + ':' + j
        this.matrixFieldPosition[keyPos] = { x: xPos, y: yPos }
      }
    }
 
    //------------------ interactive buttonMatrix 

    this.boardButtonsMatrix.forEach((matrixRow, rowIndex) => {
      matrixRow.forEach((circle, colIndex) => {
        circle.setAlpha(0.001) // hide rect btn
        circle.setInteractive().on('pointerdown', (target) => {
          //  console.log(target, rowIndex, colIndex);
          //----------------------enable clicked  True
          if (this.isCoinToss) {
            //clicked this current field
            let currentField = this.boardButtonsMatrix[rowIndex][colIndex]
            currentField.destroy()
            // player move
            this.playerMove(currentField, rowIndex, colIndex)
          }
        })
      })
    })

    
    //----------------after animation  lot who plyer is first and more settings
    //--- and call function this.aiMove() if game not two players
    this.coin.on('animationcomplete', function (anim, frame) {
      //set visible players frames 
      this.greenRectLine.setVisible(true)

      //random 'X' or 'O'
      const lotPlayer = Phaser.Math.Between(0, 1) == 0 ? 'bee' : 'spider'
      if (lotPlayer == 'spider') { // == 'O'
        this.player = 'O'
        this.greenRectLine.setPosition(cfg.width - 100, 205)
     
      } else {
        this.player = 'X'
      }

      this.coin.setTexture('coin', 0)
      this.winImage = this.add.image(this.coin.x, this.coin.y, lotPlayer).setScale(0.15)
      //hide coin
      setTimeout(() => {
        this.soundGong()
        this.coin.setVisible(false)
        this.winImage.setVisible(false)
        this.vsText.setVisible(true)
        this.isCoinToss = true //enable click to matrix fields
      }, 600)
    }, this)


    // play infinity bg sound
    let allSounds = this.sound.getAllPlaying().filter(x => x.key == 'bgGameSound').length
    if (!this.sound.get('bgGameSound').isPlaying && allSounds == 0 && this.btnSound.anims.isPlaying) {
      this.soundBgGame.onBlur = false
      this.soundBgGame.play()
    }

    //#endregion ------------------------------------------------------------------------------------------


  };


  update(time, delta) {
    this.bg.tilePositionX += 0.8 // move bg
    // this.bg.tilePositionY += 0.8 // move bg
  }

  //=====================================  Custom Function =======================

  playerMove(currentField, rowIndex, colIndex) {
    // console.log('-----------( 2 )-----------------------');
    this.lastStepPlayer = [rowIndex, colIndex]
    this.stepPlayersCounter++
    let currentTic = this.player != 'O' ? 'bee' : 'spider'
    //check player - is first player X ~ Bee
    if (this.player == 'O') {
      this.greenRectLine.setPosition(100, 205)
      this.soundTic()
      this.player = 'X'
    } else { // second player Spider or AI
      this.greenRectLine.setPosition(cfg.width - 100, 205)
      this.soundTac()
      this.player = 'O'
    }

    try {
      //---add image to play board
      this.add.image(currentField.x, currentField.y, currentTic).setScale(0.12)
      //-----------set data to boardMatrix
      this.boardMatrix[rowIndex][colIndex] = this.player == 'X' ? 'O' : 'X'
      // console.table(this.boardMatrix)
      //---check is Win Line
      this.checkIsWinner()
      // //---show result
      setTimeout(() => this.showResult(), 100)
    } catch (error) {
      console.log('Fix Bug - to fast exit!!!!')
    }
  }


  //------------------------------check is Winner
  checkIsWinner() {
    let mtx = this.boardMatrix
    let player = this.player == 'X' ? 'O' : 'X'
    //--------- check vertical cols
    for (let i = 0; i < mtx.length; i++) {
      for (let j = 0; j <= mtx[i].length - 4; j++) {
        if (mtx[i][j] == player
          && mtx[i][j] == mtx[i][j + 1]
          && mtx[i][j] == mtx[i][j + 2]
          && mtx[i][j] == mtx[i][j + 3]) {
          let winLine = [{ row: i, col: j }, { row: i, col: j + 1 }, { row: i, col: j + 2 }, { row: i, col: j + 3 }]
          // console.log(line, 'Find cols combination')
          this.drawWinLine(winLine)
          return true
        }
      }
    }
     
    //----- check left and right diagonals
    this.diagonals = [
      //--- left diagonal lines
      // first line
      [{ row: 3, col: 0 }, { row: 4, col: 0 }, { row: 5, col: 0 }, { row: 6, col: 0 }],
      // second line
      [{ row: 2, col: 0 }, { row: 3, col: 1 }, { row: 4, col: 1 }, { row: 5, col: 1 }, { row: 6, col: 1 }],
      // third line
      [{ row: 1, col: 0 }, { row: 2, col: 1 }, { row: 3, col: 2 }, { row: 4, col: 2 }, { row: 5, col: 2 }, { row: 6, col: 2 }],
      // fourth line
      [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }, { row: 3, col: 3 }, { row: 4, col: 3 }, { row: 5, col: 3 }, { row: 6, col: 3 }],
      // fifth line
      [{ row: 0, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 3 }, { row: 3, col: 4 }, { row: 4, col: 4 }, { row: 5, col: 4 }],
      // sixth line
      [{ row: 0, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 4 }, { row: 3, col: 5 }, { row: 4, col: 5 }],
      // seventh line
      [{ row: 0, col: 3 }, { row: 1, col: 4 }, { row: 2, col: 5 }, { row: 3, col: 6 }],


      //--------------------- right diagonal lines
      // first line
      [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }, { row: 3, col: 0 }],
      // second line
      [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 3, col: 1 }, { row: 4, col: 0 }],
      // third line
      [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 2 }, { row: 4, col: 1 }, { row: 5, col: 0 }],
      // fourth line
      [{ row: 0, col: 3 }, { row: 1, col: 3 }, { row: 2, col: 3 }, { row: 3, col: 3 }, { row: 4, col: 2 }, { row: 5, col: 1 }, { row: 6, col: 0 }],
      // fifth line
      [{ row: 1, col: 4 }, { row: 2, col: 4 }, { row: 3, col: 4 }, { row: 4, col: 3 }, { row: 5, col: 2 }, { row: 6, col: 1 }],
      // sixth line
      [{ row: 2, col: 5 }, { row: 3, col: 5 }, { row: 4, col: 4 }, { row: 5, col: 3 }, { row: 6, col: 2 }],
      // seventh line
      [{ row: 3, col: 6 }, { row: 4, col: 5 }, { row: 5, col: 4 }, { row: 6, col: 3 }]
    ]
    
    let validLineData = []
      
    for (let diagonal of this.diagonals) {
      let count = 0
      for (let coord of diagonal) {
        if (mtx[coord.row][coord.col] == player) {
          count++
          validLineData.push({ row: coord.row, col: coord.col })

          if (count == 4) {
            this.drawWinLine(validLineData)
            // console.log(diagonal, 'Find diagonal combination')
            return true
          }
        } else {
          count = 0
          validLineData = []
        }
      }
    }
    
    return false // no combination
    
  }

  //------------------------------ show Result   *here set AI level
  showResult() {
    //------------- check game Results
    if (!this.checkIsWinner() && this.stepPlayersCounter >= 37) { //Tie
      //---------- play sound
      this.soundTie()
      cfg.global.ties++
      this.tieCounterText.setText(`ties\n\n\t ${cfg.global.ties}`)
      this.tieResultText.setVisible(true)
      this.showResultTweenAnimation.play()
      this.tieFrame.resume()
      console.log('The game ended! Nobody wins.')
      this.reloadScene()
      return
    }

    //-------------------- have winner
    if (this.checkIsWinner()) {
      //---------- play sound
      this.soundLine()
      //---------- update win circle frame
      this.greenRectLine.setVisible(false)

        if (this.player != 'X') {
          cfg.global.wins++
          cfg.global.lossesP2++
          this.winResultText.setVisible(true)
          this.winCounterTextP1.setText(`wins\t ${cfg.global.wins}`)
          this.lossCounterTextP2.setText(`loss\t ${cfg.global.lossesP2}`)
          this.xTic.setVisible(true)
          this.circleFrame.setVisible(true)
          this.winFrame.resume()
        } else {
          cfg.global.winsP2++
          cfg.global.losses++
          this.winResultText.setVisible(true).setTint(0x00b6ff, 0x00b6ff, 0x00b6ff, 0xffb6ff)
          this.winCounterTextP2.setText(`wins\t ${cfg.global.winsP2}`)
          this.lossCounterTextP1.setText(`loss\t ${cfg.global.losses}`)
          this.oTic.setVisible(true)
          this.circleFrame.setPosition(cfg.width - 65, cfg.height - 65).setVisible(true)
          this.lostFrame.resume()
        }


        this.confettiEmitter.start()
        this.showResultTweenAnimation.play()
        console.log(`WOW ! Player ${this.player == 'X' ? 'O' : 'X'} wins`)
      
      this.reloadScene()
      return
    }
  }


  //draw Win Line
  drawWinLine(lineData) {
    for (const { row, col } of lineData) {
      let key = row + ':' + col
      let { x, y } = this.matrixFieldPosition[key]
      let color = this.player == 'O' ? 0xffff00 : 0xff00ff
      this.add.circle(x, y, 29, color, 0.1)//.setDepth(-1)
    }
  }

  //----------------remove Interactive matrix fields
  removeInteractiveMatrixFields() {
    this.boardButtonsMatrix.forEach(matrixRow => {
      matrixRow.forEach(field => {
        try {
          field.setInteractive()
        } catch { }
      })
    })
  }

  //------------------------------ Reload Scene  
  reloadScene() {
    console.log('Reload')
    cfg.global.round++ //increase rounds
    this.isCoinToss = false // stop clicked matrix fields
    this.input.enabled = false // disable all click events on this Scene
    this.btnExit.setVisible(false)
    this.btnSound.setVisible(false)
    this.removeInteractiveMatrixFields()

    // fnc.createText(this, cfg.width / 2 - 165, cfg.height / 2, '  RELOADING... ', 50, 'white', 'black').setDepth(5)
    setTimeout(() => this.scene.start('ReloadScene'), 2500)
  }



}