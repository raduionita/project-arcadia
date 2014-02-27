(function() {

  /* Tools ********************************************************************************************************** */
  
  var Pool = Class.extend({
    type   : null,
    objects: [],
    _init: function(type) {
      this.type = type;
    },
    push: function(object) {
      if(object instanceof type)
        objects.push(object);
    },
    pull: function() {
      return objects.pop();
    }
  });
  
  var pool = new Pool(Event);
  pool.push(new KeyEvent());
  
  /* Events ********************************************************************************************************* */
   
  var KeyEvent = Event.extend({
    _init: function(key) {
      this._super();
      this.key = key;
    },
    getKey: function() {
      return this.key || null;
    }
  });
  
  var MouseEvent = Event.extend({
    _init: function(x, y, button) {
      this._super();
      // ...
    },
    getX: function() {
      return this.x || 0;
    },
    getY: function() {
      return this.y || 0;
    },
    getButton: function() {
      return this.button || null;
    }
  });
  
  /* Input ********************************************************************************************************** */
  
  var Input = Class.extend({
    
    
    KEY : {'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12,
      'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32,
      'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36,
      'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40,
      'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92,
      'SELECT': 93,
      'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110,
      'NUM_PAD_SOLIDUS': 111,
      'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'SEMICOLON': 186, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189,
      'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220,
      'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222},    
    
    BUTTON: { },
    
    _listeners: [],
    
    registerListener: function(event, listener) {
      
      this._listeners.push(listener);
      
      if(typeof(window.event) != 'undefined')
        viewport.attachEvent('on'+ event.type, this._handle);
      else
        viewport.addEventListener(event.type, this._handle, false);
        
    },
    _handle: function(event) {
      for(var i = 0, l = _listeners.length, i < l; ++i)
        if(listener[i].type === event.type)
          listener[i].handle(event);
    }
  });
  
  /*               */
  
  var Listener = Class.exntend({
    handle: function() {
    
    }
  });
  
  var MouseClickListener = Listener.extend({
    handle: function() {
    
    }
  });
  
  var input = new Input();
  
  input.registerListener(new MouseClickListener());
  
  /* Screens ******************************************************************************************************** */
  
  var Screen = Class.extend({
  
  });
  
  var LoadingScreen = Screen.extend({
  
  });
  
  
  /* Game *********************************************************************************************************** */
  
  var Game = Class.extend({
  
  });
  
  (new Game()).run();
  
})();