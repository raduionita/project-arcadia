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
    KEY: { },
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