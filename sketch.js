var player,enemy,area,PLAY=1,END=0,gameState = PLAY;//,camera; 

var areaImage,enemy1Image,enemy2Image,enemy3Image,playerImage,enemyGroup,survivalTime=0;
var enemies=[] 


function preload(){

  areaImage=loadImage("background.png");
  enemy1Image=loadImage("enemy1.png");
  enemy2Image=loadImage("enemy2.png");
  enemy3Image=loadImage("enemy3.png");
  playerImage=loadImage("player.png");
  
}                                                   

function setup() {
 createCanvas(windowWidth,windowHeight);
  
  area = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight/2)
  area.addImage(areaImage);
  area.scale = 5;
  area.velocityX=-5;

  player = createSprite(100,windowHeight-200,50,50)
  player.addImage(playerImage);
  player.setCollider("rectangle",0,0,60,80)
  
  enemyGroup = new Group()
  
}



function draw() {
  background(20,200,200);
  camera.position.x=player.x
  if (gameState === PLAY){
    
    survivalTime = survivalTime+(Math.round(frameCount/60));
    spawnEnemies();
    drawSprites();
  }
  
  if (camera.position.x>area.x){
    area.x=windowWidth/2
  }
  
  if (keyDown("up") && (gameState === PLAY)){
    player.y=player.y-5;
  }
  
  if (keyDown("down") && (gameState === PLAY)){
    player.y=player.y+5;
  }
  
  
  
  
 
  
  if (enemyGroup.isTouching(player) && (gameState === PLAY)){
    gameState = END
  }
  
  /*if (player.x<-10){
    gameState = END
  }*/
  
  if (gameState === END){
    area.destroy();
    stroke(0)
    strokeWeight(5)
    fill(20,150,250)
    textSize(100)
    text("Game Over",player.x,200)

    stroke(0)
    strokeWeight(3)
    fill(20,150,250)
    textSize(50)
    text("Survival Time:"+survivalTime,player.x,300) 
  }
  
  
  
  
  console.log(camera)
  
}

function spawnEnemies (){
  var rand = Math.round(random(1,3))
  
  if (player.x < windowWidth) {
    if (frameCount % 30 === 0){
    enemy=createSprite(camera.position.x+400,random(200,windowHeight-200),50,50)
    enemy.setCollider("rectangle",0,0,60,80)
    enemy.velocityX=-8;
    enemy.scale=0.8
    enemyGroup.add(enemy)
    enemy.lifetime=1200;
    if (rand === 1){
      enemy.addImage(enemy1Image)
    }
    
    if (rand === 2){
      enemy.addImage(enemy2Image)
      enemy.x=windowWidth-100
    }
    
    if (rand === 3){
      enemy.addImage(enemy3Image)
      enemy.x=windowWidth-windowWidth+100
    }
    
  }
  
}

}
