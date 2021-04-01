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

function setup() {
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
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
    World.add(engine.world,fruit_con)
}

function draw() 
{
  background(51);
  ground.show();
  rope.show();
  ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
 
}