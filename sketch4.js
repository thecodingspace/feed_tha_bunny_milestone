const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var bunny;
var button;
var bg_img,fruit_img,bunny_img;

function preload()
{
  bg_img = loadImage('assets/background.jpg');
  fruit_img = loadImage('assets/melon.png');
  bunny_img = loadImage('assets/Rabbit-01.png');

  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png");
  eat = loadAnimation("assets/eat_0.png" , "assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
  
  blink.playing = true;
  eat.playing = true;
  eat.looping = false; 
  
}

function setup() {
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.changeAnimation('blinking');

  button = createImg('assets/cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  ground = new Ground(200,690,600,20);
  rope = new Rope(6,{x:245,y:30});

  var fruit_options={
    density:0.001
    }

  fruit = Bodies.circle(300,300,15,fruit_options);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = Constraint.create(
    {
      bodyA:rope.body.bodies[5],
      pointA:{x:0,y:0},
      bodyB:fruit,
      pointB:{x:0,y:0},
      length:0,
      stiffness:0.01
    });
    World.add(engine.world,fruit_con);

    imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,500,700);
  ground.show();
  rope.show();

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,60,60);
  }

  Engine.update(engine);
  drawSprites();
}

function drop()
{
  rope.break();
  World.remove(engine.world,fruit_con);
  fruit_con = null;
}

function collide(body,sprite)
{
  
}