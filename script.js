
(function() {

  var requestAnimationFrame =  
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.msRequestAnimationFrame     ||
    window.oRequestAnimationFrame      ||
    function(callback) {
      return setTimeout(callback, 1);
    };
    
  var Circle = function(game, id) {
    this.id = id;
    var radius = 20;
    var color  = 'red';
    var x = Math.random() * (game.width);
    var y = Math.random() * (game.height);
    var vx = Math.random() * .2;
    var vy = Math.random() * .2;
    var context = game.getContext();
    
    this.getBounds = function() {
      return {
        top:    0,
        right:  0,
        bottom: 0,
        left:   0
      };
    };
    
    this.setColor = function(c) { color = c; }
    
    this.getVx = function()  { return vx; }
    this.setVx = function(a) { vx = a; }
    this.getVy = function()  { return vy; }
    this.setVy = function(a) { vy = a; }
        
    this.onUpdate = function(dt) {
      x += vx * dt;
      y += vy * dt;
    
      if(x - radius <= 0) { x = radius + 1; vx *= -1 };
      if(y - radius <= 0) { y = radius + 1; vy *= -1 };
      if(x + radius >= game.width)  { x = game.width  - radius - 1; vx *= -1 };
      if(y + radius >= game.height) { y = game.height - radius - 1; vy *= -1 };
      
      return true;
    };
    
    this.onRender = function() {
      // console.log('Circle::render()');
      // console.log('Circle::render() - arc('+x+', '+y+', '+ radius +', ...)');
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, true);
      context.closePath();
      context.fillStyle = color;
      context.strokeStyle = "black";
      context.fill();
      context.stroke();
      color = 'red';
      
      context.font     = "12px Arial bold";
      context.fillStyle= "white";
      context.fillText(id, x - 3, y + 6);
      
      return true;
    };
  };
  
  var Game = function() {
    var isRunning = true;
    var isUpdated = true;
    var canvas    = document.getElementById('canvas');
    var self      = this;
    var context   = canvas.getContext('2d');
    
    this.getContext = function() { return context; };
    
    this.width  = 640;
    this.height = 360;
    
    var entities = [];
    
    var update = function(dt) {
      
      
      // check collisions
      for(var i = 0, l = entities.length; i < l; i++) {
        var e1 = entities[i];
        var b1 = e1.getBounds();
        for(var j = i + 1; j < l; j++) {
          var e2 = entities[j];
          var b2 = e2.getBounds();
          
          if((b1.br.x > b2.tl.x && b1.br.y > b2.tl.y && b1.tr.x < b2.tl.x && b1.tl.y < b2.tl.y) 
          || (b1.bl.x < b2.tr.x && b1.bl.y > b2.tr.y && b1.tr.x > b2.tr.x && b1.tr.y < b2.tr.y)
          || (b1.tl.x < b2.br.x && b1.tl.y < b2.br.y && b1.br.x > b2.br.x && b1.br.y > b2.br.y) 
          || (b1.tr.x > b2.bl.x && b1.tr.y < b2.bl.y && b1.bl.x < b2.bl.x && b1.bl.y > b2.bl.y)) {
            
            console.log(e1.id +' - '+ e2.id);
            self.stop();
            
          }
          
        }
      }
      
      
      isUpdated = false;
      for(var i = 0, l = entities.length; i < l; i++)
        if(entities[i].onUpdate(dt))
          isUpdated = true;
    };
    
    var render = function() {
      context.clearRect(0, 0, 640, 360);
      for(var i = 0, l = entities.length; i < l; i++)
        entities[i].onRender();
    };
    
    var sleep = function(msec) {
      var mark = +new Date;
      while(true)
        if(mark + msec <= +new Date)
          break;
    };
    
    this.init = function(callback) {
      if(callback instanceof Function)
        callback.call(this, null);
      
      entities.push(new Circle(this, 0));
      entities.push(new Circle(this, 1));
      entities.push(new Circle(this, 2));
      entities.push(new Circle(this, 3));
      entities.push(new Circle(this, 4));
      entities.push(new Circle(this, 5));
      entities.push(new Circle(this, 6));
      entities.push(new Circle(this, 7));
      entities.push(new Circle(this, 8));
      entities.push(new Circle(this, 9));
      
      return this;
    };
    
    var intv = null;
    this.run = function() {
      var curr = prev = +new Date;
      var UPS  = 30;                        // updates per second
      var tick = 1000 / UPS;                // update interval

      intv = setInterval(function() { 
        var diff = curr - prev;
        while(diff > tick) {
          update(curr - prev);
          diff -= tick;
          prev  = curr;
          curr  = +new Date;
        }
        requestAnimationFrame(render);      
        curr = +new Date;

        if(!isRunning) clearInterval(intv);
      }, 0);
    };
    
    this.stop = function() {
      clearInterval(intv);
    }
  }; 

  (new Game()).init(function() {
    console.log('Game::running');
  }).run();

})();