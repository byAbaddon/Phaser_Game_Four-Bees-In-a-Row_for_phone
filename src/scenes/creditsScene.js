import {Scene} from'phaser';
import * as fnc from '../index.js';
import {cfg} from '../index.js'

export class CreditsScene extends Scene {
  constructor() {
    super('CreditsScene')
  }
  init() {
    console.log('CreditsScene was loading...')
  }

  preload() {
    //---------------load IMAGES
    this.load.image('logoPhaser', '/assets/images/logo/phaser.png')
     //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    
    //---------------load AUDIO
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
     
  }


  create() {
    //grid create for dev test
    // fnc.createGridSystem(this)

    // add background by black color
    this.cameras.main.setBackgroundColor('#000000')    

    //-------------------------------watcher CHECK ORIENTATION PHONE 
    // fnc.checkOrientation(this, )
    //------------------------------- add AUDIO
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    
    //------------------------------- add IMAGE
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35 , 37, 'btnExit').setScale(0.5)
     //------middle-----logo
    this.add.image(cfg.width / 2, cfg.height - 150, 'logoPhaser').setScale(0.2) 
    
    //------------------------------ add TEXT
    //for landscape screen  20   else 25
    const textTitle = 24 // 35
    const textFontSize = 14
    const textDev = 10 

    //top
    fnc.createText(this, 10,  10, 'Version: 1.0.0-beta', textDev,'white')
    fnc.createText(this, cfg.width / 2 - 96,  60, 'CREDITS', 38,'white')
    .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    
    
    //--------top left
    //free img
    fnc.createText(this, 20, cfg.height / 5 - 4, 'Free Images:',textTitle,'brown')
    fnc.createText(this, 40, cfg.height / 4 -10, 'https://playgroundai.com', textFontSize, 'teal',)
    fnc.createText(this, 40, cfg.height / 4 + 5, 'https://www.pngwing.com',  textFontSize,'teal' , )
    fnc.createText(this, 40, cfg.height / 4 + 20, 'https://www.freepik.com',  textFontSize,'teal' , )
    fnc.createText(this, 40, cfg.height / 4 + 35, 'https://www.craftpix.net', textFontSize, 'teal',)
    
    //free sounds
    fnc.createText(this, 20, cfg.height / 3 + 10, 'Free Sounds:', textTitle,'brown' , )
    fnc.createText(this, 40, cfg.height / 3 + 40, 'https://www.freesound.org',     textFontSize,'teal' , )
    fnc.createText(this, 40, cfg.height / 3 + 55, 'https://pixabay.com/bg/music', textFontSize,'teal' , )
    fnc.createText(this, 40, cfg.height / 3 + 70, 'https://orangefreesounds.com', textFontSize,'teal' , )
    
     //free text
    fnc.createText(this, 20, cfg.height / 2 -10, 'Free Text:', textTitle, 'brown',)
    fnc.createText(this, 40, cfg.height / 2 + 20, 'https://www.dafont.com', textFontSize,'teal' , )

    //platform
    fnc.createText(this, 20, cfg.height / 2 + 80, 'Platform 2D game:', textTitle,'brown' , )
    fnc.createText(this, 40, cfg.height / 2 + 110, 'https://phaser.io', textFontSize,'teal' , )

   
    //---------- bottom
    fnc.createText(this, 20, cfg.height - 55, 'Developer:', textDev,'brown' , )
    fnc.createText(this, 40, cfg.height - 35, 'By Abaddon', textDev, '#BEDDDD')
    
    fnc.createText(this, cfg.width / 2 - 70, cfg.height - 55, 'Bug rapports:', textDev, 'brown')
    fnc.createText(this, cfg.width / 2 - 40, cfg.height - 35, 'subtotal@avb.bg', textDev, '#BEDDDD')

    fnc.createText(this, cfg.width - 120, cfg.height - 55, 'Copyright:', textDev, 'brown' , )
    fnc.createText(this, cfg.width - 90, cfg.height - 35, '2023', textDev, '#BEDDDD' )


    this.btnExit.setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => this.btnExit.setTint(0xe0e0e0))
        .on('pointerout', () =>  this.btnExit.setTint(0xffffff)) 
        .on('pointerdown', (index) => {
          const currentScene = this.scene.scene;
          this.scene.stop(currentScene);

          this.scene.start('MenuScene') //switch Scene
          this.soundBtnExitClick()  // play sound
    })
  }


  update() {}
} 
