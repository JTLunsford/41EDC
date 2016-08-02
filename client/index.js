const styles = require("./styles/main.css");
const PIXI = require('pixi.js');
const keyboard = require('pixi-keyboard');
const TWEEN = require('tween.js');
const Vector = require('victor');

const game = {
    PIXI:PIXI,
    TWEEN:TWEEN,
    Vector:Vector
}
game.gameCanvas = document.getElementById('game');
game.config = {
	"debugBounds": false,
	"stt": 50,
	"fps": 60,
	"lerpTime": 50,
	"maxDepth": 9,
	"world": {
		"height": 10240,
		"width": 10240,
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
		"width": 150,
		"height": 150,
		"shoulderHeight": 25,
		"query": {
			"width": 1440,
			"height": 900,
			"offsetY": -100
		},
		"speed": {
			"base": 16
		},
		"health": 10
	},
	"weapon": {
		"melee": {
			"width": 47,
			"height": 131,
			"thrust": {
				"distance": 75,
				"cooldown": 325,
				"damage": 1
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
	config.player.query.width,
	config.player.query.height,{
	view: gameCanvas,
	resolution:1,
	antialiasing: true, 
	backgroundColor: 0x009900,
	autoResize: true
});

game.ratio = config.player.query.width / config.player.query.height;

game.states = { 
    
}

game.loaded = (loader,assets)=>{
    game.loader = loader;
    game.assets = assets;
};

game.PIXI.loader
	.add('font', './assets/41EDC_Font.json')
	.add('sprites', './assets/41EDC_SpriteSheet.json')
	.load(game.start);