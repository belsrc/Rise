(function(window, document, undefined) {

	var Rise = function(selector) {
		return new Rise.fn.init(selector);
	}
	
	var handleListenerAssignment = function() {
        var events = {};
		
        if (typeof window.addEventListener === 'function') {
            events.addListener = function(el, type, fn) {
                el.addEventListener(type, fn, false);
            };
            events.removeListener = function(el, type, fn) {
                el.removeEventListener(type, fn, false);
            };
        } else { // IE
            events.addListener = function(el, type, fn) {
                el.attachEvent('on' + type, fn);
            };
            events.removeListener = function(el, type, fn) {
                el.detachEvent('on' + type, fn);
            };
        } 

        return events;
    }();
	
	// private addClass method
	
	var addClass = function(element, name) {
		if( (' ' + element.className + ' ').indexOf(' ' + name + ' ') == -1 ) {
			if( element.className == '' ) {
				element.className = name;
			}
			else {
				element.className += ' ' + name;
			}
		}
	};
	
	// private removeClass method
	// possible performance refactor needed
	
	var removeClass = function(element, name) {
		if( (' ' + element.className + ' ').indexOf(' ' + name + ' ') > -1 ) {
            var pattern = '(?:^|\\s)' + name + '(?!\\S)';
            element.className = element.className.replace( new RegExp( pattern , 'g'), '' );
        }
	};
	
	var 
	
	Rise.fn = Rise.prototype = {
		init: function(selector) {
			// return an empty array if no selector found
			if (!selector) {
				this.selection = [];
				this.length = 0;
				return this;
			}
			
			// if we are sent a node return the selector
			if (selector.nodeType) {
				this.selection = selector;
				this.length = 1;
			} else { // return the node list
				if( selector[0] === '.' ) {
					this.selection = document.getElementsByClassName(selector.slice(1, selector.length));
				} 
				else if( selector[0] === '#' ) {
					this.selection = document.getElementById(selector.slice(1, selector.length));
				} 
				else {
					this.selection = document.querySelectorAll(selector);
				}
				
				this.length = this.selection.length;
			}
		},
		
		addListener: handleListenerAssignment.addListener,
		
		removeListener: handleListenerAssignment.removeListener,
		
		on: function(event, callback) {	
			if( this.length > 1 ) {
				for( var i = 0, len = this.length; i !== len; i++ ) {
					this.addListener(this.selection[i], event, callback);
				}
			}		
			else{		
				this.addListener(this.selection, event, callback);
			}
			
            return this;
		},
		
		eq: function(index) {
			var el = this.selection[index];
			return el ? new Rise(el) : this;
		},
		
		first: function() {
			return this.eq(0);
		},
		
		last: function() {
			return this.eq(this.length - 1);
		},
		
		addClass: function(name) {
			if( this.length > 1 ) {
				for( var i = 0, len = this.length; i !== len; i++ ){				
					addClass(this.selection[i], name);
				}
			} 
			else {		
				addClass(this.selection, name);
			}

			return this;
		},
		
		removeClass: function(name) {
			if( this.length > 1 ) {
				for( var i = 0, len = this.length; i !== len; i++ ){				
					removeClass(this.selection[i], name);
				}
			} 
			else {		
				removeClass(this.selection, name);
			}

			return this;
		},
	}
	
	
	// since were calling the init function 
	// we need to set its prototype to fn
	Rise.fn.init.prototype = Rise.fn;
	
	// expose Rise to global window object
	window.Rise = window.$ = Rise;
	
})(window, document);