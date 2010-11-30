/**
 * Sexy.xml()
 */
module('xml');

asyncTest('file exists, handle success, brief syntax', 3, function () {

  Sexy.xml('data/test.xml', function (response, previous, next, status) {
    ok(true, 'success callback triggered');
    ok(response instanceof Document, 'valid response type');
    equals($(response).find('response > message').text(), 'Hello, world.', 'valid response');
    start();
  });
  
});

asyncTest('file exists, handle success, verbose syntax', 3, function () {

  Sexy.xml({
    url: 'data/test.xml',
    success: function (response, previous, next, status) {
      ok(true, 'success callback triggered');
      ok(response instanceof Document, 'valid response type');
      equals($(response).find('response > message').text(), 'Hello, world.', 'valid response');
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
    equals($(response).find('response > message').text(), 'Hello, world.', 'valid response');
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
      equals($(response).find('response > message').text(), 'Hello, world.', 'valid response');
      start();
    }
  });
  
});
