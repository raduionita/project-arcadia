(function() {
  
  /**
   * Canvas edge "Collison Detection" w/ Polygons
   * Object pivot rotation
   * ******************************** */
    
  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  var bRunning = true;
  
  window.addEventListener('keydown', function(evt) {
    if(evt.keyCode == 27)
      if(bRunning)
        bRunning = false;
      else
        bRunning = true;
  }, false);
  
  /*                                                                                                                */
  
  var Matrix = function(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    
    var matrix = new Array(rows);
    for(var i = 0; i < rows; i++)
      matrix[i] = new Array(cols);
    
    this.mul = function(that) {

    };
    this.add = function(that) {
      var res = new Matrix(rows, cols);
      for(var i = 0; i < rows; i++) 
        for(var j = 0; j < cols; i++) 
          res.array[i][j] = this.array[i][j] + that.data[i][j];
    };
    this.sub = function(that) {
    
    };
  };
  
  var S = new Matrix(3, 3);
  var R = new Matrix(3, 3);
  var T = new Matrix(3, 3);
  
  /*                                                                                                                */
  
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
    this.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
    };
  };
  
  var Polygon = function() {
    this.points      = Array.prototype.slice.call(arguments);
    this.center      = function() {                                           // [Point] return center point
      var lo_x = canvas.width, hi_x = 0, lo_y = canvas.height, hi_y = 0;
      for(var i = 0, l = this.points.length; i < l; i++) {
        var point = this.points[i];
        lo_x = Math.min(lo_x, point.x);
        hi_x = Math.max(hi_x, point.x);
        lo_y = Math.min(lo_y, point.y);
        hi_y = Math.max(hi_y, point.y);
      }
      return new Point((lo_x + hi_x) / 2, (lo_y + hi_y) / 2);
    };
    this.pivot       = this.center();
    this.translate   = function(dx, dy) {                                     // translate poly by dx, dy
      this.pivot.translate(dx, dy);
      for(var i = 0, l = this.points.length; i < l; i++)
        this.points[i].translate(dx, dy);
    };
    this.rotate      = function(angle) {                                      // rotate poly by angle
      angle = angle * Math.PI / 180;
      
      for(var i = 0, l = this.points.length; i < l; i++) {
        var point = this.points[i];
        point.translate(-this.pivot.x, -this.pivot.y);          // move to origin
        var px = point.x;                                       // temp vars
        var py = point.y;
        point.x = px * Math.cos(angle) - py * Math.sin(angle);  // rotate
        point.y = px * Math.sin(angle) + py * Math.cos(angle);
        point.translate(this.pivot.x, this.pivot.y);            // move back(to pivot)
      } 
    };
    this.scale       = function(sx, sy) {                                     // scale poly by sx, sy
      if(typeof sy == 'undefined') sy = sx;
      // ... 
    };
  };
  
  var poly = new Polygon(
    new Point(10, 30),
    new Point(40, 20),
    new Point(70, 60),
    new Point(50, 100),
    new Point(20, 80)
  );
  
  /*                                                                                                                */
  
  function render() {
    context.clearRect(0, 0, 640, 360);
    
    context.beginPath();
    context.lineWidth = '1';
    context.strokeStyle = "black";
    context.moveTo(poly.points[0].x, poly.points[0].y);
    for(var i = 1, l = poly.points.length; i < l; i++) {
      var point = poly.points[i];
      context.lineTo(point.x, point.y);
    }
    context.closePath();
    context.fillStyle = "rgba(129, 210, 255, 0.5)";
    context.fill();
    context.stroke(); 
  }
  
  var dx = dy = 1;
  var theta = 2; 
  function update() {
    poly.translate(dx, dy);
    poly.rotate(theta);
    
    var bCollision = false;
    for(var i = 0, l = poly.points.length; i < l; i++) {
      var point = poly.points[i];
      if(point.x < 0) {
        poly.translate(0 - point.x, 0);
        dx *= -1;
        // poly.pivot = new Point(point.x, point.y);
      } else if(point.x > canvas.width) {
        poly.translate(canvas.width - point.x, 0);
        dx *= -1;
        // poly.pivot = new Point(point.x, point.y);
      } 
      if(point.y < 0) {
        poly.translate(0, 0 - point.y);
        dy *= -1;
        // poly.pivot = new Point(point.x, point.y);
      } else if(point.y > canvas.height) {
        poly.translate(0, canvas.height - point.y);
        dy *= -1;
        // poly.pivot = new Point(point.x, point.y);
      }
    }
  }
  
  (function() {
    if(bRunning) {
      update();
      render()
    }
    setTimeout(arguments.callee, 1000 / 60);
  })();
    
})();




















