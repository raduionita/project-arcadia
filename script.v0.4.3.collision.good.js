(function() {

  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  var intv = null;
  var bRunning = true;
  
  window.addEventListener('keydown', function(evt) {
    if(evt.keyCode == 27)
      if(bRunning)
        bRunning = false;
      else
        bRunning = true;
    console.log(bRunning);
  }, false);
  
  var Rectangle = function(x, y, width, height) {
    this.top    = y;
    this.right  = x + width;
    this.bottom = y + wdith;
    this.up     = y;
    this.width  = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.intersects = function(that) {
      if((that instanceof Rectangle) === false) return false;
      if(1) {
        return true;
      }
      return false;
    }
  };
  
  var id = 0;
  var Box = function(x, y, width, height) {
    this.id     = id++;
    this.x      = x;
    this.y      = y;
    this.width  = width;
    this.height = height;
    
    this.color  = "red";
    
    this.vx = Math.random() * 2;
    this.vy = Math.random() * 2;
        
    this.onUpdate = function() {
      this.x += this.vx;
      this.y += this.vy;
    };
  };
  
  var boxes = [];
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 70, 30));
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 30, 70));
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 40, 40));
  
  function render() {
    context.clearRect(0, 0, 640, 360);
    
    for(var i = 0, l = boxes.length; i < l; i++) {
      var box = boxes[i];
      
      context.beginPath();
      context.rect(box.x, box.y, box.width, box.height);
      context.fillStyle = box.color;
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke();
      
      context.font ="14px Arial bold";
      context.fillStyle = 'white';
      context.fillText(box.id, box.x + 1, box.y + 14);
    }
  }
  
  function update() {
    
    for(var i = 0, l = boxes.length; i < l; i++) {
      var self = boxes[i];
      self.onUpdate();
      
      if(self.x + self.width > canvas.width)   { self.x = canvas.width  - self.width;  self.vx *= -1; }
      if(self.x < 0)                           { self.x = 0; self.vx *= -1; }
      if(self.y + self.height > canvas.height) { self.y = canvas.height - self.height; self.vy *= -1; }
      if(self.y < 0)                           { self.y = 0; self.vy *= -1; }
      
      for(var j = i + 1; j < l; j++) {
        var that = boxes[j];
        
        var bCollision = false;
        if((self.x + self.width > that.x && self.x + self.width < that.x + that.width && self.y + self.height > that.y && self.y + self.height < that.y + that.height)
        || (that.x < self.x + self.width && that.x > self.x && that.y < self.y + self.height && that.y > self.y)) {
          console.log(self.id +'x'+ that.id +'::br - tl');
          bCollision = true;
          
          // var dx = self.width - (that.x - self.x);
          // var dy = self.height - (that.y - self.y);
          // self.x -= dx;
          // self.y -= dy;
          
        } else if((self.x < that.x + that.width && self.x > that.x && self.y + self.height > that.y && self.y + self.height < that.y + that.height)
               || (that.x + that.width > self.x && that.x + that.width < self.x + self.width && that.y < self.y + self.height && that.y > self.y)) {
          console.log(self.id +'x'+ that.id +'::bl - tr');
          bCollision = true;  
          
          // var dx = that.width - (self.x - that.x);
          // var dy = self.height - (that.y - self.y);
          // self.x += dx;
          // self.y -= dy;
          
        } else if((self.x < that.x + that.width && self.x > that.x && self.y < that.y + that.height && self.y > that.y) 
               || (that.x + that.width > self.x && that.x + that.width < self.x + self.width && that.y + that.height > self.y && that.y + that.height < self.y + self.height)) {
          console.log(self.id +'x'+ that.id +'::tl - br');
          bCollision = true;
          
          // var dx = that.width - (self.x - that.x);
          // var dy = that.height - (self.y - that.y);
          // self.x += dx;
          // self.y += dy;
          
        } else if((self.x + self.width > that.x && self.x + self.width < that.x + that.width && self.y < that.y + that.height && self.y > that.y)
               || (that.x < self.x + self.width && that.x > self.x && that.y + that.height > self.y && that.y + that.height < self.y + self.height)) {
          console.log(self.id +'x'+ that.id +'::tr - bl');
          bCollision = true;  
          
          // var dx = self.width - (that.x - self.x);
          // var dy = that.height - (self.y - that.y);
          // self.x -= dx;
          // self.y += dy;
          
        }        
        
        if(bCollision) {
          // bRunning = false; return;
          var s_vx = self.vx;
          var s_vy = self.vy;
          self.x -= s_vx;
          self.y -= s_vy;
          var t_vx = that.vx;
          var t_vy = that.vy;
          that.x -= t_vx;
          that.y -= t_vy;
          
          // use vectors: sum up the vectors to get the correct direction
          self.vx = t_vx;     
          self.vy = t_vy;
          that.vx = s_vx;
          that.vy = s_vy;
        }
        
      }
    }
  }
  
  (function() {
    if(bRunning) {
      render()
      update();
    }
    setTimeout(arguments.callee, 1000 / 60);
  })();
    
})();

  // Rectangle
    // rotate
    // move
    // 


  var Actor = function(type) {
    // states         // Animation[]
      // ['idle']
      // ['walking']
      // ['running']
      // ['jumping']
    //     
  }
  
  var actors = [];
  // actors.push(new Actor('human'));
  // actors.push(new Actor('enemy'));
  
  for(var i = 0, l = actors.length; i < l; i++) {
    var a1 = actors[i];
    var b1 = a1.getCollisionMesh();
    
    a1.update();
    
    for(var j = i + 1; j < l; j++) {
      var a2 = actors[j];
      var b2 = a2.getBoundingMesh();
      
      
      
    }
  }
























