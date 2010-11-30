/**
 * Sexy.text()
 */
module('text');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.text('data/test.txt', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(typeof response === 'string', 'valid response type');
    equals(response, 'Hello, world.', 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.text({
    url: 'data/test.txt',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(typeof response === 'string', 'valid response type');
      equals(response, 'Hello, world.', 'valid response');
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
    equals(response, 'Hello, world.', 'valid response');
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
      equals(response, 'Hello, world.', 'valid response');
      start();
    }
  });
  
});
