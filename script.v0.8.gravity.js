(function() {
  
  var Vector = function(x, y, z, w) {
    var hasZ = z !== undefined;
    var hasW = w !== undefined;
    this.x = x || 0;
    this.y = y || 0;
    if(hasZ) this.z = z;
    if(hasW) this.w = w;
    this.length = function() {
      var z2 = hasZ ? this.z*this.z : 0;
      var w2 = hasW ? this.w*this.w : 0;
      return Math.sqrt(this.x*this.x + this.y*this.y + z2 + w2);
    }
    this.normalize = function() {
      var l = this.length();
      if(l == 1) return this;
      this.x /= l;
      this.y /= l;
      if(hasZ) this.z /= l;
      if(hasW) this.w /= l;
      return this;
    };
    this.add = function(vector) {
      this.x += vector.x;
      this.y += vector.y;
      if(hasZ) this.z += vector.z;
      if(hasW) this.w += vector.w;
      return this;
    };
    this.sub = function(vector) { 
      this.x -= vector.x;
      this.y -= vector.y;
      if(hasZ) this.z -= vector.z;
      if(hasW) this.w -= vector.w;
      return this;
    };
    this.scale = function(ratio) {
      this.x *= ratio;
      this.y *= ratio;
      if(hasZ) this.z *= ratio;
      if(hasW) this.w *= ratio;
      return this;
    }
  };
  
  Vector.dot = function(v1, v2) {
    var z2 = v1.z !== undefined && v2.z !== undefined ? v1.z * v2.z : 0;
    var w2 = v1.w !== undefined && v2.w !== undefined ? v1.w * v2.w : 0;
    return v1.x * v2.x + v1.y * v2.y + z2 + w2;
  };
  Vector.normalize = function(v1) {
    var l = v1.length();
    var z = v1.z !== undefined ? v1.z / l : undefined;
    var w = v1.w !== undefined ? v1.w / l : undefined;
    return new Vector(v1.x / l, v1.y / l, z, w);
  };
  Vector.add = function(v1, v2) {
    var z = v1.z !== undefined && v2.z !== undefined ? v1.z + v2.z : undefined;
    var w = v1.w !== undefined && v2.w !== undefined ? v1.w + v2.w : undefined;
    return new Vector(v1.x + v2.x, v1.y + v2.y, z, w);
  };
  Vector.sub = function(v1, v2) {
    var z = v1.z !== undefined && v2.z !== undefined ? v1.z - v2.z : undefined;
    var w = v1.w !== undefined && v2.w !== undefined ? v1.w - v2.w : undefined;
    return new Vector(v1.x - v2.x, v1.y - v2.y, z, w);
  };
  Vector.cross = function(v1, v2) {
    if(v1.z !== undefined && v2.z !== undefined && v1.w === undefined && v2.w === undefined)
      return new Vector(
        v1.y * v2.z - v1.z * v2.y,
        v1.z * v2.x - v1.x * v2.z,
        v1.x * v2.y - v1.y * v2.x
      );
    return null;
  };
  Vector.clone = function(v1) {
    var z = v1.z !== undefined ? v1.z : undefined;
    var w = v1.w !== undefined ? v1.w : undefined;
    return new Vector(v1.x, v1.y, z, w);
  };
  
  // var v1 = new Vector(0, 0, 5);
  // var v2 = new Vector(5, 0, 0);
  // console.log(Vector.cross(v1, v2).normalize());
  
  /**                                                                                                              **/
  
  var Point = function(x, y) {
    this.p = new Vector(x, y);
    this.v = new Vector(0, 0);
    this.a = new Vector(0, 0);
    this.m = 1;
  };
  
  var Force = function(x, y) {
    this.p = new Vector(x, y);
    this.a = new Vector(x + 10, y + 10);
    this.m = 10000;
  };

  /**                                                                                                              **/
  
  // var forces = [];
  // forces.push(new Force(300, 200));
  // forces.push(new Force(400, 300));
  var force = new Force(300, 200);
  
  var point = new Point(10, 20);
  point.v.x = 2;
  
  /**                                                                                                              **/
  
  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  var bRender  = true;
  var bRunning = false;
  
  window.addEventListener('keydown', function(evt) {
    if(evt.keyCode == 27 || evt.keyCode == 32 || evt.keyCode == 13)
      if(bRunning)
        bRunning = false;
      else
        bRunning = true;
  }, false);
  
  function drawVector(vector) {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.moveTo(point.p.x, point.p.y);
    context.lineTo(point.p.x + vector.x * 10, point.p.y + vector.y * 10);
    context.stroke();
    context.closePath();
  }
  
  function render() {
    context.clearRect(0, 0, 640, 360);
    
    // for(var i = 0, l = forces.length; i < l; i++) {
    //   var force = forces[i];
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = "red";
      context.arc(force.p.x, force.p.y, 2, 0, Math.PI * 2, true);
      context.stroke();
      context.closePath();
    // }
    
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = "red";
      context.moveTo(force.p.x, force.p.y);
      context.lineTo(point.p.x, point.p.y);
      context.stroke();
      context.closePath();
    
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = "blue";
      context.arc(point.p.x, point.p.y, 2, 0, Math.PI * 2, true);
      context.stroke();
      context.closePath();
      
      context.beginPath();
      context.lineWidth = 1;
      context.moveTo(point.p.x, point.p.y);
      context.strokeStyle = "blue";
      context.lineTo(point.p.x + point.v.x * 10, point.p.y + point.v.y * 10)
      context.stroke();
      context.closePath();
  }
  
  var G = 6.67384 * Math.pow(10, -2);  // -11
  function update() {

    var r = Vector.sub(force.p, point.p).length();
    
    
    var F = G * (point.m * force.m) / (r * r);
    
    var a = F / point.m;
    
    var sinA = (force.p.y - point.p.y) / r;
    var cosA = (force.p.x - point.p.x) / r;
    
    point.a = new Vector(a * sinA, a * cosA);
    
    console.log(point.a);
    
    
    
    
    
    
    
    
    
    
    
    
    bRunning = false;
    
    point.v.add(point.a)
    point.p.add(point.v);
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