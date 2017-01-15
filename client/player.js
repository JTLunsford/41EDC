module.exports = (game)=>{
    
    game.player = {};
    
    var playerActiveArray = [];

    for (var i=0; i < 3; i++)
    {
        let frame = game.assets['s'].textures['PlayerActive'+i];
		frame.baseTexture.scaleMode = game.pixi.SCALE_MODES.NEAREST;
        playerActiveArray.push(frame);
    };
    
    game.player.active = new game.pixi.extras.AnimatedSprite(playerActiveArray);
    game.player.active.position.x = 0;
    game.player.active.position.y = 0;
    game.player.active.width = 8 * 8;
    game.player.active.height = 8 * 8;
    game.player.active.animationSpeed = game.config.animationSpeed;
    game.player.active.play();
    game.actors.addChild(game.player.active);
}