(function() {

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

  var MatrixTransformation = new function() {
    
  };
  
  var Matrix = function(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    
    var matrix = new Array(rows);
    for(var i = 0; i < rows; i++)
      matrix[i] = new Array(cols);
    
    
  };
  
  var S = new Matrix(3, 3);
  var R = new Matrix(3, 3);
  var T = new Matrix(3, 3);
  
  var M = MatrixTransformation.multiply(S, R);
  
  /*                                                                                                                */
  
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
    this.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
    }
  };
  
  var Polygon = function() {
    this.points      = Array.prototype.slice.call(arguments);
    this.translate   = function(dx, dy) {
      for(var i = 0, l = this.points.length; i < l; i++)
        this.points[i].translate(dx, dy);
    };
    this.rotate      = function(angle) {
      var rad = angle * Math.PI / 180;
      
      // x' = x * cos a - y * sin a
      // y' = x * sin a + y * cos a.
      for(var i = 0, l = this.points.length; i < l; i++) {
        var point = this.points[i];
        point.x = point.x * Math.cos(rad) - point.y * Math.sin(rad);
        point.y = point.x * Math.sin(rad) + point.y * Math.cos(rad);
      }      
    };
    this.scale       = function(sx, sy) {
    
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
      context.lineTo(poly.points[i].x, poly.points[i].y);
    }
    context.closePath()
    context.fillStyle = "rgba(129, 210, 255, 0.5)";
    context.fill();
    context.stroke(); 
  }
  
  var dx = dy = 1;
  function update() {
    poly.translate(dx, dy);
    // poly.rotate(1);
    
    for(var i = 0, l = poly.points.length; i < l; i++) {
      var point = poly.points[i];
      if(point.x < 0 || point.x > canvas.width)  dx *= -1;
      if(point.y < 0 || point.y > canvas.height) dy *= -1;
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

























