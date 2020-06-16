var trex,trex_running,trex_collided;
var ground,invisibleGround, grounImage;
var cloudGroup, cloudImage;
var gameover,restart,gameoverImg,restartImg;
var obstacleGroup, obstacle1, obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
  
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload() {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground =createSprite(300,180,600,20);
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
   
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  restart = createSprite(300,150,10,10);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.5;
  
  gameover = createSprite(300,100,10,10);
  gameover.addImage(gameoverImg);
  gameover.visible = false;
  gameover.scale = 0.5;
  
}

function draw() {
  background(250);
  text("Score : " + score, 500,50 )
  
  if(gameState === PLAY) {
    if(keyDown("space") && trex.y >= 150) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;
    
    score = score + Math.round(getFrameRate()/50);
    
    ground.velocityX = -(6 + 3*score/100);
    if(ground.x < 0) {
      ground.x = ground.width/2;
    }
    spawnClouds();
    spawnObstacle();
    
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
    }
    
  }
  else if(gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
 
    trex.changeAnimation("collided",trex_collided);
  
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
  }
  if(mousePressedOver(restart)){
    reset();
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function reset() {
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  score = 0;
}
function spawnClouds() {
  if(frameCount%60 === 0) {
    var cloud = createSprite(600,120,20,20);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(80,120));
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 200;
    cloudGroup.add(cloud);
  }
}

function spawnObstacle() {
  if(frameCount%60 === 0) {
    var obstacle = createSprite(600,160,20,20);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
    var rand = Math.round(random(1,6));
        
    switch(rand) {
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
  }
}