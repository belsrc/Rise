(function (window, document, undefined) {

    var Rise = function (selector, context) {
        return new Rise.fn.init(selector, context);
    }

    var handleListenerAssignment = function () {
        var events = {};

        if (typeof window.addEventListener === 'function') {
            events.addListener = function (el, type, fn) {
                el.addEventListener(type, fn, false);
            };
            events.removeListener = function (el, type, fn) {
                el.removeEventListener(type, fn, false);
            };
        } else { // IE
            events.addListener = function (el, type, fn) {
                el.attachEvent('on' + type, fn);
            };
            events.removeListener = function (el, type, fn) {
                el.detachEvent('on' + type, fn);
            };
        }

        return events;
    }();

    // private addClass method

    var addClass = function (element, name) {
        if (element.classList) {
            if (!element.classList.contains(name)) {
                element.classList.add(name);
            }
        } else {
            if ((' ' + element.className + ' ').indexOf(' ' + name + ' ') == -1) {
                if (element.className == '') {
                    element.className = name;
                } else {
                    element.className += ' ' + name;
                }
            }
        }
    };

    // private removeClass method

    var removeClass = function (element, name) {
        if (element.classList) {
            if (element.classList.contains(name)) {
                element.classList.remove(name);
            }
        } else {
            if ((' ' + element.className + ' ').indexOf(' ' + name + ' ') > -1) {
                var pattern = '(?:^|\\s)' + name + '(?!\\S)';
                element.className = element.className.replace(new RegExp(pattern, 'g'), '');
            }
        }
    };

    Rise.fn = Rise.prototype = {
        init: function (selector, context) {

            var result;

            if (!selector || selector.length == 0) {
                return this;
            }

            // handle missing context or array passed to context
            if (!context || context.length > 1) {
                context = document;
            } else {
                context = context[0];
            }

            if (selector.nodeType) {
                result = [selector];
            } else {
                if (selector[0] === '.') {
                    result = context.getElementsByClassName(selector.slice(1, selector.length));
                } else if (selector[0] === '#') {
                    result = context.getElementById(selector.slice(1, selector.length));
                } else {
                    result = context.querySelectorAll(selector);
                }
            }

            return this.merge(this, result);
        },

        addListener: handleListenerAssignment.addListener,

        removeListener: handleListenerAssignment.removeListener,

        eq: function (index) {
            var len = this.length;

            return len > 0 ? new Rise(this[index]) : new Rise(this);
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(this.length - 1);
        },

        addClass: function (name) {
            if (this.length > 1) {
                for (var i = 0, len = this.length; i !== len; i++) {
                    addClass(this[i], name);
                }
            } else {
                addClass(this[0], name);
            }

            return this;
        },

        removeClass: function (name) {
            if (this.length > 1) {
                for (var i = 0, len = this.length; i !== len; i++) {
                    removeClass(this[i], name);
                }
            } else {
                removeClass(this[0], name);
            }

            return this;
        },

        hasClass: function (name) {

        },

        on: function (event, callback) {
            if (this.length > 1) {
                for (var i = 0, len = this.length; i !== len; i++) {
                    this.addListener(this[i], event, callback);
                }
            } else {
                this.addListener(this[0], event, callback);
            }

            return this;
        },

        off: function (event, callback) {
            if (this.length > 1) {
                for (var i = 0, len = this.length; i !== len; i++) {
                    this.removeListener(this[i], event, callback);
                }
            } else {
                this.removeListener(this[0], event, callback);
            }

            return this;
        },

        // taken from jQuery because im lazy
        merge: function (first, second) {
            var l = second.length,
                i = first.length || 0, // in case we pass an object
                j = 0;

            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        }
    }


    Rise.fn.init.prototype = Rise.fn;

    window.Rise = window.$ = Rise;

})(window, document);