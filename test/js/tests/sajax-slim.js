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
      'pomegranate', 'quince', 'raspberry',
      'starfruit', 'tomato', 'ugli'
    ];
  }
});

asyncTest('local, unbiased', 13, function () {

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
          equals(next, textCfg, 'valid next argument');
          return previous.concat(getFruit());
        }
      },
      textCfg = {
        url: host + 'fruit.txt&delay=5',
        success: function (data, previous, next, status) {
          equals(n++, 4, 'proper callback sequence');
          equals(next, xmlCfg, 'valid next argument');
          return previous.concat(data.split(/\s+/g));
        }
      },
      xmlCfg = {
        url: host + 'fruit.xml&delay=6',
        success: function (data, previous, next, status) {
          equals(n++, 5, 'proper callback sequence');
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
    .text(textCfg)
    .xml(xmlCfg);
});

asyncTest('local, reverse bias', 13, function () {

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
          equals(next, textCfg, 'valid next argument');
          return previous.concat(getFruit());
        }
      },
      textCfg = {
        url: host + 'fruit.txt&delay=1',
        success: function (data, previous, next, status) {
          equals(n++, 4, 'proper callback sequence');
          equals(next, xmlCfg, 'valid next argument');
          return previous.concat(data.split(/\s+/g));
        }
      },
      xmlCfg = {
        url: host + 'fruit.xml&delay=0',
        success: function (data, previous, next, status) {
          equals(n++, 5, 'proper callback sequence');
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
    .text(textCfg)
    .xml(xmlCfg);
});

asyncTest('local, random bias', 13, function () {

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
          equals(next, textCfg, 'valid next argument');
          return previous.concat(getFruit());
        }
      },
      textCfg = {
        url: host + 'fruit.txt',
        success: function (data, previous, next, status) {
          equals(n++, 4, 'proper callback sequence');
          equals(next, xmlCfg, 'valid next argument');
          return previous.concat(data.split(/\s+/g));
        }
      },
      xmlCfg = {
        url: host + 'fruit.xml&delay=0',
        success: function (data, previous, next, status) {
          equals(n++, 5, 'proper callback sequence');
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
    .text(textCfg)
    .xml(xmlCfg);
});


asyncTest('remote, unbiased', 5, function () {

  var n = 0,
      fruit =  [
        "grape", "honeydew", "indian jujube",
        "jackfruit", "kiwi", "lemon"
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
          equals(next, undefined, 'valid next argument');
          same(previous.concat(getFruit()), fruit, 'valid response');
          start();
        }
      };

  Sexy
    .jsonp(jsonpCfg)
    .script(scriptCfg);
});
