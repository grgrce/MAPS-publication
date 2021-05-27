var SAFARIMERDA;

const app = new PIXI.Application({ 
    transparent: true,  
    width: innerWidth, 
    height: innerHeight});
    document.body.appendChild(app.view);


// holder to store the aliens
const aliens = [];

const totalDudes = 11;

const icons = [['media/Vera.png','Vera_Yijun_Zhou/index.html'],['media/Patricia.png','Patricia_Kuehfuss/'],['media/dafni.png','Dafni_Melidou/'],['media/emi.png','Emilia_Martin/'],['media/Joao.png','Joao_Viegas/'],['media/petra.png','Petra_Kroon/'],['media/sophie.png','Sophie_Allerding/'],['media/will.png','Will_Boase/'],['media/Rafa.png','Rafael_Roncato/'],['media/Laura.png','Laura_Palau/'],['media/Benedikte.png','Benedikte_Bergh_Iversen/']]


for (let i = 0; i < totalDudes; i++) {
    // create a new Sprite that uses the image name that we just generated as its source
    const dude = PIXI.Sprite.from(icons[i][0]);

    // set the anchor point so the texture is centerd on the sprite
    // dude.anchor.set();

    // set a random scale for the dude - no point them all being the same size!
    // dude.scale.set( 0.03 + Math.random() * 0.1);
    dude.scale.set( innerHeight / 3000 );

    // finally lets set the dude to be at a random positionmedia
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;

   // dude.tint = 0xFF00FF;

    // create some extra properties that will control movement :
    // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
    // dude.direction = Math.random() * Math.PI * 2;
    dude.direction = Math.random() * Math.PI * 0.9;
    
    // this number will be used to modify the direction of the dude over time
    // dude.turningSpeed = Math.random() ;
    dude.turningSpeed = 0.5 ;

    // create a random speed for the dude between 2 - 4
    // dude.speed = 1 + Math.random();
    dude.speed = 1;

    // Opt-in to interactivity
    dude.interactive = true;

    // Shows hand cursor
    dude.buttonMode = true;

    // Pointers normalize touch and mouse
    dude.on('pointerdown', onClick);

    // finally we push the dude into the aliens array so it it can be easily accessed later
    aliens.push(dude);
    
    SAFARIMERDA = icons[i][1];

    function onClick() {
        window.open(SAFARIMERDA,"_self");
         //dude.scale.x *= 1.25;
         //dude.scale.y *= 1.25;
    }

    app.stage.addChild(dude);
}

// create a bounding box for the little dudes
const dudeBoundsPadding = 1;
const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding,
    app.screen.height + dudeBoundsPadding );

    
app.ticker.add(() => {
    // iterate through the dudes and update their position
    for (let i = 0; i < aliens.length; i++) {
        const dude = aliens[i];
        dude.direction += dude.turningSpeed/500 ;
        dude.x += Math.sin(dude.direction) * dude.direction;
        dude.y += Math.cos(dude.direction) * dude.speed * 0.0009;
        dude.rotation = dude.direction - Math.PI * 0.3;

        // wrap the dudes by testing their boundsmedia.
        if (dude.x < dudeBounds.x) {
            dude.x += dudeBounds.width;
        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
            dude.x -= dudeBounds.width;
        }
    }
});




