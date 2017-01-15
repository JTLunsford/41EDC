module.exports = (game)=>{
    function animate(time){
    	requestAnimationFrame(animate);
		game.tween.update(time);
    	game.renderer.render(game.screen);
    }
    animate();
}