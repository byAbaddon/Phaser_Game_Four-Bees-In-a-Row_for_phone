function createAudio(currentScene = null, soundName, volume = 1, loop = false, delay = 0, playOnce=false, duration, fadeOut = false, detune = 50, rate = 1, sek = 0) {
  let musicConfig = {
    volume, //default 1
    loop, //default false 
    delay, //default 0
    detune, //default 5
    rate, //default 1
    sek, //default 0  
    duration //default 0  set if fadeOut options active 
  }

  let music = currentScene.sound.add(soundName, musicConfig)
  // if option fadeOut is True  (warning!!!) input duration to stop
  if (fadeOut) {
    currentScene.tweens.add({
      targets: music,
      volume: 0,
      duration: musicConfig.duration,
      onComplete: () => {
        music.stop(); // Stop the sound after fading out
      }
    })
  
  if(playOnce) {
      music.once('play', function () { console.log('play once');})
  } 

  }
  return music //.play()

}

export default createAudio