import {cfg} from '../index.js'


//----------check  phone orientation Portrait or Landscape
function checkOrientation(currentScene = null) {
  currentScene.orientationMessage = currentScene.add.text(currentScene.scale.width / 2, currentScene.scale.height / 2, '',
    { font: "30px Arial", fill: 'yellow' }).setOrigin(0.5).setDepth(101)
  
    currentScene.children.remove(currentScene.orientationImage)
    currentScene.orientationImage  = currentScene.add.image(0, 0, cfg.global.globalImages[0])
    .setOrigin(0, 0)
    .setDisplaySize(currentScene.scale.width, currentScene.scale.height)
    .setDepth(100)
    .setVisible(false)
    
    currentScene.scale.orientation = Phaser.Scale.SHOW_ALL
  // add event 'resize' to watch screen rotation position
  currentScene.scale.on('resize', function checkOrientation() {
    // check current screen position
    if (currentScene.scale.orientation !== Phaser.Scale.Orientation.LANDSCAPE) {
      // currentScene.scene.pause()
      currentScene.orientationImage.setVisible(true)
      // currentScene.cameras.main.setBackgroundColor('#000000')
      // currentScene.orientationMessage.setText('PORTRAIT orientation')
    } else {
      // currentScene.scene.resume()
      currentScene.orientationImage.setVisible(false)
      // currentScene.orientationMessage.setText('LANDSCAPE orientation')
    }
  }, currentScene)

}

export default checkOrientation
