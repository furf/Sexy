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

asyncTest('defer, one of each', 5, function() {

  var htmlSuccess   = false,
      jsonSuccess   = false,
      jsonpSuccess  = false,
      scriptSuccess = false,
      textSuccess   = false,
      xmlSuccess    = false;

  Sexy
    .html({
      url: 'data/fruit.html',
      defer: true,
      success: function () {
        htmlSuccess = true;
      }
    })
    .json({
      url: 'data/fruit.json',
      defer: true,
      beforeSend: function () {
        ok(htmlSuccess, 'proper execution sequence');
      },
      success: function () {
        jsonSuccess = true;
      }
    })
    .jsonp({
      url: 'data/fruit.php',
      defer: true,
      beforeSend: function () {
        ok(jsonSuccess, 'proper execution sequence');
      },
      success: function () {
        jsonpSuccess = true;
      }
    })
    .script({
      url: 'data/fruit.js',
      defer: true,
      beforeSend: function () {
        ok(jsonpSuccess, 'proper execution sequence');
      },
      success: function () {
        scriptSuccess = true;
      }
    })
    .text({
      url: 'data/fruit.txt',
      defer: true,
      beforeSend: function () {
        ok(scriptSuccess, 'proper execution sequence');
      },
      success: function () {
        textSuccess = true;
      }
    })
    .xml({
      url: 'data/fruit.xml',
      defer: true,
      beforeSend: function () {
        ok(textSuccess, 'proper execution sequence');
      },
      success: function () {
        start();
      }
    });

});
