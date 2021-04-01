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
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat;

function preload()
{
  bg_img = loadImage('assets/background.jpg');
  food = loadImage('assets/melon.png');
  rabbit = loadImage('assets/Rabbit-01.png');

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
  
  button = createImg('assets/cut_btn.png');
  button.position(230,40);
  button.size(40,40);
  button.mouseClicked(drop);
  
  rope = new Rope(6,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.changeAnimation('blinking');
  
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
      pointB:{x:5,y:5},
      length:5,
      stiffness:0.01
    });
    World.add(engine.world,fruit_con)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,60,60);
  }

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();
  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }

}

function drop()
{
  rope.break();
  World.remove(engine.world,fruit_con);
  fruit_con = null;
}
function keyPressed()
{
  if(keyCode==LEFT_ARROW)
  {
    airblow();
  }
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.x,sprite.y);
          //console.log(d);
          if(d<=70 && fruit_con ==null )
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true;
            }
            else{
              return false;
            }
         }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
}