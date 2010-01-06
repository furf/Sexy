(function ($) {

  var TEXT   = 'text',
      SCRIPT = 'script',
      STYLE  = 'style',
      _proto_;

  function passData (data) {
    return data;
  }

  function passPrevious (data, status, previous) {
    return previous;
  }

  function couple (data, status, previous) {
    return (previous || '') + data;
  }

  function Sexy (cfg) {
    if (!(this instanceof Sexy)) {
      return new Sexy(cfg);
    }
    this.evt = $(this);
    this.cfgs = [];
    this.config(cfg);
  }

  _proto_ = Sexy.prototype = {

    /**
     * Set the mood
     */
    config: function (cfg) {
      this.config = cfg;
    },

    get: function (type, url, defer, fn) {

      if (typeof defer !== 'boolean') {
        fn = defer;
        defer = false;
      }

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
          success     = url.success || fn || (isScript || isStyle ? passPrevious : passData);

      cfgs.push($.extend(cfg, this.cfg, {

        dataType: (isScript || isStyle) ? TEXT : type,

        success: function (data, status) {

          var args = arguments,
              prev = cfgs[pid];

          if (!prev || RESULT_DATA in prev) {

            if (data.target === evt[0]) {
              args = data.data;
            }

            data = args[0];

            if (isScript) {
              $.globalEval(data);
            } else if (isStyle) {
          		if (data && rnotwhite.test(data)) {
                $('<style type="text/css"/>').appendTo('head').text(data);
          		}
            }

            cfg[RESULT_DATA] = success.call(cfg, args[0], args[1], prev && prev[RESULT_DATA]);
            evt.trigger(ON_SUCCESS + uid);

          } else {
            evt.one(ON_SUCCESS + pid, args, cfg.success);
          }
        }
      }));

      function send () {
        $.ajax(cfg);
        evt.trigger(ON_SEND + uid);
      };

      if (defer) {
        evt.one(ON_SUCCESS + pid, send);
        this.defer = uid;
      } else if (this.defer) {
        evt.one(ON_SEND + this.defer, send);
      } else {
        send();
      }

      return this;
    }
  };

  /**
   * Slip into something more comfortable: dataType-based convenience methods
   */
  $.each(['html', 'json', 'jsonp', SCRIPT, STYLE, TEXT, 'xml'], function (i, type) {
    _proto_[type] = function (url, defer, fn) {
      return this.get(type, url, defer, fn);
    };
  });

  /**
   * A rose by any other name: sexy pseudonyms for script and style methods
   */
  _proto_.js  = _proto_[SCRIPT];
  _proto_.css = _proto_[STYLE];

  /**
   * Nice package: Load a sequence of scripts as text, assemble them in order,
   * and perform a single insertion.
   */
  _proto_.bundle = function (/* url, url2, ..., fn */) {

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
  };

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
