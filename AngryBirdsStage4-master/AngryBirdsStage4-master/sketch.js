const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform, backgroundImg2;
var bird, slingShot;
var bg;
var gameState = 'onSling';
var score = 0;
function preload() {
    
    getTime();
}

function setup(){
    var canvas = createCanvas(1000,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(100,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    slingshot2 = new SlingShot2(bird.body,{x:200,y:50});
    
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    textSize(20);
    fill("white");
    text("Score: "+score, width-100,50);
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
    platform.display();
    slingshot2.display();
    bird.display();

    slingshot.display(); 

    pig1.score();
    pig3.score();
    //log6.display();
}

function mouseDragged(){
    if(gameState != 'launch'){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    slingshot2.fly();
    gameState = 'launch';
}

function keyPressed(){
    if(keyCode == 32){
      //  slingshot.attach(bird.body);
      //  slingshot2.attach(bird.body);
    }
}
async function getTime(){
    var full = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var fullJSON = await full.json();
    var dateTime = fullJSON.datetime;
    var hour = dateTime.slice(11,13);
    console.log(hour);
    if(hour >= 6 && hour <= 9){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
}