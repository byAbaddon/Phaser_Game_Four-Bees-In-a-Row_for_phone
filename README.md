# Phaser_Game_Three_Games_For_Two_Plyaers

### Created a project using:
+ Phaser 3
+ JS
+ Simple - HTML / CSS
+ webpack
+ bable
+ cordova
+ android stuido
+ 

## Playing the game
Three fun logic games for two players.
1) Four in a line;
- The goal is for each player to be the first to build a line of four identical symbols in a column or diagonal, and the strategy may include blocking the opponent's symbols.

2) Memory emoticons cards;
- The race is for the player to be the first to open 6 pairs of the same card/symbol before the other player. The game starts after a draw, with the player starting first, opening cards until he can guess consecutive pairs, if he fails, the other player starts playing, and so everything is repeated until the cards run out or one of the two opens the first 6 matching pairs.

3) "Simon Says" ;
- Is a classic memory and attention game that is often used as an exercise in schools and training programs to improve players' ability to follow sequences. At start, a certain number of sequences of planets will be shown, according to the progress of the levels, and players who will take turns, according to the drawn lot, will have to play them according to their order. If one of them makes a mistake, he loses, and accordingly the other wins. When all planets are known, the game ends in a draw.


```diff 
! P.S.
@@ -- @@
+ --
- Beta version /may have some bugs
```

## Short video intro:
https://youtu.be/oSAAoSDEW7k

## Screenshots:
![0](https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/assets/51271834/52f8d6a0-53d1-4932-a434-5b4165a50c96)
![1](https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/assets/51271834/a106116f-d99f-42c1-99e7-c5fa0364db86)
![2](https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/assets/51271834/119a9305-cfee-461e-87ad-4d19c6302de5)
![6](https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/assets/51271834/8485fec2-e3a7-4569-908f-c4186277e78f)
![4](https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/assets/51271834/e98d566f-2490-4941-8ea1-d5d023931c42)
![8](https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/assets/51271834/e8678cf7-41bc-47a3-a48e-18969075e61f)
![9](https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/assets/51271834/01f68261-a391-45ca-8b81-d3ed17366cd8)
![10](https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/assets/51271834/7ea1dca7-a1f3-463e-a9f2-6ebde77384c7)


### Download
#### Created with Phaser 3 and converted for android mobile app.
##### download apk file:
https://github.com/byAbaddon/Phaser_Game_Three_Games_For_Two_Plyaers_for_phone/releases/tag/game


### Prerequisites
- [Phaser 3](https://phaser.io)

#### Year:
2023

### Developer
By Abaddon

<br>
<br>

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

 ```
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
 ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
