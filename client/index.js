const styles = require("./styles/main.css");
const PIXI = require('pixi.js');
const keyboard = require('keypress.js');
const TWEEN = require('tween.js');
const Vector = require('victor');
const player = require('./player');
const layers = require('./layers');
const loop = require('./loop');
const dungeon = require('./dungeon');

class Game extends require('iron-beam').EventEmitter {}

const game = Object.assign(new Game(),{
    pixi:PIXI,
    tween:TWEEN,
    vector:Vector
});
game.pixi.settings.SCALE_MODE = 'nearest';
game.gameCanvas = document.getElementById('game');
game.config = {
	"animationSpeed": 0.1,
	"debugBounds": false,
	"stt": 50,
	"fps": 60,
	"lerpTime": 50,
	"maxDepth": 9,
	"baseGrid": 8,
	"world": {
		"height": 8 * 8 * 8 * 8,
		"width": 8 * 8 * 8 * 8,
		"resources": {
			"randomCount": 5000
		},
		"clutter": {
			"tuftCount": 5000
		}
	},
	"resources": {
		"resourceTree": {
			"width": 150,
			"height": 150,
			"health": 3
		},
		"resourceRock": {
			"width": 64,
			"height": 64,
			"health": 4
		},
		"resourceIron": {
			"width": 64,
			"height": 64,
			"health": 5
		}
	},
	"player": {
		"query": {
			"width": 8 * 8,
			"height": 8 * 8,
			"offsetY": -100
		},
		"speed": {
			"base": 8
		},
		"health": 8
	},
	"weapon": {
		"melee": {
			"width": 47,
			"height": 131,
			"thrust": {
				"distance": 75,
				"damage": 8
			}
		}
	},
	"xp": {
		"kills": {
			"player": {
				"percent": 0.1
			},
			"resource": {
				"resourceTree": {
					"static": 9
				},
				"resourceRock": {
					"static": 12
				},
				"resourceIron": {
					"static": 15
				}
			}
		},
		"updateFreq": 1000
	},
	"leaderboard": {
		"updateFreq": 2000,
		"size": 5
	},
	
	"redis": {
		"prefix": "slayr-io",
		"playerNameKeyExpiry": 3600000,
		"playerXpKeyExpiry": 3600000
	}
};

game.renderer = new PIXI.WebGLRenderer(
	game.config.player.query.width,
	game.config.player.query.height,{
	view: game.gameCanvas,
	resolution:1,
	antialiasing: true, 
	backgroundColor: 0x000000,
	autoResize: true
});

game.ratio = game.config.player.query.width / game.config.player.query.height;

function resizeRenderer(){
	// if (window.innerWidth / window.innerHeight >= game.ratio) {
 //       var w = window.innerHeight * game.ratio;
 //       var h = window.innerHeight;
 //   } else {
 //       var w = window.innerWidth;
 //       var h = window.innerWidth / game.ratio;
 //   }
	var w = window.innerWidth;
	var h = window.innerHeight;
    game.renderer.view.style.width = w + 'px';
    game.renderer.view.style.height = h + 'px';
    game.renderer.resize(w,h);
}

resizeRenderer();
window.onresize = resizeRenderer;

game.loaded = (loader,assets)=>{
    game.loader = loader;
    game.assets = assets;
    game.emit('assetsLoaded');
};

game.on('assetsLoaded',()=>{
	layers(game);
	player(game);
	dungeon(game);
	loop(game);
});

game.on('loadState.*',()=>{
	console.log('clearing state');	
});


game.pixi.loader
	.add('f', './assets/41EDC_Font.json')
	.add('s', './assets/41EDC_SpriteSheet.json')
	.load(game.loaded);