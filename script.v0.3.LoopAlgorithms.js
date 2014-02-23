
(function() {

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  
  var Class = {
    extend: function(object) {
      return function() {
      
      };
    }
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
    }
  }
  
  var Game = function() {
    var bRunning = true;
    var viewport = document.getElementById('viewport');
    
    var events = { };
    
    viewport.addEventListener('mousedown', function(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.cancelBubble = true;
      events[event.timeStamp] = event;
    }, false);  
    
    window.addEventListener('keydown', function(event) {
      event.preventDefault();
      events[event.timeStamp] = event;
    });
    
    
    var u = 0;
    var update = function(dt) {
      tick();
      
      // position = position + velocity * dt
      
      for(var timeStamp in events) {
        var event = events[timeStamp];
        if(event.keyCode == Input.KEY.ESCAPE)
          alert('Paused!');
        delete events[timeStamp];
      }
      console.log('Game::update['+(u++)+']('+dt+')');
      sleep(10);
    };
    
    var r = 0
    var render = function(dt) {
      // if(isUpdated) {                 // IF scene has changed
      //   clear canvas
      //   for(var object in Rendables)
      //     object.render(dt);
      // }
      
      console.log('Game::render['+(r++)+']('+dt+')');
      sleep(80);
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
      return this;
    };
    this.run = function() {
      var stop = +new Date + 500;
      
      
      var curr = prev = +new Date;
      var UPS  = 25;                // updates per second
      var tick = 1000 / UPS;        // update interval
      
      
      // var TICKS_PER_SECOND = 25;                        // ticks per second
      // var TICK_INTERVAL    = 1000 / TICKS_PER_SECOND;   // 40
      // var MAX_FRAMESKIPS   = 5;
      // var next = +new Date;
      // var updates;
      // var interpolation;
      
      
      // var curr, u_diff, r_diff, u_prev = r_prev = +new Date - 20;
      
      var intv = setInterval(function() { 
        if(+new Date >= stop) clearInterval(intv);
        
        
        var diff = curr - prev;
        while(diff > tick) {
          update(curr - prev);
          diff -= tick;
          prev = curr;
          curr = +new Date;
        }
        render(0);
        curr = +new Date;
        
        
        // updates = 0;
        // while((+new Date > next) && (updates < MAX_FRAMESKIPS)) {
        //   update(0);
        //   next += TICK_INTERVAL;                                  // += 40
        //   updates++;                                              // 1 2 3 4
        // }
        // interpolation = (+new Date + TICK_INTERVAL - next) / TICK_INTERVAL;
        // render(interpolation);
        
        
        // curr = +new Date;
        // u_diff = curr - u_prev;
        // if(u_diff >= 1000 / 30) {
        // update(u_diff);
        // u_prev = curr;
        // }
        // r_diff = curr - r_prev;
        // render(r_diff);
        // r_prev = curr;
      }, 0);
    };
  };

  (new Game()).init(function() {
    console.log('Game::running');
  }).run();
  

  // var Screen = Class.extend({
  //   update: function(dt) { },
  //   render: function(dt) { }
  // });
  // var LoadingScreen = Screen.extend({ });
  // var MenuScreen    = Screen.extend({ });
  // var PauseScreen   = Screen.extend({ });
  // var GameScreen    = Screen.extend({ });
  
})();