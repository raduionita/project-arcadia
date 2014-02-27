(function() {
  
  /**
   * Object "Collision Detection" w/ Polygons
   * Line intersection
   * ***************** */
  
  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  var bRunning = false;
  
  window.addEventListener('keydown', function(evt) {
    if(evt.keyCode == 27 || evt.keyCode == 32 || evt.keyCode == 13)
      if(bRunning)
        bRunning = false;
      else
        bRunning = true;
  }, false);
  
  /*                                                                                                                */
  
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
    this.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
    };
  };
  
  var Line = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.intersects = function(line) {
      // A = y2 - y1
      // B = x1 - x2
      // Ax + By = C
      
      var B1 = this.p2.x - this.p1.x;
      var A1 = this.p2.y - this.p1.y;
      // var C2 = A1 * line.p1.x + B1 * line.p2.y;
      
      var B2 = line.p2.x - line.p1.x;
      var A2 = line.p2.y - line.p1.y;
      
      var ABAB = B1 * A2 - B2 * A1;
      var S = (B1 * (this.p1.y - line.p1.y) - A1 * (this.p1.x - line.p1.x)) / ABAB;
      var T = (B2 * (this.p1.y - line.p2.y) - A2 * (this.p1.x - line.p2.x)) / ABAB;
      
      if(S >= 0 && S <= 1 && T >= 0 && T <= 1)                                        // collision
        return new Point(this.p1.x + T * B1, this.p1.y + T * A1);                     // return collision point
      return false;
      
      // var A1 = this.p2.y - this.p1.y;
      // var B1 = this.p2.x - this.p1.x; 
      // var C1 = A1 * this.p1.x + B1 * this.p2.y;
      
      // var A2 = line.p2.y - line.p1.y;
      // var B2 = line.p2.x - line.p1.x;
      // var C2 = A1 * line.p1.x + B1 * line.p2.y;
      
      // var ABAB = A1 * B2 - A2 * B1;
      // if(ABAB) {
      //  return new Point(
      //    (B2 * C1 - B1 * C2) / ABAB,
      //    (A1 * C2 - A2 * C1) / ABAB
      //  );
      // return false;
    };
  };
  
  var lines = [];
  // lines.push(new Line(new Point(20, 10), new Point(20, 60)));
  // lines.push(new Line(new Point(10, 20), new Point(60, 20)));  
  // lines.push(new Line(new Point(30, 20), new Point(30, 60)));  
  // console.log(lines[0].intersects(lines[1]));
  
  
  var Polygon = function() {
    this.color = 'rgba(129, 210, 255, 0.5)';
    this.vx = Math.floor(Math.random() * 5);
    this.vy = Math.floor(Math.random() * 5);
    this.points      = (function(args) {
      if(args.length == 3 && args[0] instanceof Point) {
        this.pivot = args[0];
        var count  = args[1];
        var size   = args[2];
        // TODO: implement regular shape polygons creation
      } else {
        return args;
      }
    }).call(this, Array.prototype.slice.call(arguments));
    this.lines       = function() {
      var lines = [];
      for(var i = 0, l = this.points.length; i < l; i++)
        if(i == l - 1)
          lines.push(new Line(new Point(this.points[i].x, this.points[i].y), new Point(this.points[0].x, this.points[0].y)));
        else
          lines.push(new Line(new Point(this.points[i].x, this.points[i].y), new Point(this.points[i+1].x, this.points[i+1].y)));
      return lines;
    };  
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
  
  var polys = [];
  polys.push(new Polygon(
    new Point(10, 30),
    new Point(40, 20),
    new Point(70, 60),
    new Point(50, 100),
    new Point(20, 80)
  ));
  polys.push(new Polygon(
    new Point(110, 40),
    new Point(140, 30),
    new Point(170, 70),
    new Point(150, 110),
    new Point(90, 100),
    new Point(90, 80)
  ));
  // new Polygon(new Point(x, y), points, size);
  // new Polygon(new Point(x, y), new Point(x, y), ...);
  
  /*                                                                                                                */
  
  function render() {
    context.clearRect(0, 0, 640, 360);

    for(var i = 0, l = lines.length; i < l; i++) {
      var line = lines[i];
      context.beginPath();
      context.lineWidth = '1';
      context.strokeStyle = "black";
      context.moveTo(line.p1.x, line.p1.y);
      context.lineTo(line.p2.x, line.p2.y);
      context.stroke(); 
      context.closePath();
    } 
    
    for(var j = 0, m = polys.length; j < m; j++) {
      var poly = polys[j];
      context.beginPath();
      context.lineWidth = '1';
      context.strokeStyle = "black";
      context.moveTo(poly.points[0].x, poly.points[0].y);
      for(var i = 1, l = poly.points.length; i < l; i++)
        context.lineTo(poly.points[i].x, poly.points[i].y);
      context.closePath();
      context.fillStyle = poly.color;
      context.fill();
      context.stroke(); 
    }
  }
  
  var theta = 2; 
  function update() {
  
    for(var i = 0, m = polys.length; i < m; i++) {
      var poly = polys[i];
      
      poly.translate(poly.vx, poly.vy);
      poly.rotate(theta);
      
      for(var pi = 0, l = poly.points.length; pi < l; pi++) {    // Canvas edge collision detection
        var point = poly.points[pi];
        if(point.x < 0) {
          poly.translate(0 - point.x, 0);
          poly.vx *= -1;
        } else if(point.x > canvas.width) {
          poly.translate(canvas.width - point.x, 0);
          poly.vx *= -1;
        } 
        if(point.y < 0) {
          poly.translate(0, 0 - point.y);
          poly.vy *= -1;
        } else if(point.y > canvas.height) {
          poly.translate(0, canvas.height - point.y);
          poly.vy *= -1;
        }        
      }
    
      var poly_lines = poly.lines();
      var bCollision = false;
      for(var j = i + 1; j < m; j++) {
        var that = polys[j];
        var that_lines = that.lines();
        var points = [];
        for(var s = 0, pl = poly_lines.length; s < pl; s++) {
          var l1 = poly_lines[s];
          for(var t = 0, tl = that_lines.length; t < tl; t++) {
            var l2 = that_lines[t];
            var point = l1.intersects(l2);
            if(point)
              points.push(point);
          }
          if(points.length) {
            
            console.log(points);
          
            
            poly.color = 'rgba(255, 150, 129, 0.5)';
            // console.log(poly.center());
            
            // poly.translate(-poly.vx, -poly.vy);
            // that.translate(-that.vx, -that.vy);
            poly.vx *= -1;
            poly.vy *= -1;
            that.vx *= -1;
            that.vy *= -1;
            
            // console.log(poly.center());
            
            bRunning = false;
            break;
          }
        }
      }
    }
  }
  
  render();
  (function() {
    if(bRunning) {
      update();
      render();
    }
    setTimeout(arguments.callee, 1000 / 60);
  })();
    
})();




















