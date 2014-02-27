(function() {
  
  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  var intv = null;
  var bRunning = true;
    
  var Box = function(x, y, width, height) {
    this.x      = x;
    this.y      = y;
    this.width  = width;
    this.height = height;
    
    this.vx = Math.random() * 2;
    this.vy = Math.random() * 2;
        
    this.onUpdate = function() {
      this.x += this.vx;
      this.y += this.vy;
    };
  };
  
  var boxes = [];
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 50, 30));
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 30, 70));
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 50, 30));
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 30, 70));
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 50, 30));
  boxes.push(new Box(Math.random() * 600, Math.random() * 300, 30, 70));
  
  function render() {
    context.clearRect(0, 0, 640, 360);
    
    for(var i = 0, l = boxes.length; i < l; i++) {
      var box = boxes[i];
      
      context.beginPath();
      context.rect(box.x, box.y, box.width, box.height);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke();
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
        var other = boxes[j];
        
        // old
        // this.right > box.left && this.bottom > box.top && this.left < box.left   && this.top < box.top
        // this.left < box.right && this.bottom > box.top && this.right > box.right && this.top < box.top
        // this.left < box.right && this.top < box.bottom && this.right > box.right && this.bottom > box.bottom
        // this.right > box.left && this.top < box.bottom && this.left < box.left   && box.bottom > box.bottom
        
        // better
        // self.right > that.left && self.right < that.right && self.bottom > that.top && self.bottom < that.bottom
        // self.left < that.right && self.left > that.left   && self.bottom > that.top && self.bottom < that.bottom
        // self.left < that.right && self.left > that.left   && self.top < that.bottom && self.top > that.top
        // self.right > that.left && self.right < that.right && self.top > that.bottom && self.top > that.top
        
        var bCollision = false;
        if(self.x + self.width > other.x && self.y + self.height > other.y && self.x < other.x && self.y < other.y) {
          console.log('br - tl');
          bCollision = true;
          
          // var dx = self.width - (other.x - self.x);
          // var dy = self.height - (other.y - self.y);
          // self.x -= dx;
          // self.y -= dy;
          
        } else if(self.x < other.x + other.width && self.y + self.height > other.y && self.x + self.width > other.x + other.width && self.y < other.y) {
          console.log('bl - tr');
          bCollision = true;  
          
          // var dx = other.width - (self.x - other.x);
          // var dy = self.height - (other.y - self.y);
          // self.x += dx;
          // self.y -= dy;
          
        } else if(self.x < other.x + other.width && self.y < other.y + other.height && self.x + self.width > other.x + other.width && self.y + self.height > other.y + other.height) {
          console.log('tl - br');
          bCollision = true;
          
          // var dx = other.width - (self.x - other.x);
          // var dy = other.height - (self.y - other.y);
          // self.x += dx;
          // self.y += dy;
          
        } else if(self.x + self.width > other.x && self.y < other.y + other.height && self.x < other.x && self.y + self.height > other.y + other.height) {
          console.log('tr - bl');
          bCollision = true;  
          
          // var dx = self.width - (other.x - self.x);
          // var dy = other.height - (self.y - other.y);
          // self.x -= dx;
          // self.y += dy;
          
        }
        
        
        

        
        
        
        
        
        
        
        if(bCollision) {
          bRunning = false;
          var s_vx = self.vx;
          var s_vy = self.vy;
          self.x -= s_vx;
          self.y -= s_vy;
          var o_vx = other.vx;
          var o_vy = other.vy;
          other.x -= o_vx;
          other.y -= o_vy;
          
          // use vectors: sum up the vectors to get the correct direction
          self.vx = o_vx;     
          self.vy = o_vy;
          other.vx = s_vx;
          other.vy = s_vy;
        }
        
      }
    }
  }
  
  (function() {
    if(bRunning) {
      render()
      update();
      setTimeout(arguments.callee, 1000 / 60)
    }
  })();
  
  // Actor
    // states         // Animation[]
      // ['idle']
      // ['walking']
      // ['running']
      // ['jumping']
  
})();