define(['shared', 'wee'], function (shared, Wee) {
	//http://blog.sethladd.com/2011/09/box2d-javascript-example-walkthrough.html

	var b2 = shared.b2
	,   CANVAS_WIDTH = shared.canvas.width
	,   CANVAS_HEIGHT = shared.canvas.height
	,   SCALE = 30
	;

    var world = new b2.World(
    	new b2.Vec2(0, 10),
    	true
	);

	var fixDef = new b2.FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2.BodyDef;
	bodyDef.type = b2.Body.b2_staticBody;
		
	// positions the center of the object (not upper left!)
	bodyDef.position.x = CANVAS_WIDTH / 2 / SCALE;
	bodyDef.position.y = CANVAS_HEIGHT / SCALE;

	fixDef.shape = new b2.PolygonShape;
		
	// half width, half height.
	fixDef.shape.SetAsBox((600 / SCALE) / 2, (10/SCALE) / 2);

	world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.type = b2.Body.b2_dynamicBody;
	for(var i = 0; i < 50; ++i) {
		if(Math.random() > 0.5) {
			fixDef.shape = new b2.PolygonShape;
			fixDef.shape.SetAsBox(
				Math.random() + 0.2, //half width
				Math.random() + 0.2 //half height
			);
		} else {
			fixDef.shape = new b2.CircleShape(
				Math.random() + 0.1 //radius
			);
		}
		bodyDef.position.x = Math.random() * 25;
		bodyDef.position.y = Math.random() * 10;
		world.CreateBody(bodyDef).CreateFixture(fixDef);
	}

    //setup debug draw
	var debugDraw = new b2.DebugDraw();
	debugDraw.SetSprite(shared.ctx);
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2.DebugDraw.e_shapeBit | b2.DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);    



	function update() {
		world.Step(
			1 / 60   //frame-rate
			,  10       //velocity iterations
			,  10       //position iterations
		);
 		world.DrawDebugData();
		world.ClearForces();
		
	}; // update()

	Wee.setRender(update);
	Wee.start();

});
