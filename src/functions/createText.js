function createText(currentScene = null, x = 0, y = 0, text = 'Hello', fontSize = '46px', color = '#fff',
  backgroundColor = null, fontStyle = null, fontFamily = 'cute' ) { //'aAblasco'

  const textConfig = {
    fontFamily, // default 'Courier'
    fontSize,
    color,
    backgroundColor,
    fontStyle,
    stroke: '#fff',
    strokeThickness: 0,
    shadow: {
          offsetX: '1',   //default 0
          offsetY:'1',    //default 0
          color: 'black',    //default #000
          blur: 'blur',           //0
          stroke: true,   // false
          fill: true      //false
      },
      align: 'left',  // 'left'|'center'|'right'|'justify'
      padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
      },
      maxLines: 0,
      lineSpacing: 0,
      fixedWidth: 0,
      fixedHeight: 0,
      rtl: false,
      testString: '|MÉqgy',
      wordWrap: {
          width: null,
          callback: null,
          callbackScope: null,
          useAdvancedWrap: false
    },
      metrics: false
      // metrics: {
      //     ascent: 0,
      //     descent: 0,
      //     fontSize: 0
      // }

  }

  let txt = currentScene.add.text(x, y, text, textConfig);
  txt.name = text // set var name
  return txt
}


export default createText