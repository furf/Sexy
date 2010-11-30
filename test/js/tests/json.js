/**
 * Sexy.json()
 */
module('json');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.json('data/test.json', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'object', 'valid response type');
    equals(response.msg, 'Hello, world.', 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.json({
    url: 'data/test.json',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'object', 'valid response type');
      equals(response.msg, 'Hello, world.', 'valid response');
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
    equals(response.msg, 'Hello, world.', 'valid response');
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
      equals(response.msg, 'Hello, world.', 'valid response');
      start();
    }
  });
  
});
