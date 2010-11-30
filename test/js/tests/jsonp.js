/**
 * Sexy.jsonp()
 */
module('jsonp, local');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.jsonp('data/test.php', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'object', 'valid response type');
    equals(response.msg, 'Hello, world.', 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.jsonp({
    url: 'data/test.php',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, 'Hello, world.', 'valid response');
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
    equals(response.msg, 'Hello, world.', 'valid response');
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
      equals(response.msg, 'Hello, world.', 'valid response');
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
    equals(response.msg, 'Hello, world.', 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.jsonp({
    url: 'http://furf.com/exp/sexy/test.php',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, 'Hello, world.', 'valid response');
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
    equals(response.msg, 'Hello, world.', 'valid response');
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
      equals(response.msg, 'Hello, world.', 'valid response');
      start();
    }
  });
  
});
