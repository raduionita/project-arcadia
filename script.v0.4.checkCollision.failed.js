
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


  var Input = {
    KEY: {
      'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12,
      'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32,
      'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36,
      'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40,
      'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92,
      'SELECT': 93,
      'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110,
      'NUM_PAD_SOLIDUS': 111,
      'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'SEMICOLON': 186, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189,
      'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220,
      'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222
    },
    events: []
  };
  
  var Square = function(game) {
    var length = 30;
    var color  = 'yellow';
    var x      = (game.width / 2) - length;
    var y      = game.height - length - 300;
    var vx     = 0;
    var vy     = 0
    var ay     = 9.81;
    var context = game.getContext();
    
    this.getBounds = function() {
      return {
        tl: { x: x,          y: x },
        tr: { x: x + length, y: y },
        br: { x: x + length, y: y + length },
        bl: { x: x,          y: y+ length }
      };
    };
    
    this.setColor = function(c) { color = c; }
    
    this.getVx = function()  { return vx; }
    this.setVx = function(a) { vx = a; }
    this.getVy = function()  { return vy; }
    this.setVy = function(a) { vy = a; }
    
    this.onUpdate = function(dt) {                                          // rename: onUpdate();
      for(var i = 0, l = Input.events.length; i < l; ++i ) {
        var event = Input.events.pop();
        if(event instanceof KeyboardEvent) { 
          switch(event.keyCode) {
            case Input.KEY.SPACEBAR:
              vy -= 100;
            break;
            case Input.KEY.ARROW_LEFT:
              vx = -4;
            break;
            case Input.KEY.ARROW_RIGHT:
              vx = 4;
            break;
          }
        }
      }
      
      y += vy * (dt / 200);
      x += vx;
      
      if(y + length >= game.height) {
        y = game.height - length;
        vy = 0;
      } 
      
      if(y <= 0) { }
      
      if(x + length >= game.width) {
        x = game.width - length;
      }
      
      if(x <= 0) { }
      
      vy += ay;
      vx  = 0;
      
      return true;
    };
    this.onRender = function() {                                            // rename: onRender();
      context.beginPath();
      context.rect(x, y, length, length);
      context.fillStyle = color;
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke();
      color = 'yellow';
      return true;
    };
  }
  
  var Circle = function(game) {
    var radius = 20;
    var color  = 'red';
    var x = Math.random() * (game.width);
    var y = Math.random() * (game.height);
    var vx = Math.random() * .2;
    var vy = Math.random() * .2;
    var context = game.getContext();
    
    this.getBounds = function() {
      return {
        tl: { x: x - radius, y: y - radius },
        tr: { x: x + radius, y: y - radius },
        br: { x: x + radius, y: y + radius },
        bl: { x: x - radius, y: y + radius }
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
    
    // console.log(context);
    
    var entities = [];
    this.getEntities = function() { return entities; }
    
    var events = { };
    
    canvas.addEventListener('mousedown', function(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.cancelBubble = true;
      events[event.timeStamp] = event;
    }, false);  
    
    canvas.addEventListener('mouseup', function(event) {
      event.preventDefault();
      // events[event.timeStamp] = event;
    }, false);
    
    canvas.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.cancelBubble = true;
      return false;
    }, false);
    
    window.addEventListener('keydown', function(event) {
      event.preventDefault();
      events[event.timeStamp] = event;
    });
    
    window.addEventListener('keyup', function(event) {
      event.preventDefault();
      // events[event.timeStamp] = event;
    }, false);
    
    var checkCollisions = function() {
      for(var i = 0, l = entities.length; i < l; i++) {
        var e1 = entities[i];
        var b1 = e1.getBounds();
        
        for(var j = i + 1; j < l; j++) {
          var e2 = entities[j];
          var b2 = e2.getBounds();
          
          var bCollision = false;
          if(b1.br.x > b2.tl.x && b1.br.y > b2.tl.y && b1.tr.x < b2.tl.x && b1.tl.y < b2.tl.y) {
            bCollision = true;
            
          } else if(b1.bl.x < b2.tr.x && b1.bl.y > b2.tr.y && b1.tr.x > b2.tr.x && b1.tr.y < b2.tr.y) {
            bCollision = true;
            
          } else if(b1.tl.x < b2.br.x && b1.tl.y < b2.br.y && b1.br.x > b2.br.x && b1.br.y > b2.br.y) {
            bCollision = true;
            
          } else if(b1.tr.x > b2.bl.x && b1.tr.y < b2.bl.y && b1.bl.x < b2.bl.x && b1.bl.y > b2.bl.y) {
            bCollision = true;
            
          }
          
          if(bCollision) {
            console.log('collision');
            // e2.undoMove();
            e1.setColor('blue');
            e2.setColor('blue');
            self.stop();
            // var vx = e1.getVx();
            // var vy = e1.getVy();
            // e1.setVx(e2.getVx());
            // e1.setVy(e2.getVy());
            // e2.setVx(vx);
            // e2.setVy(vy);
          }
        }
      }
    };
    
    var u = 0;
    var update = function(dt) {
      u++
      tick();
      
      checkCollisions();
      
      // mousedown + mouseup              = click
      // mousedown + mousemove            = drag
      // mousemove                        = mousemove
      // keydown + mouseup + mousemove    = drag + modified = select
      // keydown + keyup                  = keypressed
      
      for(var timeStamp in events) {
        var event = events[timeStamp];
        
        if(event instanceof KeyboardEvent) {                  // handle keyboard events
          switch(event.keyCode) {
            case Input.KEY.ESCAPE:
              alert('Stopped!');
              isRunning = false;
              return false;
            break;
            case Input.KEY.SPACEBAR:
              Input.events.push(event);
            break;
            case Input.KEY.ARROW_LEFT:
              Input.events.push(event);
            break;
            case Input.KEY.ARROW_RIGHT:
              Input.events.push(event);
            break;
          }
        } else if (event instanceof MouseEvent) {             // handle mouse events
          
        }
          
        delete events[timeStamp];
      }
      
      isUpdated = false;
      for(var i = 0, l = entities.length; i < l; i++)
        if(entities[i].onUpdate(dt))
          isUpdated = true;
    };
    
    var r = 0;
    var render = function() {
      r++;
      
      if(isUpdated) {                                           // IF scene has changed
        context.clearRect(0, 0, 640, 360);
        for(var i = 0, l = entities.length; i < l; i++)
          entities[i].onRender();
      }
    };
    
    var tick = function(dt) {
      events[(+new Date)] = new Event('tick');
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
      
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      entities.push(new Circle(this));
      
      entities.push(new Square(this));
      
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