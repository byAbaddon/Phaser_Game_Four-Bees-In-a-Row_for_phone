import {cfg} from '../index.js'


function createGridSystem(currentScene = null) {
  currentScene.add.grid(0, 0, cfg.width, cfg.height, 40, 40, '0x057605', '', '0x00b9f2',).setOrigin(0, 0)
}

export default createGridSystem
