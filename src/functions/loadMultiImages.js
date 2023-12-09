function loadMultiImages(currentScene = null, imgName = String, imgPath = String, numPictures = Number,) {
  let arrPic = []
  for (let i = 1; i <= numPictures; i++) {
    currentScene.load.image(`${imgName + i}`, `${imgPath + i}.png`)
    arrPic.push(imgName + i)
  }  
  return arrPic
}

export default loadMultiImages