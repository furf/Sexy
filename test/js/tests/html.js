/**
 * Sexy.html()
 */
module('html');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.html('data/test.html', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'string', 'valid response type');
    equals($(response).text(), 'Hello, world.', 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.html({
    url: 'data/test.html',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'string', 'valid response type');
      equals($(response).text(), 'Hello, world.', 'valid response');
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
    equals($(response).text(), 'Hello, world.', 'valid response');
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
      equals($(response).text(), 'Hello, world.', 'valid response');
      start();
    }
  });
  
});
