window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;
  let enemies =[];

  class InputHandler { // This handles the inputs on the keyboard
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
        console.log(e.key); //listens for events
      });
      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        console.log(e.key); //listens for events
      });
    }
  }
  // hold s all acctive keys

  class Player {

    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 200;
        this.height = 200;
        this.x = 0;
        this.y = this.gameHeight = this.height;
        this.image = document.getElementById('playerImage');
        this.FrameX = 0;
        this.FrameY = 0;
        this.speed = 0;
        this.vy=0;
        this.weight=0;
    }
        draw(context){
            context.fillStyle ="white";
            context.fillRect(this.x, this.y,this.width, this.height)
            context.drawImage(this.image,this.FrameX*this.width,this.FrameY*this.height, 
            this.width, this.height,this.x,this.y,this.width,this.height);
        }
        update(input){
            if(input.keys.indexOf("ArrowRight") > -1){
                this.speed = 5;
            } else if( input.keys.IndexOf('ArrowLeft')> -1){
                this.speed = -5
            }else if( input.keys.IndexOf('ArrowUp')> -1 && this.onGround()){
                this.vy -= 32;
            }else{
                this.speed = 0;
            }
            //horizontal movement
            this.x+=this.speed;
            if(this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.gameHeight) this.x = this.gameWidth- this.width
            //vertical movement
            this.y+=this.vy;
            if (this.onGround()){
                this.vy+=this.weight
                this.FrameY=1
            }else {
                this.vy=0;
            }
            if ( this.y > this.hgamneheight -this.height) this.y =this.gameHeight -this.height
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    }
  

  class Background {
  // handles backgrounds
  constructor(gameWidth,gameHeight){
    this.gameWidth=gameWidth;
    this.gameHeight= gameHeight;
    this.image=document.getElementById("backgroundImage")
    this.x=0
    this.y=0;
    this.width=2400;
    this.height=720;
    this.speed=7;
  }
  draw(context){
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y,this, width, this.height);
  }
  update(){
    this.x-= this.speed;
    if(this.x < 0 - this.width) this.x = 0;
  }
}
  class Enemy { 
    constructor(gameWidth,gameHeight){
    this.gameWidth=gameWidth;
    this.gameHeight= gameHeight;
    this.image=document.getElementById("enemyImage")
    this.width=160;
    this.height=119;
    this.x=this.gameWidth;
    this.y=this.gameHeight -this.height;
    this.FrameX= 0;
    this.speed = 8
  }
draw(context){
    context.drawImage(this.image,0 * this.width,0, 
        this.width, this.height, this.x, this.y, this.width, this.height);
}
update(){
    this.x-=this.speed;
}
}
  //handle enemies
  

  enemies.push(new Enemy (canvas.width, canvas.height));
  function handleEnemies(deltaTime) {
    if ( enemyTimer > enememyInterval + randomEnemyInterval){
        enemies.push(new Enemy(canvas.width, canvas.height))
    }else{
        enemyTimer+=deltaTime
    }
    enemies.forEach(enemy =>{
        enemy.draw(ctx);
        enemy.update();
    })

  }

  function displayStatusText() {}
  const input = new InputHandler();
  const background = new Background(canvas.width, canvas.height);
  const player = new Player(canvas.width,canvas.height);
  let lastTime = 0;
  let enemyTimer =0;
  let enememyInterval =1000; 
  let randomEnemyInterval  = Math.random()* 1000 + 500;


  player.draw(ctx);
  player.update();

  function animate() {
    const deltaTime= timeStamp -lastTime;
    lastTime =timeStamp;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx)
    player.update(input);
    requestAnimationFrame(animate);
  }
  animate();
});
