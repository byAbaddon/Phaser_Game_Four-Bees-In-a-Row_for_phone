import {cfg} from '../index.js'
// Assuming you have a globe sprite called 'globe' already loaded and positioned in your scene

//-------------------- Create an animation to rotate 
function createRotateAnimation(currentScene = null, arg) { //this,  image
 const centerX = arg.x + arg.displayWidth / 2
 const centerY = arg.y + arg.displayHeight / 2
 arg.setPosition(centerX , centerY ).setOrigin(0.5, 0.5)

 
  currentScene.tweens.add({
    targets: arg,
    angle: 360, // Destination angle (full rotation)
    duration: 15000, // Duration of the rotation animation in milliseconds
    repeat: -1, // Repeat indefinitely
    yoyo: true,
    ease: 'Linear', // Easing function (linear for constant speed)
  });
}


//-------------------- Create an animation to Text 
function createTextChangeColorAnimation(currentScene = null, textName = '') {
  
  const text = currentScene.scene.scene.children.list.find(x => x.name == textName)
  if (!text)  return console.error('Text not found.');
    
   
  //  Apply the gradient fill.
  let gradient = text.context.createLinearGradient(0, 0, 0, text.height);
  gradient.addColorStop(0, '#111111');
  gradient.addColorStop(0.2, '#ff0000');
  gradient.addColorStop(0.4, '#ffff00');
  gradient.addColorStop(0.5, '#0000ff');
  gradient.addColorStop(0.7, '#ffffff');
  gradient.addColorStop(0.8, '#ffff00');
  gradient.addColorStop(0.9, '#ff0000');
  text.setFill(gradient);
  
 currentScene.tweens.add({
    targets: text,
    duration: 500,
    fillStyle: { gradientStops: gradient}, // Set the gradient stops here
    yoyo: true,
    repeat: -1,
  })
}


//-------------------- Create an animation to Text Right Left
function crateTextAnimationRightLeftMove(currentScene=null, arg, x=50, duration=555, repeat=-1, delay=500, yoyo=true ) {
  currentScene.add.tween({
    targets: arg,
    x: x,             // go to end of screen
    duration,
    yoyo, 
    repeat,	    
    delay,
  })
}


//------------------TransitionBetweenScene
//must settimeout to show animation before switch to scene
function transitionBetweenScene(currentScene=null, cfg) {
  //circle
  let circle = currentScene.add.circle(cfg.width / 2,cfg.height / 2, 0, 0x000000, 0.9)
  
  //circle tween
  currentScene.tweens.add({
    targets: circle,
    radius: 500,
    duration: 400,
    yoyo: true,
    loop: 0,
    hold: 10,
  })

  return circle
}




export {
  createRotateAnimation,
  createTextChangeColorAnimation,
  crateTextAnimationRightLeftMove,
  transitionBetweenScene,
}
