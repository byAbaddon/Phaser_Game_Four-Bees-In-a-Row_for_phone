import {Scene} from'phaser';
import * as fnc from '../index.js';
import {cfg} from '../index.js'

export class LoadScene extends Scene {
  constructor() {
    super('LoadScene')
  }
  init() {
    console.log('LoadScene was loading...')
  }

  preload() {
    //============================(((LOAD GLOBAL DATA)))================================
    //============ LOAD JSON VARIABLE DATA TO STORE FOR GLOBAL USE ALL SCENES ==========
    //--- LOAD AUDIO FORM JSON  multi files data and Extract the enName and sound path
   
  
    //===========================END LOAD JSON==========================
    //-------------load global images
    // this.load.image('phoneImage' , "../assets/images/phone/landscape.png")
    // cfg.global.globalImages = ['phoneImage']
    
    //============================(((END LOAD GLOBAL DATA)))================================
  }

  create() {
    //---------------- add background by black color
    this.cameras.main.setBackgroundColor('#000000')

    //---------------- this load all fonts //'aAblasco', - not support table this version
    const customFontsArray = ['cute', 'candy', 'born', 'mario', 'baristo', 'caps', 'falconpunch']
    for (const font of customFontsArray) {
      fnc.createText(this, 0, 0, 'txt', '1px', null, null, null, font).setVisible(false)       
    }
    //---add more fonts
  
    //----------------------------------------automatic go to Intro scene
    setTimeout(() => this.scene.start('IntroScene'), 500)
  }
}
