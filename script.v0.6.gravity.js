(function() {

  /**
   * Gravity & other Forces
   * ********************** */

  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  var bRender  = true;
  var bRunning = false;

  var input = { dx: 0, dy : 0 };

  var isLeft  = false;
  var isRight = false;
  var isJump  = false;
  var isHover = false;

  window.addEventListener('keydown', function(evt) {
    if(evt.keyCode == 27 || evt.keyCode == 13 || evt.keyCode == 32) {
      if(bRunning)
        bRunning = false;
      else
        bRunning = true;
    }
    
    if (evt.keyCode == 38 && !isJump) {              // space
      input.dy = -1.3;
      isJump = true;
    } else if (evt.keyCode == 37 && !isHover) {       // left
      input.dx = -2;
      isLeft = true;
    } else if (evt.keyCode == 39 && !isHover) {      // right
      input.dx = 2;
      isRight = true;
    }
  }, false);
  
  window.addEventListener('keyup', function(evt) {
    if (evt.keyCode == 38 && isJump) {               // up
      input.dy = 0;
      isJump = false;
    } else if (evt.keyCode == 37 && isLeft) {        // left
      input.dx = 0; 
      isLeft = false;
    } else if (evt.keyCode == 39 && isRight) {      // right
      input.dx = 0;
      isRight = false;
    }
  });

  /**                                                                                                    **/
  
  var Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    this.normalize = function() {
      var l = this.length();
      if(l === 1) return;
      this.x /= l;
      this.y /= l;
      return this;
    }
  };
  
  /**                                                                                                    **/

  var Box = function(x, y, w, h) {
    this.v = new Vector(0, 0);      // velocity
    this.a = new Vector(0, 0);      // acceleration
    this.p = new Vector(x, y);      // position
    this.m = 1;                     // mass
    this.w = w;                     // width
    this.h = h;                     // height
    this.update = function(dt) {
      
      // TODO: foreach(forces : force) { change this position }
      // console.log(Gravity);

      this.a.x += Gravity.a.x; this.a.y += Gravity.a.y;
      
      if(!isHover) { this.v.x += input.dx; }  this.v.y += input.dy;
      
      this.v.x += this.a.x;  this.v.y += this.a.y;
      this.p.x += this.v.x;  this.p.y += this.v.y;
      
      if(this.p.y + this.h >= canvas.height - Gravity.ground.h) {
        this.p.y = canvas.height - Gravity.ground.h - this.h;
        this.a.x = this.a.y = this.v.x = this.v.y = 0;
      }
      
      isHover = this.v.y != 0;
    }
  };
  
  /**                                                                                                    **/
  
  var World = { scale: 1/100 };
  var Force = function() { };

  var Ground = function(h) {
    this.h = h | 0;
  }
  
  var Gravity = new function() {
    this.a = new Vector(0, 9.81 * World.scale);
    // this.direction = new Vector(0, 1).normalize();

    this.ground    = null;
    this.bind = function(ground) {
      this.ground = ground;
    };
  };
  
  /**                                                                                                    **/
  
  var box    = new Box(10, 10, 30, 50);
  var ground = new Ground(10);
  Gravity.bind(ground);
  
  function render() {
    context.clearRect(0, 0, 640, 360);    
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.rect(box.p.x, box.p.y, box.w, box.h);
    context.closePath();
    context.stroke();
    
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "brown";
    context.rect(0, canvas.height - ground.h, canvas.width, canvas.height);
    context.closePath();
    context.stroke();
  }
  
  function update() {
    box.update(0);
  }
  
  render();
  (function() {
    if(bRunning) {
      update();
      if(bRender)
        render();
    }
    setTimeout(arguments.callee, 1000 / 60);
  })();
  
})();