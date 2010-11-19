(function ($) {

  var helloWorld = 'Hello, world.';

  /**
   * handle success callback (local request)
   */
  module('handle success callback (local request)');

  asyncTest('html() success', 2, function() {
    Sexy.html('test.html', function (response) {
      ok(true, 'success callback triggered');
      equals($(response).text(), helloWorld, 'valid response');
      start();
    });
  });

  asyncTest('json() success', 2, function() {
    Sexy.json('test.json', function (response) {
      ok(true, 'success callback triggered');
      equals(response.msg, helloWorld, 'valid response');
      start();
    });
  });

  asyncTest('jsonp() success', 2, function() {
    Sexy.jsonp('test.php', function (response) {
      ok(true, 'success callback triggered');
      equals(response.msg, helloWorld, 'valid response');
      start();
    });
  });

  asyncTest('script() success', 2, function() {
    Sexy.script('test.js', function () {
      ok(true, 'success callback triggered');
      equals(helloWorldLocal(), helloWorld, 'valid response');
      start();
    });
  });

  asyncTest('style() success', 2, function() {
    Sexy.style('test.css', function () {
      ok(true, 'success callback triggered');
      var p = $('<p id="helloLocal">Hello, world.</p>').appendTo('body');
      equals(p.css('font-size'), '72px', 'valid response');
      p.remove();
      start();
    });
  });

  asyncTest('text() success', 2, function() {
    Sexy.text('test.txt', function (response) {
      ok(true, 'success callback triggered');
      equals(response, helloWorld, 'valid response');
      start();
    });
  });

  asyncTest('xml() success', 2, function() {
    Sexy.xml('test.xml', function (response) {
      ok(true, 'success callback triggered');
      equals($(response).find('response > message').text(), helloWorld, 'valid response');
      start();
    });
  });


  /**
   * handle error callback (local request)
   */
  module('handle error callback (local request)');

  asyncTest('html() error', 1, function() {
    Sexy.html({
      url: '404.html',
      error: function () {
        ok(true, 'error callback triggered');
        start();
      }
    });
  });

  asyncTest('json() error', 1, function() {
    Sexy.json({
      url: '404.json',
      error: function () {
        ok(true, 'error callback triggered');
        start();
      }
    });
  });

  asyncTest('jsonp() error', 1, function() {
    Sexy.jsonp({
      url: '404.php',
      error: function () {
        ok(true, 'error callback triggered');
        start();
      }
    });
  });

  asyncTest('script() error', 1, function() {
    Sexy.script({
      url: '404.js',
      error: function () {
        ok(true, 'error callback triggered');
        start();
      }
    });
  });

  asyncTest('style() error', 1, function() {
    Sexy.style({
      url: '404.css',
      error: function () {
        ok(true, 'error callback triggered');
        start();
      }
    });
  });

  asyncTest('text() error', 1, function() {
    Sexy.text({
      url: '404.txt',
      error: function () {
        ok(true, 'error callback triggered');
        start();
      }
    });
  });

  asyncTest('xml() error', 1, function() {
    Sexy.xml({
      url: '404.xml',
      error: function () {
        ok(true, 'error callback triggered');
        start();
      }
    });
  });


  /**
   * handle success callback (remote request)
   */
  module('handle success callback (remote request)', {
    setup: function () {
      this.remoteHost = 'http://www2.sexyjs.com/tests/';
    }
  });

  asyncTest('jsonp() success', 2, function() {
    Sexy.jsonp(this.remoteHost + 'test.php', function (response) {
      ok(true, 'success callback triggered');
      equals(response.msg, helloWorld, 'valid response');
      start();
    });
  });

  asyncTest('script() success', 2, function() {
    Sexy.script(this.remoteHost + 'test.js', function () {
      ok(true, 'success callback triggered');
      equals(helloWorldRemote(), helloWorld, 'valid response');
      start();
    });
  });

  asyncTest('style() success', 2, function() {
    Sexy.style(this.remoteHost + 'test.css', function () {
      ok(true, 'success callback triggered');
      var p = $('<p id="helloRemote">Hello, world.</p>').appendTo('body');
      equals(p.css('font-size'), '72px', 'valid response');
      p.remove();
      start();
    });
  });


  // /**
  //  * handle error callback (remote request)
  //  */
  // module('handle error callback (remote request)', {
  //   setup: function () {
  //     this.remoteHost = 'http://www2.sexyjs.com/tests/';
  //   }
  // });
  // 
  // asyncTest('jsonp() error', 1, function() {
  //   setTimeout(function () {
  //     ok(false);
  //     error.find('.remote-jsonp').fail();
  //     start();
  //   }, 2000);
  //   Sexy.jsonp({
  //     url: this.remoteHost + '404.php',
  //     error: function () {
  //       ok(true, 'error callback triggered');
  //       error.find('.remote-jsonp').pass();
  //       start();
  //     }
  //   });
  // });
  // 
  // asyncTest('script() error', 1, function() {
  //   setTimeout(function () {
  //     ok(false);
  //     error.find('.remote-script').fail();
  //     start();
  //   }, 2000);
  //   Sexy.script({
  //     url: this.remoteHost + '404.js',
  //     error: function () {
  //       ok(true, 'error callback triggered');
  //       error.find('.remote-script').pass();
  //       start();
  //     }
  //   });
  // });
  // 
  // asyncTest('style() error', 1, function() {
  //   setTimeout(function () {
  //     ok(false);
  //     error.find('.remote-style').fail();
  //     start();
  //   }, 2000);
  //   Sexy.style({
  //     url: this.remoteHost + '404.css',
  //     error: function () {
  //       ok(true, 'error callback triggered');
  //       error.find('.remote-style').pass();
  //       start();
  //     }
  //   });
  // });

  /**
   * handle deferred request
   */
  module('handle deferred request');

  asyncTest('defer', 2, function() {

    var n = 0;

    Sexy
      .json('sleep.php?delay=2&file=fruit.json', function (response, status, previous, next) {
        next.data.foo = 'baz';
      })
      .json({
        url: 'sleep.php?delay=2&file=repeat.php',
        data: { foo:'bar' },
        defer: true,
        success: function (response, status, previous, next) {
          equals(response.foo, 'baz');
          next.url = next.url + '?boo=fuz';
        }
      })
      .json('repeat.php', true, function (response) {
        equals(response.boo, 'fuz');
        start();
      });

  });

  module('simultaneous request / sequential response', {
    setup: function () {
      this.remoteHost = 'http://www2.sexyjs.com/tests/';
      this.fruit = [
        'apple', 'banana', 'cherry',
        'date', 'elderberry', 'fig',
        'grape', 'honeydew', 'indian jujube',
        'jackfruit', 'kiwi', 'lemon',
        'mango', 'nectarine', 'orange',
        'pomegranate', 'quince', 'raspberry',
        'starfruit', 'tomato', 'ugli'
      ];
    }
  });

  asyncTest('local, unbiased', 8, function () {

    var n = 0, fruit = this.fruit;

    Sexy.html('fruit.html', function (data, status, previous) {
      equals(n++, 0, 'proper callback sequence');
      return $(data).find('span').map(function () {
        return $(this).text();
      }).get();
    }).json('fruit.json', function (data, status, previous) {
      equals(n++, 1, 'proper callback sequence');
      return previous.concat(data.fruit);
    }).jsonp('fruit.php', function (data, status, previous) {
      equals(n++, 2, 'proper callback sequence');
      return previous.concat(data.fruit);
    }).script('fruit.js', function (data, status, previous) {
      equals(n++, 3, 'proper callback sequence');
      return previous.concat(getFruit());
    }).style('fruit.css', function (data, status, previous) {
      equals(n++, 4, 'proper callback sequence');
      return previous.concat(['mango', 'nectarine', 'orange']);
    }).text('fruit.txt', function (data, status, previous) {
      equals(n++, 5, 'proper callback sequence');
      return previous.concat(data.split(/\s+/g));
    }).xml('fruit.xml', function (data, status, previous) {
      equals(n++, 6, 'proper callback sequence');
      same(previous.concat($(data).find('fruit').map(function () {
        return $(this).text();
      }).get()), fruit, 'valid response');
      start();
    });
  });

  asyncTest('local, reverse bias', 8, function () {

    var n = 0, fruit = this.fruit;

    Sexy.html('sleep.php?delay=6&file=fruit.html', function (data, status, previous) {
      equals(n++, 0, 'proper callback sequence');
      return $(data).find('span').map(function () {
        return $(this).text();
      }).get();
    }).json('sleep.php?delay=5&file=fruit.json', function (data, status, previous) {
      equals(n++, 1, 'proper callback sequence');
      return previous.concat(data.fruit);
    }).jsonp('sleep.php?delay=4&file=fruit.php', function (data, status, previous) {
      equals(n++, 2, 'proper callback sequence');
      return previous.concat(data.fruit);
    }).script('sleep.php?delay=3&file=fruit.js', function (data, status, previous) {
      equals(n++, 3, 'proper callback sequence');
      return previous.concat(getFruit());
    }).style('sleep.php?delay=2&file=fruit.css', function (data, status, previous) {
      equals(n++, 4, 'proper callback sequence');
      return previous.concat(['mango', 'nectarine', 'orange']);
    }).text('sleep.php?delay=1&file=fruit.txt', function (data, status, previous) {
      equals(n++, 5, 'proper callback sequence');
      return previous.concat(data.split(/\s+/g));
    }).xml('sleep.php?file=fruit.xml', function (data, status, previous) {
      equals(n++, 6, 'proper callback sequence');
      same(previous.concat($(data).find('fruit').map(function () {
        return $(this).text();
      }).get()), fruit, 'valid response');
      start();
    });
  });

  asyncTest('local, random bias', 8, function () {

    var n = 0, fruit = this.fruit;

    Sexy.html('sleep.php?delay=6&random=true&file=fruit.html', function (data, status, previous) {
      equals(n++, 0, 'proper callback sequence');
      return $(data).find('span').map(function () {
        return $(this).text();
      }).get();
    }).json('sleep.php?delay=6&random=true&file=fruit.json', function (data, status, previous) {
      equals(n++, 1, 'proper callback sequence');
      return previous.concat(data.fruit);
    }).jsonp('sleep.php?delay=6&random=true&file=fruit.php', function (data, status, previous) {
      equals(n++, 2, 'proper callback sequence');
      return previous.concat(data.fruit);
    }).script('sleep.php?delay=6&random=true&file=fruit.js', function (data, status, previous) {
      equals(n++, 3, 'proper callback sequence');
      return previous.concat(getFruit());
    }).style('sleep.php?delay=6&random=true&file=fruit.css', function (data, status, previous) {
      equals(n++, 4, 'proper callback sequence');
      return previous.concat(['mango', 'nectarine', 'orange']);
    }).text('sleep.php?delay=6&random=true&file=fruit.txt', function (data, status, previous) {
      equals(n++, 5, 'proper callback sequence');
      return previous.concat(data.split(/\s+/g));
    }).xml('sleep.php?delay=6&random=true&file=fruit.xml', function (data, status, previous) {
      equals(n++, 6, 'proper callback sequence');
      same(previous.concat($(data).find('fruit').map(function () {
        return $(this).text();
      }).get()), fruit, 'valid response');
      start();
    });
  });

  asyncTest('remote, unbiased', 3, function () {

    var n = 0;

    Sexy.jsonp(this.remoteHost + 'fruit.php', function (data, status, previous) {
      equals(n++, 0, 'proper callback sequence');
    }).script(this.remoteHost + 'fruit.js', function (data, status, previous) {
      equals(n++, 1, 'proper callback sequence');
    }).style(this.remoteHost + 'fruit.css', function (data, status, previous) {
      equals(n++, 2, 'proper callback sequence');
      start();
    });
  });

  asyncTest('remote, reverse bias', 3, function () {

    var n = 0;

    Sexy.jsonp(this.remoteHost + 'sleep.php?delay=2&file=fruit.php', function (data, status, previous) {
      equals(n++, 0);
    }).script(this.remoteHost + 'sleep.php?delay=1&file=fruit.js', function (data, status, previous) {
      equals(n++, 1);
    }).style(this.remoteHost + 'sleep.php?file=fruit.css', function (data, status, previous) {
      equals(n++, 2);
      start();
    });
  });

})(jQuery);
