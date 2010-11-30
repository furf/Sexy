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
