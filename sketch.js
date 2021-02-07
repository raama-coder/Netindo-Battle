var player
var monster
var Mario, Kirby, Luigi, Sonic, Waluigi, Wario, Yoshi
var MarioF, KirbyF, LuigiF, SonicF, WaluigiF, WarioF, Yoshi
var Bowser, kingKRool
var PLAY=1
var END=2
var STORY=0
var gameState=0
var playerJS, gameJS, formJS, monsterJS
var gameOver
var speed, health, strength
var speedImg, healthImg, strengthImg
var rock
var edges
var halfLife, Life=5
var halfLifeImg, LifeImg
var healthBarGr
var fire, fireImg
var playerWon=false
var Win, WinImg
var Lose, LoseImg

function preload(){
    Mario=loadAnimation("gif/marioRun.gif")
    MarioF=loadAnimation("gif/marioF.gif")
    Kirby=loadAnimation("gif/kirbyRun.gif")
    KirbyF=loadAnimation("gif/KirbyF.gif")
    Luigi=loadAnimation("gif/luigiF:R.gif")
    Sonic=loadAnimation("gif/sonicRunning.gif")
    Waluigi=loadAnimation("images/waluigiRun2.png")
    WaluigiF=loadAnimation("gif/WaluigiF.gif")
    Wario=loadAnimation("images/warioRun2.png")
    WarioF=loadAnimation("gif/warioF.gif")
    Yoshi=loadAnimation("gif/yoshiRun.gif")
    Bowser=loadAnimation("gif/bowserF.gif")
    kingKRool=loadAnimation("gif/kingK.RoolF:R.gif")
    speedImg=loadImage("powerUp/Speed.png")
    healthImg=loadImage("powerUp/Life.png")
    strengthImg=loadImage("powerUp/Strength.png")
    gameOver=loadImage("images/gameOver.png")
    LifeImg=loadImage("powerUp/Life.png")
    fireImg=loadImage("images/fireball.png")
    WinImg=loadImage("images/Win.png")
    LoseImg=loadImage("images/Lose.png")

}

function setup(){
    createCanvas(1400,600)

    playerJS=new Player()
    monsterJS=new Monster()
    gameJS=new Game()
    formJS=new Form()
  
    edges=createEdgeSprites()

    healthBarGr=new Group()

    healthBar(Life)

    pickPlayer()
    pickMonster()
    spawnFire()
}

function draw(){
    background("white")

    if(gameState==0){
        // fill("gold")
        // textSize(36)
        //text("Hi if you are wondering what has happen to the world mosters happend,\nmonsters took over the whole world it is you job to deafeat them.\nThis game is a test to see if you are good enough to destroy them.\nshow us that you are worthy and we will let you out into the battle grounds.", displayWidth/8, displayHeight/2)
      formJS.display();
    }

    if(gameState==1){
      playerJS.playerMovement()
      spawnHeart()
      healthBar(Life)
      monsterJS.monsterMovement(player)
      spawnFire()
      fight()
      formJS.hide()
    }

    if(gameState==2){
      gameJS.end()
      gameEnd()
      //formJS.playAgain()
      formJS.display()
    }
    drawSprites()
}   

function spawnHeart(){

    if(Life<6){
      if(frameCount%30==0){
      health=playerJS.boostMovement(healthImg)
      health.lifetime=width
      health.scale = 0.035;
      getLife()
    }
  }
  }
  function healthBar(life){
    var healthBarX=50
    console.log("inside health "+ life) 
    for(i=0; i<life; i++){
      var healthSpr=createSprite(healthBarX, 50, 1, 1)
      healthSpr.addImage(LifeImg)
      healthBarX+=50
      healthSpr.scale = 0.035;
      healthBarGr.add(healthSpr)
    }
  }

  function changePosistion(){
    player.x=100
    player.y=200

    monster.x=1100
    monster.y=400
  }

  function getLife(){
    console.log("outside"+health)
    if(player.isTouching(health)){
      console.log("inside"+ health)
      healthBar(Life)
      if(Life<=5){
        Life+=1
      }
    }
  }

  function fight(){
    if(player.isTouching(fire)){
      changePosistion()
      if(Life>=1){
        Life-=1
        healthBarGr.destroyEach()
      }
      healthBar(Life)
    }

    if(player.isTouching(monster)){
    gameState=2
    playerWon=true
    }
    if(Life<=0){
      gameState=2
    }
  }

  function pickPlayer(){
    player.setCollider("rectangle",0,0,player.width/6,player.height/6)
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: player.addAnimation("running",Mario);
              player.scale=0.7
              break;
      case 2: player.addAnimation("running",Mario);
              player.scale=0.7
              break;
      case 3: player.addAnimation("running",Luigi);
              player.scale=0.5
              break;
      case 4: player.addAnimation("running",Sonic);
              player.scale=0.5
              break;
      case 5: player.addAnimation("running",Waluigi);
              player.scale=0.2
              break;
      case 6: player.addAnimation("running",Wario);
              player.scale=0.2
              break;
      case 7: player.addAnimation("running",Yoshi);
              player.scale=0.6
              break;
      default: break;
    }
  }

  function pickMonster(){
    var rand = Math.round(random(1,1));
    switch(rand) {
      case 1: monster.addAnimation("running",Bowser);
              monster.scale=1.2
              monster.setCollider("rectangle",0,0,monster.width/6,monster.height/6)
              break;
      case 2: monster.addAnimation("running",kingKRool);
              monster.scale=0.5
              break;
      default: break;
    }
  }

  function spawnFire(){

    if(frameCount%30==0){
      fire=createSprite(monster.x-20,monster.y-50,10,10)
      fire.addImage(fireImg)
    }
    fire.lifetime=20
    fire.scale=0.3
    moveFire()
  }

  function moveFire(){
      if (fire.x<player.x){
          fire.velocity.x=0
      } else{
          fire.velocity.x=-0
      }
      if (fire.y<player.y){
          fire.velocity.y=0
      } else{
          fire.velocity.y=-0
      }
  }

  function gameEnd(){
    if(playerWon=true&&Life>=1){
      // Win=createSprite(width/2, height/4, 10, 10)
      background(WinImg)
    }
    if(Life<=0&&gameState==2){
      background(LoseImg)
    }
  }
