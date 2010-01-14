// @todo support remote CSS with <link/>
// @todo figure out callback trigger for remote CSS
(function ($) {

  var HOST   = location.protocol + '//' + location.hostname + (location.port !== '' ? ':' + location.port : ''),
      TEXT   = 'text',
      SCRIPT = 'script',
      STYLE  = 'style',
      _proto_;

  function Sexy (cfg) {
    /**
     * Allow instantiation without new keyword
     */
    if (!(this instanceof Sexy)) {
      return new Sexy(cfg);
    }
    this.cfgs = [];
    this.setup(cfg);
    this.evt = $(this);
  }

  _proto_ = Sexy.prototype = {

    /**
     * Set the mood
     */
    setup: function (cfg) {
      this.cfg = cfg;
    },

    /**
     * Nice package: Load a sequence of scripts as text, assemble them in order,
     * and perform a single insertion.
     */
    bundle: function (/* url, url2, ..., fn */) {

      var args = arguments,
          fn   = $.isFunction(args[args.length - 1]) ? Array.prototype.pop.call(args) : passPrevious,
          i, n;

      for (i = 0, n = args.length - 1; i < n; ++i) {
        this.get(TEXT, args[i], couple);
      }

      return this.get(TEXT, args[i], function (data, status, previous) {
        var src = couple(data, status, previous);
        $.globalEval(src);
        return fn(src, status);
      });
    },

    get: function (type, url, /* defer, */ fn) {

      // if (typeof defer !== 'boolean') {
      //   fn = defer;
      //   defer = false;
      // }

      var RESULT_DATA = '__',
          ON_SEND     = 'send',
          ON_SUCCESS  = 'success',
          rnotwhite   = /\S/,
          evt         = this.evt,
          cfgs        = this.cfgs,
          uid         = cfgs.length,
          pid         = uid - 1,
          cfg         = (typeof url !== 'string') ? url : { url: url },
          isScript    = type === SCRIPT,
          isStyle     = type === STYLE,
          
          // for the time being isXSS only tracks JS
          // need to figure out how to fire success on addition of <link/>
          // (look at YUI)
          isXSS       = isScript && cfg.url.indexOf('http') === 0 && cfg.url.indexOf(HOST) === -1,

          /**
           * Cache the user-configured success callbacks.
           *
           * The return value of the user-configured success callback is
           * stored and passed to the success callback of the subsequent
           * request. If the user does not supply a success callback, a
           * pass-through function will return the unmodified response (for all
           * types except script and style) or the return of last callback
           * (for script and style data types).
           */
          success = url.success || fn || (isScript || isStyle ? passPrevious : passData);

      cfgs.push($.extend(cfg, this.cfg, {

        /**
         * Retrieve script and style data types as text for deferred
         * evaluation to guarantee ordering. Scripts and styles are inserted
         * into the DOM immediately before the success callback is fired.
         */
        dataType: (!isXSS && isScript || isStyle) ? TEXT : type,

        /**
         * Wrap the user-configured success callback with an
         * event-driven handler.
         */
        success: function (data, status) {
          
          var prev = cfgs[pid];

          /**
           * Load the stored result from the previous Ajax request if
           * available. This value will be undefined if the previous
           * request has not completed or if the current request is the
           * first.
           *
           * If the previous call has returned, fire the user-configured
           * success callback, passing as arguments the response data
           * and the previously returned data.
           *
           * Or if this is the first call, fire the callback passing
           * only the response data.
           */
          if (!prev || RESULT_DATA in prev) {

            /**
             * If the first argument contains our event manager in its
             * target property, then the previous response just
             * completed and triggered its "onSuccess" event, which fired
             * this callback. Use the passed data as argument to the 
             * user-configured callback.
             */
            if (data && data.target === evt[0]) {
              status = data.data[1];
              data   = data.data[0];
            }

            /**
             * Handle deferred script evaluation
             */
            if (isScript) {
              $.globalEval(data);

            /**
             * Handle deferred style evaluation
             */
            } else if (isStyle) {
              if (data && rnotwhite.test(data)) {
                $('<style type="text/css"/>').appendTo('head').text(data);
              }
            }
            
            /**
             * Call the user-configured success callback, passing the current
             * response and the stored result of the previous success callback
             * as arguments.
             */
            cfg[RESULT_DATA] = success.call(cfg, data, status, prev && prev[RESULT_DATA]);

            /**
             * Trigger the "onSuccess" event of the current Ajax request to
             * trigger the success callback of the subsequent request if its
             * data has been returned.
             */
            evt.trigger(ON_SUCCESS + uid);

          /**
           * If the previous Ajax request has not completed, bind this
           * success callback to the "onSuccess" event of the previous
           * request. Pass the arguments from the current response to
           * the deferred callback in the event's data property. When
           * the previous Ajax response returns, these arguments will be
           * applied to the user-configured callback.
           */
          } else {
            evt.one(ON_SUCCESS + pid, [data, status], cfg.success);
          }

        }
      }));

      // function send () {
      //   $.ajax(cfg);
      //   evt.trigger(ON_SEND + uid);
      // };
      // 
      // if (defer) {
      //   evt.one(ON_SUCCESS + pid, send);
      //   this.defer = uid;
      // } else if (this.defer) {
      //   evt.one(ON_SEND + this.defer, send);
      // } else {
      //   send();
      // }
      
      if (isXSS && isScript) {
        evt.one(ON_SUCCESS + pid, function () {
          $.ajax(cfg);
        });
      } else {
        $.ajax(cfg);
      }
      
      return this;
    }
  };

  function passData (data) {
    return data;
  }

  function passPrevious (data, status, previous) {
    return previous;
  }

  function couple (data, status, previous) {
    return (previous || '') + data;
  }

  /**
   * Slip into something more comfortable: dataType-based convenience methods
   */
  $.each(['html', 'json', 'jsonp', SCRIPT, STYLE, TEXT, 'xml'], function (i, type) {
    _proto_[type] = function (url, /* defer, */ fn) {
      return this.get(type, url, /* defer, */ fn);
    };
  });

  /**
   * A rose by any other name: sexy pseudonyms for script and style methods
   */
  _proto_.js  = _proto_[SCRIPT];
  _proto_.css = _proto_[STYLE];

  /**
   * Get naked: alias instance methods as static methods of Sexy constructor
   * for ()-less instantiation
   */
  $.each(_proto_, function (name, method) {
    Sexy[name] = function () {
      return method.apply(new Sexy(), arguments);
    };
  });

  /**
   * Put 'em on the glass!
   */
  window.Sexy = Sexy;

})(jQuery);
