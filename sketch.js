const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var balloon, balloonImg;
var database, position;

function preload() {
  backgroundImg = loadImage("image/backgroundImg.png");
  balloonImg = loadAnimation("image/Balloon-1.png", "image/Balloon-2.png", "image/Balloon-3.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1365, 655);
  engine = Engine.create();
  world = engine.world;

  balloon = createSprite(250, 650, 50, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.7;
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  //text(mouseX+','+mouseY, 200, 200);
  
  if (position !== undefined) {
    if(keyDown(LEFT_ARROW)){
      updatePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      updatePosition(+10,0);
    }
    else if(keyDown(UP_ARROW)){
      updatePosition(0,-10);
      balloon.scale = balloon.scale -0.0055;
    }
    else if(keyDown(DOWN_ARROW)){
      updatePosition(0,+10);
      balloon.scale = balloon.scale +0.0055;
    }
    drawSprites();
  }

    textSize(20);
  fill("white");
  strokeWeight(3);
  stroke("black");
  text("** Use Arrow Keys To Move", 50, 50);
}

function updatePosition(x, y) {
  database.ref('balloon/position').set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}
function readPosition(data) {
  position = data.val()
  balloon.x = position.x;
  balloon.y = position.y
}

function showError() {
  console.log("error in writting to database");
}