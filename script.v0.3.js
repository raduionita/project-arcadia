
(function() {

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  
  var Class = {
    extend: function(object) {
      return function() {
      
      };
    }
  };
  
  var viewport = document.getElementById('viewport');
  
  var Input = function() {
    var listeners = {};
    
    var handle = function(event) {
      for(var id in listeners) {
        var listener = listeners[id];
        if(event.type == listener.type) {
          listener['on'+ listener.type.capitalize()].call(viewport, event);
        }
      }
    };
    
    this.registerListener = function(listener) {
      if(listener instanceof Listener) {
        listeners[listener.id] = listener;
        viewport.addEventListener(listener.type, handle, false);
      }
    };
    
    this.unregisterListener = function(listener) {
      if(listener instanceof Listener) { 
        viewport.removeEventListener(listener.type, handle);
        delete listeners[listener.id];
      }
    };
  }
  
  var Listener = Class.extend({ 
    id  : null,
    type: null,
    init: function() {
      this.id = 'L' + new Date();
    }
  });
  
  var OnClickListener = Listener.extend({
    onClick: function(event) {
    
    }
  });
  
  // var Screen = Class.extend({
  //   update: function(dt) { },
  //   render: function(dt) { }
  // });
  // var LoadingScreen = Screen.extend({ });
  // var MenuScreen    = Screen.extend({ });
  // var PauseScreen   = Screen.extend({ });
  // var GameScreen    = Screen.extend({ });
  
})();