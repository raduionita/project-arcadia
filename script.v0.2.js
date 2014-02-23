
(function() {

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  
  var viewport = document.getElementById('viewport');
  
  viewport.addEventListener('focus', function(event) {
    console.log(event);
  }, false);
  viewport.dispatchEvent(new FocusEvent('focus'));
  
  
  var Input = function() {
    var listeners = [];
    
    var handle = function(event) {
      for(var i = 0, l = listeners.length; i < l; ++i) {
        var listener = listeners[i];
        if(event.type === listener.type)
          listener['on'+ listener.type.capitalize()].call(listeners[i], event);
      }
    };
    
    this.registerHandler = function(listener) {
      listeners.push(listener);
      if(/^key/.test(listener.type)) 
        window.addEventListener(listener.type, handle, false);
      else
        viewport.addEventListener(listener.type, handle, false);
    };
  }
  
  var KeydownListener = function(data) {
    this.data   = data || null;
    this.type   = 'keydown';
    this.onKeydown = function(event) {
      console.log(data);
    }
  };
  
  var ClickListener = function(data) {
    this.data   = data || null;
    this.type   = 'click';
    this.onClick = function(event) {
      console.log(data);
    };
  }
  
  var input = new Input();
  input.registerHandler(new ClickListener(1));
  input.registerHandler(new KeydownListener(2));
  
  
})();