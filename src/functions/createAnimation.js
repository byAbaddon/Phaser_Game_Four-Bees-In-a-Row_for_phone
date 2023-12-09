function createAnimationByArrayOfImages(currentScene = null, key = '', arrayImages = [], repeat = -1, frameRate= 10) {
 const animation =  currentScene.anims.create({
    key,
    frames: arrayImages.map(imageKey => ({ key: imageKey })),
    frameRate,
    repeat,
    
 })
  
  return animation
}


function createAnimationBySpriteOfImages(currentScene = null, key = '', spriteName = null, start = 0, end = 0, repeat = -1, frameRate = 10) {
  const spiteAnimation = currentScene.anims.create({
    key,
    frames: currentScene.anims.generateFrameNumbers(spriteName, { start, end }),
    frameRate,
    repeat,
  })
  return spiteAnimation
}


export { createAnimationByArrayOfImages, createAnimationBySpriteOfImages }

