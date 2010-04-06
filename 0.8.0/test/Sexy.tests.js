var validResponse = 'Hello, world.';


/**
 * Sexy.html()
 */
module('html');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.html('data/test.html', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'string', 'valid response type');
    equals($(response).text(), validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.html({
    url: 'data/test.html',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'string', 'valid response type');
      equals($(response).text(), validResponse, 'valid response');
      start();
    }
  });
  
});

asyncTest('file does not exist, handle error', 1, function () {

  Sexy.html({
    url: '404.html',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.html('404.html', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(start, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 3, function () {

  Sexy.html('data/test.html', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'string', 'valid response type');
    equals($(response).text(), validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 3, function () {

  Sexy.html({
    url: 'data/test.html',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'string', 'valid response type');
      equals($(response).text(), validResponse, 'valid response');
      start();
    }
  });
  
});


/**
 * Sexy.json()
 */
module('json');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.json('data/test.json', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'object', 'valid response type');
    equals(response.msg, validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.json({
    url: 'data/test.json',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, validResponse, 'valid response');
      start();
    }
  });
  
});

asyncTest('file does not exist, handle error', 1, function () {

  Sexy.json({
    url: '404.json',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.json('404.json', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(start, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 3, function () {

  Sexy.json('data/test.json', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'object', 'valid response type');
    equals(response.msg, validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 3, function () {

  Sexy.json({
    url: 'data/test.json',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, validResponse, 'valid response');
      start();
    }
  });
  
});


/**
 * Sexy.jsonp()
 */
module('jsonp, local');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.jsonp('data/test.php', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'object', 'valid response type');
    equals(response.msg, validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.jsonp({
    url: 'data/test.php',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, validResponse, 'valid response');
      start();
    }
  });
  
});

asyncTest('file does not exist, handle error', 1, function () {

  Sexy.jsonp({
    url: '404.php',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.jsonp('404.php', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(start, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 3, function () {

  Sexy.jsonp('data/test.php', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'object', 'valid response type');
    equals(response.msg, validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 3, function () {

  Sexy.jsonp({
    url: 'data/test.php',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, validResponse, 'valid response');
      start();
    }
  });
  
});


/**
 * Sexy.jsonp(), remote
 */
module('jsonp, remote');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.jsonp('http://furf.com/exp/sexy/test.php', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'object', 'valid response type');
    equals(response.msg, validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.jsonp({
    url: 'http://furf.com/exp/sexy/test.php',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, validResponse, 'valid response');
      start();
    }
  });
  
});

asyncTest('file does not exist, handle error (KNOWN ISSUE)', 1, function () {

  Sexy.jsonp({
    url: 'http://furf.com/exp/sexy/404.php',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
  setTimeout(function () {
    ok(false, 'error callback not triggered');
    start();
  }, 500);
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.jsonp('http://furf.com/exp/sexy/404.php', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(function () {
    ok(true, 'success callback not triggered');
    start();
  }, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 3, function () {

  Sexy.jsonp('http://furf.com/exp/sexy/test.php', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'object', 'valid response type');
    equals(response.msg, validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 3, function () {

  Sexy.jsonp({
    url: 'http://furf.com/exp/sexy/test.php',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, validResponse, 'valid response');
      start();
    }
  });
  
});


/**
 * Sexy.script()
 */
module('script');

asyncTest('file exists, handle success, brief syntax', 2, function () {

  Sexy.script('data/test.js', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    equals(helloWorld(), validResponse, 'valid response');
    start();

    // Clean up before next test
    helloWorld = null;
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 2, function () {

  Sexy.script({
    url: 'data/test.js',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      equals(helloWorld(), validResponse, 'valid response');
      start();

      // Clean up before next test
      helloWorld = null;
    }
  });
  
});

asyncTest('file does not exist, handle error', 1, function () {

  Sexy.script({
    url: '404.js',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.script('404.js', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(start, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 2, function () {

  Sexy.script('data/test.js', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    equals(helloWorld(), validResponse, 'valid response');
    start();
    
    // Clean up before next test
    helloWorld = null;
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 2, function () {

  Sexy.script({
    url: 'data/test.js',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      equals(helloWorld(), validResponse, 'valid response');
      start();

      // Clean up before next test
      helloWorld = null;
    }
  });
  
});


/**
 * Sexy.script(), remote
 */
module('script, remote');

asyncTest('file exists, handle success, brief syntax', 2, function () {

  Sexy.script('http://furf.com/exp/sexy/test.js', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    equals(helloWorld(), validResponse, 'valid response');
    start();

    // Clean up before next test
    helloWorld = null;
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 2, function () {

  Sexy.script({
    url: 'http://furf.com/exp/sexy/test.js',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      equals(helloWorld(), validResponse, 'valid response');
      start();

      // Clean up before next test
      helloWorld = null;
    }
  });
  
});

asyncTest('file does not exist, handle error (KNOWN ISSUE)', 1, function () {

  Sexy.script({
    url: 'http://furf.com/exp/sexy/404.js',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
  setTimeout(function () {
    ok(false, 'error callback not triggered');
    start();
  }, 500);
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.script('http://furf.com/exp/sexy/404.js', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(function () {
    ok(true, 'success callback not triggered');
    start();
  }, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 2, function () {

  Sexy.script('http://furf.com/exp/sexy/test.js', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    equals(helloWorld(), validResponse, 'valid response');
    start();
    
    // Clean up before next test
    helloWorld = null;
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 2, function () {

  Sexy.script({
    url: 'http://furf.com/exp/sexy/test.js',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      equals(helloWorld(), validResponse, 'valid response');
      start();

      // Clean up before next test
      helloWorld = null;
    }
  });
  
});


/**
 * Sexy.style()
 */
module('style');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.style('data/test.css', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(response.nodeType === 1 && response.nodeName.toUpperCase() === 'STYLE', 'valid response type');
    var p = $('<p id="helloWorld">Hello, world.</p>').appendTo('body');
    equals(p.css('font-size'), '72px', 'valid response');
    start();

    // Clean up before next test
    p.remove();
    $(response).remove();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.style({
    url: 'data/test.css',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(response.nodeType === 1 && response.nodeName.toUpperCase() === 'STYLE', 'valid response type');
      var p = $('<p id="helloWorld">Hello, world.</p>').appendTo('body');
      equals(p.css('font-size'), '72px', 'valid response');
      start();

      // Clean up before next test
      p.remove();
      $(response).remove();
    }
  });
  
});

asyncTest('file does not exist, handle error', 1, function () {

  Sexy.style({
    url: '404.css',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.style('404.css', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(start, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 3, function () {

  Sexy.style('data/test.css', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(response.nodeType === 1 && response.nodeName.toUpperCase() === 'STYLE', 'valid response type');
    var p = $('<p id="helloWorld">Hello, world.</p>').appendTo('body');
    equals(p.css('font-size'), '72px', 'valid response');
    start();

    // Clean up before next test
    p.remove();
    $(response).remove();
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 3, function () {

  Sexy.style({
    url: 'data/test.css',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(response.nodeType === 1 && response.nodeName.toUpperCase() === 'STYLE', 'valid response type');
      var p = $('<p id="helloWorld">Hello, world.</p>').appendTo('body');
      equals(p.css('font-size'), '72px', 'valid response');
      start();

      // Clean up before next test
      p.remove();
      $(response).remove();
    }
  });
  
});


/**
 * Sexy.style(), remote
 */
module('style, remote');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.style('http://furf.com/exp/sexy/test.css', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(response.nodeType === 1 && response.nodeName.toUpperCase() === 'LINK', 'valid response type');
    var p = $('<p id="helloWorld">Hello, world.</p>').appendTo('body');
    equals(p.css('font-size'), '72px', 'valid response');
    start();

    // Clean up before next test
    p.remove();
    $(response).remove();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.style({
    url: 'http://furf.com/exp/sexy/test.css',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(response.nodeType === 1 && response.nodeName.toUpperCase() === 'LINK', 'valid response type');
      var p = $('<p id="helloWorld">Hello, world.</p>').appendTo('body');
      equals(p.css('font-size'), '72px', 'valid response');
      start();

      // Clean up before next test
      p.remove();
      $(response).remove();
    }
  });
  
});

asyncTest('file does not exist, handle error (KNOWN ISSUE)', 1, function () {

  Sexy.style({
    url: 'http://furf.com/exp/sexy/404.css',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
  setTimeout(function () {
    ok(false, 'error callback not triggered');
    start();
  }, 500);
  
});

asyncTest('file does not exist, don\'t handle success (KNOWN ISSUE)', 0, function () {

  Sexy.style('http://furf.com/exp/sexy/404.css', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(function () {
    ok(true, 'success callback not triggered');
    start();
  }, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 3, function () {

  Sexy.style('http://furf.com/exp/sexy/test.css', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(response.nodeType === 1 && response.nodeName.toUpperCase() === 'LINK', 'valid response type');
    var p = $('<p id="helloWorld">Hello, world.</p>').appendTo('body');
    equals(p.css('font-size'), '72px', 'valid response');
    start();

    // Clean up before next test
    p.remove();
    $(response).remove();
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 3, function () {

  Sexy.style({
    url: 'http://furf.com/exp/sexy/test.css',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(response.nodeType === 1 && response.nodeName.toUpperCase() === 'LINK', 'valid response type');
      var p = $('<p id="helloWorld">Hello, world.</p>').appendTo('body');
      equals(p.css('font-size'), '72px', 'valid response');
      start();

      // Clean up before next test
      p.remove();
      $(response).remove();
    }
  });
  
});


/**
 * Sexy.text()
 */
module('text');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.text('data/test.txt', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'string', 'valid response type');
    equals(response, validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.text({
    url: 'data/test.txt',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'string', 'valid response type');
      equals(response, validResponse, 'valid response');
      start();
    }
  });
  
});

asyncTest('file does not exist, handle error', 1, function () {

  Sexy.text({
    url: '404.txt',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.text('404.txt', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(start, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 3, function () {

  Sexy.text('data/test.txt', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'string', 'valid response type');
    equals(response, validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 3, function () {

  Sexy.text({
    url: 'data/test.txt',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'string', 'valid response type');
      equals(response, validResponse, 'valid response');
      start();
    }
  });
  
});


/**
 * Sexy.xml()
 */
module('xml');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.xml('data/test.xml', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(response instanceof Document, 'valid response type');
    equals($(response).find('response > message').text(), validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.xml({
    url: 'data/test.xml',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(response instanceof Document, 'valid response type');
      equals($(response).find('response > message').text(), validResponse, 'valid response');
      start();
    }
  });
  
});

asyncTest('file does not exist, handle error', 1, function () {

  Sexy.xml({
    url: '404.xml',
    error: function () {
      ok(true, 'error callback triggered');
      start();
    }
  });
  
});

asyncTest('file does not exist, don\'t handle success', 0, function () {

  Sexy.xml('404.xml', function (response, previous, next, status) {
    ok(false, 'success callback incorrectly triggered');
  });

  setTimeout(start, 500);
  
});

asyncTest('file exists, ignore defer on first call, brief syntax', 3, function () {

  Sexy.xml('data/test.xml', true, function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(response instanceof Document, 'valid response type');
    equals($(response).find('response > message').text(), validResponse, 'valid response');
    start();
  });
  
});

asyncTest('file exists, ignore defer on first call, verbose syntax', 3, function () {
          
  Sexy.xml({
    url: 'data/test.xml',
    defer: true,
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(response instanceof Document, 'valid response type');
      equals($(response).find('response > message').text(), validResponse, 'valid response');
      start();
    }
  });
  
});


/**
 * defer
 */
module('defer');

asyncTest('defer, brief syntax', 3, function() {

  var n = 0;

  Sexy
    .json('data/sleep.php?file=fruit.json', function (response, previous, next, status) {
      equals(n++, 0, 'proper callback sequence');
      next.url = next.url + '?boo=fuz';
    })
    .json('data/repeat.php', true, function (response, previous, next, status) {
      equals(n++, 1, 'proper callback sequence');
      equals(response.boo, 'fuz');
      start();
    });

});

asyncTest('defer, verbose syntax', 3, function() {

  var n = 0;

  Sexy
    .json('data/sleep.php?file=fruit.json', function (response, previous, next, status) {
      equals(n++, 0, 'proper callback sequence');
      next.data.foo = 'baz';
    })
    .json({
      url: 'data/sleep.php?file=repeat.php',
      data: { foo:'bar' },
      defer: true,
      success: function (response, previous, next, status) {
        equals(n++, 1, 'proper callback sequence');
        equals(response.foo, 'baz');
        start();
      }
    });

});

asyncTest('defer, combo syntax', 5, function() {

  var n = 0;

  Sexy
    .json('data/sleep.php?file=fruit.json', function (response, previous, next, status) {
      equals(n++, 0, 'proper callback sequence');
      next.data.foo = 'baz';
    })
    .json({
      url: 'data/sleep.php?file=repeat.php',
      data: { foo:'bar' },
      defer: true,
      success: function (response, previous, next, status) {
        equals(n++, 1, 'proper callback sequence');
        equals(response.foo, 'baz');
        next.url = next.url + '?boo=fuz';
      }
    })
    .json('data/repeat.php', true, function (response, previous, next, status) {
      equals(n++, 2, 'proper callback sequence');
      equals(response.boo, 'fuz');
      start();
    });

});


/**
 * 
 */
module('sajax', {
  setup: function () {
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

asyncTest('local, unbiased', 15, function () {

  var n = 0,
      fruit = this.fruit,
      host = 'data/sleep.php?file=',
      htmlCfg = {
        url: host + 'fruit.html&delay=0',
        success: function (data, previous, next, status) {
          equals(n++, 0, 'proper callback sequence');
          equals(next, jsonCfg, 'valid next argument');
          return $(data).find('span').map(function () {
            return $(this).text();
          }).get();
        }      
      },
      jsonCfg = {
        url: host + 'fruit.json&delay=1',
        success: function (data, previous, next, status) {
          equals(n++, 1, 'proper callback sequence');
          equals(next, jsonpCfg, 'valid next argument');
          return previous.concat(data.fruit);
        }
      },
      jsonpCfg = {
        url: host + 'fruit.php&delay=2',
        success: function (data, previous, next, status) {
          equals(n++, 2, 'proper callback sequence');
          equals(next, scriptCfg, 'valid next argument');
          return previous.concat(data.fruit);
        }
      },
      scriptCfg = {
        url: host + 'fruit.js&delay=3',
        success: function (data, previous, next, status) {
          equals(n++, 3, 'proper callback sequence');
          equals(next, styleCfg, 'valid next argument');
          return previous.concat(getFruit());
        }
      },
      styleCfg = {
        url: host + 'fruit.css&delay=4',
        success: function (data, previous, next, status) {
          equals(n++, 4, 'proper callback sequence');
          equals(next, textCfg, 'valid next argument');
          return previous.concat(['mango', 'nectarine', 'orange']);
        }
      },
      textCfg = {
        url: host + 'fruit.txt&delay=5',
        success: function (data, previous, next, status) {
          equals(n++, 5, 'proper callback sequence');
          equals(next, xmlCfg, 'valid next argument');
          return previous.concat(data.split(/\s+/g));
        }
      },
      xmlCfg = {
        url: host + 'fruit.xml&delay=6',
        success: function (data, previous, next, status) {
          equals(n++, 6, 'proper callback sequence');
          equals(next, undefined, 'valid next argument');
          same(previous.concat($(data).find('fruit').map(function () {
            return $(this).text();
          }).get()), fruit, 'valid response');
          start();
        }
      };

  Sexy
    .html(htmlCfg)
    .json(jsonCfg)
    .jsonp(jsonpCfg)
    .script(scriptCfg)
    .style(styleCfg)
    .text(textCfg)
    .xml(xmlCfg);
});

asyncTest('local, reverse bias', 15, function () {

  var n = 0,
      fruit = this.fruit,
      host = 'data/sleep.php?file=',
      htmlCfg = {
        url: host + 'fruit.html&delay=6',
        success: function (data, previous, next, status) {
          equals(n++, 0, 'proper callback sequence');
          equals(next, jsonCfg, 'valid next argument');
          return $(data).find('span').map(function () {
            return $(this).text();
          }).get();
        }      
      },
      jsonCfg = {
        url: host + 'fruit.json&delay=5',
        success: function (data, previous, next, status) {
          equals(n++, 1, 'proper callback sequence');
          equals(next, jsonpCfg, 'valid next argument');
          return previous.concat(data.fruit);
        }
      },
      jsonpCfg = {
        url: host + 'fruit.php&delay=4',
        success: function (data, previous, next, status) {
          equals(n++, 2, 'proper callback sequence');
          equals(next, scriptCfg, 'valid next argument');
          return previous.concat(data.fruit);
        }
      },
      scriptCfg = {
        url: host + 'fruit.js&delay=3',
        success: function (data, previous, next, status) {
          equals(n++, 3, 'proper callback sequence');
          equals(next, styleCfg, 'valid next argument');
          return previous.concat(getFruit());
        }
      },
      styleCfg = {
        url: host + 'fruit.css&delay=2',
        success: function (data, previous, next, status) {
          equals(n++, 4, 'proper callback sequence');
          equals(next, textCfg, 'valid next argument');
          return previous.concat(['mango', 'nectarine', 'orange']);
        }
      },
      textCfg = {
        url: host + 'fruit.txt&delay=1',
        success: function (data, previous, next, status) {
          equals(n++, 5, 'proper callback sequence');
          equals(next, xmlCfg, 'valid next argument');
          return previous.concat(data.split(/\s+/g));
        }
      },
      xmlCfg = {
        url: host + 'fruit.xml&delay=0',
        success: function (data, previous, next, status) {
          equals(n++, 6, 'proper callback sequence');
          equals(next, undefined, 'valid next argument');
          same(previous.concat($(data).find('fruit').map(function () {
            return $(this).text();
          }).get()), fruit, 'valid response');
          start();
        }
      };

  Sexy
    .html(htmlCfg)
    .json(jsonCfg)
    .jsonp(jsonpCfg)
    .script(scriptCfg)
    .style(styleCfg)
    .text(textCfg)
    .xml(xmlCfg);
});

asyncTest('local, random bias', 15, function () {

  var n = 0,
      fruit = this.fruit,
      host = 'data/sleep.php?delay=6&random=true&file=',
      htmlCfg = {
        url: host + 'fruit.html',
        success: function (data, previous, next, status) {
          equals(n++, 0, 'proper callback sequence');
          equals(next, jsonCfg, 'valid next argument');
          return $(data).find('span').map(function () {
            return $(this).text();
          }).get();
        }      
      },
      jsonCfg = {
        url: host + 'fruit.json',
        success: function (data, previous, next, status) {
          equals(n++, 1, 'proper callback sequence');
          equals(next, jsonpCfg, 'valid next argument');
          return previous.concat(data.fruit);
        }
      },
      jsonpCfg = {
        url: host + 'fruit.php',
        success: function (data, previous, next, status) {
          equals(n++, 2, 'proper callback sequence');
          equals(next, scriptCfg, 'valid next argument');
          return previous.concat(data.fruit);
        }
      },
      scriptCfg = {
        url: host + 'fruit.js',
        success: function (data, previous, next, status) {
          equals(n++, 3, 'proper callback sequence');
          equals(next, styleCfg, 'valid next argument');
          return previous.concat(getFruit());
        }
      },
      styleCfg = {
        url: host + 'fruit.css',
        success: function (data, previous, next, status) {
          equals(n++, 4, 'proper callback sequence');
          equals(next, textCfg, 'valid next argument');
          return previous.concat(['mango', 'nectarine', 'orange']);
        }
      },
      textCfg = {
        url: host + 'fruit.txt',
        success: function (data, previous, next, status) {
          equals(n++, 5, 'proper callback sequence');
          equals(next, xmlCfg, 'valid next argument');
          return previous.concat(data.split(/\s+/g));
        }
      },
      xmlCfg = {
        url: host + 'fruit.xml&delay=0',
        success: function (data, previous, next, status) {
          equals(n++, 6, 'proper callback sequence');
          equals(next, undefined, 'valid next argument');
          same(previous.concat($(data).find('fruit').map(function () {
            return $(this).text();
          }).get()), fruit, 'valid response');
          start();
        }
      };

  Sexy
    .html(htmlCfg)
    .json(jsonCfg)
    .jsonp(jsonpCfg)
    .script(scriptCfg)
    .style(styleCfg)
    .text(textCfg)
    .xml(xmlCfg);
});


asyncTest('remote, unbiased', 7, function () {

  var n = 0,
      fruit =  [
        "grape", "honeydew", "indian jujube",
        "jackfruit", "kiwi", "lemon",
        "mango", "nectarine", "orange"
      ],
      host = 'http://furf.com/exp/sexy/sleep.php?file=',
      jsonpCfg = {
        url: host + 'fruit.php&delay=0',
        success: function (data, previous, next, status) {
          equals(n++, 0, 'proper callback sequence');
          equals(next, scriptCfg, 'valid next argument');
          return [].concat(data.fruit);
        }
      },
      scriptCfg = {
        url: host + 'fruit.js&delay=1',
        success: function (data, previous, next, status) {
          equals(n++, 1, 'proper callback sequence');
          equals(next, styleCfg, 'valid next argument');
          return previous.concat(getFruit());
        }
      },
      styleCfg = {
        url: host + 'fruit.css&delay=2',
        success: function (data, previous, next, status) {
          equals(n++, 2, 'proper callback sequence');
          equals(next, undefined, 'valid next argument');
          same(previous.concat(['mango', 'nectarine', 'orange']), fruit, 'valid response');
          start();
        }
      };

  Sexy
    .jsonp(jsonpCfg)
    .script(scriptCfg)
    .style(styleCfg);
});


// /**
//  * 
//  */
// module('error');
// 
// asyncTest('local, unbiased', 7, function () {
// 
//   var n = 0,
//       fruit = this.fruit,
//       host = 'data/',
//       htmlCfg = {
//         url: host + '404.html',
//         success: function (data, previous, next, status) {
//           console.log('html, success');
//         },
//         error: function (xhr, status, error) {
//           equals(n++, 0, 'proper callback sequence');
//           console.log('html, error');
//         }      
//       },
//       jsonCfg = {
//         url: host + '404.json',
//         success: function (data, previous, next, status) {
//           console.log('json, success');
//         },
//         error: function (xhr, status, error) {
//           equals(n++, 1, 'proper callback sequence');
//           console.log('json, error');
//         }      
//       },
//       jsonpCfg = {
//         url: host + '404.php',
//         success: function (data, previous, next, status) {
//           console.log('jsonp, success');
//         },
//         error: function (xhr, status, error) {
//           equals(n++, 2, 'proper callback sequence');
//           console.log('jsonp, error');
//         }      
//       },
//       scriptCfg = {
//         url: host + '404.js',
//         success: function (data, previous, next, status) {
//           console.log('js, success');
//         },
//         error: function (xhr, status, error) {
//           equals(n++, 3, 'proper callback sequence');
//           console.log('js, error');
//         }      
//       },
//       styleCfg = {
//         url: host + '404.css',
//         success: function (data, previous, next, status) {
//           console.log('css, success');
//         },
//         error: function (xhr, status, error) {
//           equals(n++, 4, 'proper callback sequence');
//           console.log('css, error');
//         }      
//       },
//       textCfg = {
//         url: host + '404.txt',
//         success: function (data, previous, next, status) {
//           console.log('txt, success');
//         },
//         error: function (xhr, status, error) {
//           equals(n++, 5, 'proper callback sequence');
//           console.log('txt, error');
//         }      
//       },
//       xmlCfg = {
//         url: host + '404.xml',
//         success: function (data, previous, next, status) {
//           console.log('xml, success');
//         },
//         error: function (xhr, status, error) {
//           equals(n++, 6, 'proper callback sequence');
//           console.log('xml, error');
//           start();
//         }      
//       };
// 
//   Sexy
//     .html(htmlCfg)
//     .json(jsonCfg)
//     .jsonp(jsonpCfg)
//     .script(scriptCfg)
//     .style(styleCfg)
//     .text(textCfg)
//     .xml(xmlCfg);
// });
