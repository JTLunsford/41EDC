module.exports = (game)=>{
    
    game.screen = new game.pixi.Container();
    
    game.dungeon = new game.pixi.Container();
    game.dungeon.position.x = 0;
    game.dungeon.position.y = 0;
    game.dungeon.width = game.config.world.width;
    game.dungeon.height = game.config.world.height;
    // game.dungeonFilter = new game.pixi.filters.ColorMatrixFilter();
    // game.dungeonFilter.hue(90);
    // game.dungeon.filters = [game.dungeonFilter];
    // let matrix = game.dungeonFilter.matrix;
    // // for(let x = 0; x < matrix.length; x++){
    // //     matrix[x] = Math.random() > .5 ? 1 : 0;
    // // }
    // console.log(matrix);
    // // let count = .5;
    // // matrix[1] = 0;
    // // matrix[2] = .5;
    // // matrix[3] = 0;
    // // matrix[4] = 0;
    // // matrix[5] = 0;
    // // matrix[6] = 0;
    
    game.actors = new game.pixi.Container();
    game.grid = new game.pixi.Container();
    
    game.grid.position.x = 0;
    game.grid.position.y = 0;
    game.grid.width = game.config.world.width;
    game.grid.height = game.config.world.height;
    
    for (let x = 0; x < game.config.world.width; x=x+(8 * 8))
    {
        for (let y = 0; y < game.config.world.height; y=y+(8 * 8))
        {
            if(x % 8 * 8 === 0){
                for(let xc = 0; xc < x.toString().length; xc++){
                    let letter = game.assets['f'].textures[x.toString()[xc]];
                    letter.baseTexture.scaleMode = game.pixi.SCALE_MODES.NEAREST;
                    let ls = new game.pixi.Sprite(letter);
                    ls.position.x = x+(xc*8);
                    ls.position.y = y;
                    game.grid.addChild(ls);
                }
            }
            if(y % 8 * 8 === 0){
                for(let yc = 0; yc < y.toString().length; yc++){
                    let letter = game.assets['f'].textures[y.toString()[yc]];
                    letter.baseTexture.scaleMode = game.pixi.SCALE_MODES.NEAREST;
                    let ls = new game.pixi.Sprite(letter);
                    ls.position.x = x+(yc*8);
                    ls.position.y = y+8;
                    game.grid.addChild(ls);
                }
            }
        }
    }
    
    game.screen.addChild(game.dungeon);
    game.screen.addChild(game.actors);
    game.screen.addChild(game.grid);
}