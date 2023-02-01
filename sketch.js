
var trex ,trex_running;
var edges;
var ground, invisibleGround;
var groundImage;
var cloud, cloudImage;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var obstaclesGroup, cloudsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

  function preload(){
      trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
      groundImage = loadImage("ground2.png");
      cloudImage = loadImage("cloud.png");

      obstacle1 = loadImage("obstacle1.png");
      obstacle2 = loadImage("obstacle2.png");
      obstacle3 = loadImage("obstacle3.png");
      obstacle4 = loadImage("obstacle4.png");
      obstacle5 = loadImage("obstacle5.png");
      obstacle6 = loadImage("obstacle6.png");
  }

  function setup(){
    createCanvas(600,200);
    
    //crear sprite del t-rex.
    trex = createSprite(50, 160, 20, 50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;

    //creacion del suelo
    ground = createSprite(200,180,400,20);
    ground.addImage("ground", groundImage);

    //crear un sprite invisible
    invisibleGround = createSprite(200,190,400,20);
    invisibleGround.visible = false;

    //variable que guarda los bordes
    edges = createEdgeSprites();

    /*var rand = Math.round(random(1,100));
    console.log(rand);*/

    obstaclesGroup = new Group();
    cloudsGroup = new Group();
  
  }

function draw(){
  background("white");

  //console.log(frameCount);

  //texto para la puntuación
  fill("black");
  text("Puntuación: " + score, 500, 50);


  if(gameState == PLAY){
  //Suelo moviendose
  ground.velocityX = -5;

  //generar la puntuación
  score = score + Math.round(frameCount / 60);

  if(ground.x<0){
    ground.x = ground.width/2;
  }

  //salto del trex
  if(keyDown("space") && trex.y >= 150 ){
    trex.velocityY = -10;
  }
  //agregando gravedad al dino
  trex.velocityY = trex.velocityY + 0.5

    //aparece las nubes y obstaculos
    spawnClouds();
    spawnObstacles();

  if(obstaclesGroup.isTouching(trex)){
    gameState = END;

  }

  }
  else if(gameState == END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }
  


  trex.collide(invisibleGround);  

  drawSprites();

}

function spawnClouds(){
  if(frameCount % 60 == 0){
    cloud = createSprite(600, 100, 40, 10);
    cloud.velocityX = -3;
    cloud.addImage(cloudImage);
    cloud.scale = 0.4;
    cloud.y = Math.round(random(10,95));

    //console.log(trex.depth);
    //console.log(cloud.depth);

    //ajuste de profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //asignar un ciclo de vida a la variable
    cloud.lifetime = 220;

    //añadir cada nube en el grupo
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount % 60 == 0){
    obstacle = createSprite (600, 165, 10, 40);
    obstacle.velocityX = -6;

    //generar obstaculos al azar
    var rand = Math.round(random(1,6));
    switch (rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default: break;
    }

    //asignar escala y ciclo de vida
    obstacle.scale = 0.5;
    obstacle.lifetime = 220;

        //añadir cada obstaculo en el grupo
        obstaclesGroup.add(obstacle);
  }
}
