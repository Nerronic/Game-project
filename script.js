window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

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
        this.gameWidth= gameWidth;
        this.gameHeight= gameHeight;
        this.width=200;
        this.height=200;
        this.x=0;
        this.y=this.gameHeight = this.height;
        this.image =document.getElementById('playerImage');
    }
        draw(context){
            context.fillStyle ="white";
            context.fillRect(this.x, this.y,width, height)
            context.drawImage(this.image,5*this.width,1* this.height,this.x,this.y,this.width,this.height,);

        }
        update(){
            this.x++;
        }
    }
  

  class Background {}
  // handles backgrounds
  class Enemy {}
  //handle enemies

  function handleEnemies(params) {}

  function displayStatusText(params) {}
  const input = new InputHandler();
  const player = new Player(canvas.width,canvas.height);
  player.draw(ctx);
  player.update();

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw(ctx)
    player.update();
    requestAnimationFrame(animate);
  }
  animate();
});
