(function() {

  function isArray (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }

  /**                                                                                                              **/
  
  var Vector = new function() {
    this.create   = function() {
      var args = Array.prototype.slice.call(arguments);
      var vector;
      if(args.length === 1) {
        var l = args[0];
        vector = new Array(l);
        for(var i = 0; i < l; i++)
          vector[i] = 0;
      } else {
        vector = args;
      }
      return vector;
    };
    this.dot = function(v1, v2) {
      
    };
  };
  
  // var v = Vector.create(1, 3, 4);
  // console.log(v);
  
  /**                                                                                                              **/
  
  var Vector3 = function() {
    var args = Array.prototype.slice.call(arguments);
    args = isArray(args[0]) ? args[0] : args;
    this.x = args[0] || 0;
    this.y = args[1] || 0;
    this.z = args[2] || 0;
    this.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    this.normalize = function() {
      var l = this.length();
      if(l == 1) return;
      this.x /= l;
      this.y /= l;
      this.z /= l;
    };
    this.add = function(vector) {
      this.x += vector.x;
      this.y += vector.y;
      this.z += vector.z;
    };
    this.sub = function(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      this.z -= vector.z;
    };
    this.dot = function(vector) {
      return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    };
    this.cross = function(vector) {
      this.x = this.y * vector.z - this.z * vector.y;
      this.y = this.z * vector.x - this.x * vector.z;
      this.z = this.x * vector.y - this.y * vector.x;
    };
  };
  
  var v = new Vector3(1, 2, 3);
  v.normalize();
  console.log(v);
  console.log(v.length());
  
  /**                                                                                                              **/

  var Matrix = new function() {
   /**
    * Create a ROWS x COLS sized matrix(multidimensional array)
    * ---------------------------------------------------------
    * param : rows int Number of rows
    * param : cols int Numbers of colomns
    * return: matrix array Multidimensional array
    * demo  : var M1 = Matrix.create(4, 4);
    * ******************************************* */
    this.create = function(rows, cols) {
      var matrix = new Array(rows);
      for(var i = 0; i < rows; i++) {
        matrix[i] = new Array(cols);
        for(var j = 0; j < cols; j++)
          matrix[i][j] = 0;
      }
      return matrix;
    };
   /**
    * Identity matrix: use input matrix size to return identity matrix
    * ----------------------------------------------------------------
    * param : matrix array Multidimensional array
    * return: matrix array Identity matrix
    * demo  : var M2 = Matrix.identity(M1);
    * ************************************ */
    this.identity = function(matrix) {
      var r = matrix.length, 
          c = matrix[0].length;
      for(var i = 0; i < r; i++)
        for(var j = 0; j < c; j++)
          matrix[i][j] = i % r == j % c ? 1 : 0;
      return matrix;
    };
   /** 
    * Matrix multiplication: m1 * m2
    * ------------------------------
    * param : m1 array 1st multidimensional array
    * param : m2 array 2nd multidimensional array
    * notice: m1.length === m2[0].length 
    * return: result array Multidimensional array
    * demo  : var M = Matrix.multiply(M1, M2);
    * **************************************** */
    this.multiply = function(m1, m2) {             // m1 * m2;
      var r = m2[0].length;
      var c = m1.length;
      var result = new Array(r);
      for(var i = 0; i < r; i++) {
        result[i] = new Array(c);
        for(var j = 0; j < c; j++) {
          var ij = 0;                              // = m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0]
          for(var k = 0; k < r; k++)
            ij += m1[i][k] * m2[k][j];
          result[i][j] = ij; 
        }
      }
      return result;
    };
    
    this.scale = function(matrix, vector) {
      
    };
    
    this.rotate = function(matrix, angle, vector) {
    
    };
    
    this.translate = function(matrix, vector) {
    
    };
  };
    
  // var S = Matrix.scale(M, 1.5);
  // var R = Matrix.rotate(M, 60, new Vector(1, 0, 0));
  // var T = Matrix.translate(M, new Vector(1, 0, 0));
  // var M = Matrix.multiply(S, R);  
})();