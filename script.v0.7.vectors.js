(function () {    
  
  /**                                                                                                              **/
  
  var Matrix = function(rows, cols) {
    this.rows = rows || 0;
    this.cols = cols || 0;
    this.data = new Array(this.rows);
    for(var i = 0; i < rows; i++) {
      this.data[i] = new Array(this.cols);
      for(var j = 0; j < rows; j++) 
        this.data[i][j] = 0;
    }
    this.get = function(i,j) {
      return this.data[i][j];
    }
  };  
  
  Matrix.add = function(m1, m2) {
    console.log('1');
  };
  
  // var M = new Matrix(4, 4);
  // console.log(Matrix);
  // Matrix.add(1, 2);
  
  /**                                                                                                              **/
  
  var Vector = function(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    if(typeof z != 'undefined') this.z = z;
    if(typeof w != 'undefined') this.z = w;
    this.length = function() {
      var z2 = this.z !== undefined ? this.z*this.z : 0;
      var w2 = this.w !== undefined ? this.w*this.w : 0;
      return Math.sqrt(x*x + y*y + z2 + w2);
    }
    this.normalize = function() {
      var l = this.length();
      if(l == 1) return;
      this.x /= l;
      this.y /= l;
      if(this.z !== undefined) this.z /= l;
      if(this.w !== undefined) this.w /= l;
      return this;
    };
    this.add = function() { };
    this.sub = function() { };
  };
  
  Vector.dot = function(v1, v2) {
    var z2 = v1.z !== undefined && v2.z !== undefined ? v1.z * v2.z : 0;
    var w2 = v1.w !== undefined && v2.w !== undefined ? v1.w * v2.w : 0;
    return v1.x * v2.x + v1.y * v2.y + z2 + w2;
  };
  Vector.normalized = function(v1) {
    var l = v1.length();
    var z = v1.z !== undefined ? v1.z / l : undefined;
    var w = v1.w !== undefined ? v1.w / l : undefined;
    return new Vector(v1.x / l, v1.y / l, z, w);
  };
  Vector.add = function(v1, v2) {
    var z = v1.z !== undefined && v2.z !== undefined ? v1.z + v2.z : undefined;
    var w = v1.w !== undefined && v2.w !== undefined ? v1.w + v2.w : undefined;
    new Vector(v1.x + v2.x, v1.y + v2.y, z, w);
  };
  Vector.sub = function(v1, v2) {
  
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
  
  var v1 = new Vector(1, 2).normalize();
  var v2 = new Vector(3, 2).normalize();
  
  // var v3 = Vector.cross(v1, v2);
  
  console.log(Vector.dot(v1, v2));
  
})();