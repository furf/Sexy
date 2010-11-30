
  var loc         = window.location,
      HOST        = loc.protocol + '//' + loc.hostname + (loc.port !== '' ? ':' + loc.port : ''),
      RESULT_DATA = '__',
      dataTypes   = ['html', 'json', 'jsonp', 'script', 'text', 'xml'],
      i, n;

  /**
   * Implicit callbacks
   */
  function passData (data) {
    return data;
  }

  function passPrevious (data, previous) {
    return previous;
  }

  function couple (data, previous) {
    return (previous || '') + data;
  }

  /**
   * Constructs a new Sexy instance
   */
  function Sexy (cfg) {

    /**
     * Allow instantiation without new keyword
     */
    if (!(this instanceof Sexy)) {
      return new Sexy(cfg);
    }

    this.cfgs = [];
    this.setup(cfg);
  }

  Sexy.prototype = {

    setup: function (cfg) {
      this.cfg = cfg || {};
      return this;
    },

    sajax: function (cfg) {

      var cfgs     = this.cfgs,
          uid      = cfgs.length,
          prev     = cfgs[uid - 1],
          realType = cfg.dataType,
          remote   = cfg.url.indexOf('http') === 0 && cfg.url.indexOf(HOST) === -1,
          isScript = realType === 'script',
          defer    = uid > 0 ? remote && isScript ? true : cfg.defer : false,
          success  = cfg.success || (isScript ? passPrevious : passData),
          error    = cfg.error || jQuery.noop,
          complete = cfg.complete || jQuery.noop;

      cfgs.push(jQuery.extend(true, cfg, this.cfg, cfg, {

        sendAfterSend: [],
      
        /**
         * Retrieve script and style data types as text for deferred
         * evaluation to guarantee ordering. Scripts and styles are inserted
         * into the DOM immediately before the success callback is fired.
         */
        dataType: !remote && isScript ? 'text' : realType,

        /**
         * Wrap the user-configured success callback with an
         * event-driven handler.
         */
        success: function (data, status) {

          /**
           * If the request is first or the previous request has completed,
           * evaluate the response data (if necessary) and execute the success
           * callback.
           */
          if (!prev || RESULT_DATA in prev) {

            /**
             * Evaluate (local) script and style dataTypes.
             */
            if (isScript && !remote) {
              jQuery.globalEval(data);
            }

            /**
             * Normalize the status argument for remote dataTypes which use
             * non-XHR techniques for loading.
             */
            cfg.status = remote ? 'success' : status;

            /**
             * Execute the original success callback, passing the response
             * data, the return value of the previous success callback, the
             * next configuration object, and the success status.
             */
            cfg[RESULT_DATA] = success.call(cfg, data, prev && prev[RESULT_DATA], cfgs[uid + 1], cfg.status);

            /**
             * If the next request completed before this one, fire it's 
             * success callback.
             */
            if (cfg.nextSuccess) {
              cfg.nextSuccess();
            
            /**
             * If the next request is deferred, trigger it's send method.
             */
            } else if (cfg.sendAfterSuccess) {
              cfg.sendAfterSuccess();
            }

          /**
           * If the previous request has not yet completed, bind the success
           * callback to its response arguments and attach it to the
           * nextSuccess event of the previous request.
           */
          } else {
            prev.nextSuccess = jQuery.proxy(function () {
              cfg.success(data, status);
            }, cfg);
          }

        },

        error: function (xhr, status, e) {
          error.call(cfg, xhr, status, e);
        },

        complete: function (xhr, status) {
          complete.call(cfg, xhr, status);
        }
      }));


      function send () {

        var i, n;

        jQuery.ajax(cfg);
      
        if (cfg.sendAfterSend.length > 0) {
          for (i = 0, n = cfg.sendAfterSend.length; i < n; ++i) {
            cfg.sendAfterSend[i]();
          }
        }
      }

      /**
       * Since requests for remote scripts and styles use direct DOM insertion
       * (via <script> and <link> tags) and execute immediatele, we defer the
       * request until after the successful response of the previous request.
       */
      if (defer) {
        prev.sendAfterSuccess = send;
        this.lastDefer = cfg;
      } else if (this.lastDefer) {
        this.lastDefer.sendAfterSend.push(send);
      } else {
        send();
      }

      return this;
    },

    bundle: function (/* url, url2, ..., fn */) {

      var args = arguments,
          fn   = jQuery.isFunction(args[args.length - 1]) ? Array.prototype.pop.call(args) : passPrevious,
          i, n;

      for (i = 0, n = args.length - 1; i < n; ++i) {
        this.text(args[i], couple);
      }

      return this.text(args[i], function (data, previous, next, status) {
        var src = couple(data, previous);
        jQuery.globalEval(src);
        return fn(src, previous, next, status);
      });
    }

  };

  /**
   * Add sexy convenience methods
   */
  function addDataTypeMethod (dataType) {
    Sexy.prototype[dataType] = function (cfg, defer, success) {

      if (typeof cfg === 'string') {
      
        if (typeof defer !== 'boolean') {
          success = defer;
          defer   = false;
        }
      
        cfg = {
          url:     cfg,
          defer:   defer,
          success: success
        };
      }

      cfg.dataType = dataType;

      return this.sajax(cfg);
    };
  }

  for (i = 0, n = dataTypes.length; i < n; ++i) {
    addDataTypeMethod(dataTypes[i]);
  }

  Sexy.prototype.js  = Sexy.prototype.script;

  /**
   * Add sexier static methods
   */
  function addStaticMethod (method) {
    Sexy[method] = function () {
      return Sexy.prototype[method].apply(new Sexy(), arguments);
    };
  }

  for (i in Sexy.prototype) {
    addStaticMethod(i);
  }

  window.Sexy = jQuery.sajax = Sexy;
