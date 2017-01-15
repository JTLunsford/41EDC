module.exports = (game)=>{
    let tile = game.assets['s'].textures['HalfBrick0'];
    tile.baseTexture.scaleMode = game.pixi.SCALE_MODES.NEAREST;
    
    game.halfbricks = new game.pixi.particles.ParticleContainer();
    // game.halfbricks.position.x = 0;
    // game.halfbricks.position.y = 0;
    game.halfbricks.width = game.config.world.width;
    game.halfbricks.height = game.config.world.height;
    
    for (let x = 0; x < 8 * 8 * 8 * 8; x=x+8)
    {
        for (let y = 0; y < 8 * 8 * 8 * 8; y=y+8)
        {
            //console.log(x,y);
            let brick = new game.pixi.Sprite(tile);
            brick.position.x = x;
            brick.position.y = y;
            game.halfbricks.addChild(brick);
        }
    }

    
    // let bricks = new game.pixi.extras.TilingSprite(tile, game.config.world.width * .25, game.config.world.height * .25);
    // bricks.position.x = 0;
    // bricks.position.y = 0;
    // bricks.width = game.config.world.width;
    // bricks.height = game.config.world.height;
    game.dungeon.addChild(game.halfbricks);
}