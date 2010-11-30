/**
 * Sexy.script()
 */
module('script');

asyncTest('file exists, handle success, brief syntax', 2, function () {

  Sexy.script('data/test.js', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    equals(helloWorld(), 'Hello, world.', 'valid response');
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
      equals(helloWorld(), 'Hello, world.', 'valid response');
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
    equals(helloWorld(), 'Hello, world.', 'valid response');
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
      equals(helloWorld(), 'Hello, world.', 'valid response');
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
    equals(helloWorld(), 'Hello, world.', 'valid response');
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
      equals(helloWorld(), 'Hello, world.', 'valid response');
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
    equals(helloWorld(), 'Hello, world.', 'valid response');
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
      equals(helloWorld(), 'Hello, world.', 'valid response');
      start();

      // Clean up before next test
      helloWorld = null;
    }
  });
  
});
