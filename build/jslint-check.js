load('build/jslint.js');

var dir = 'dist/',
    files = [
      'jquery.Sexy-slim.js',
      'jquery.Sexy.js',
      'Sexy-slim.js',
      'Sexy.js'
    ],
    
    i, n,
    
    // JSLINT config
    config = {
      evil:   true,
      forin:  true,
      maxerr: 100
    },

    // All of the following are known issues that we think are 'ok'
    // (in contradiction with JSLint) more information here:
    // http://docs.jquery.com/JQuery_Core_Style_Guidelines
    ok = {
      'Expected an identifier and instead saw \'undefined\' (a reserved word).': true,
      'Use \'===\' to compare with \'null\'.': true,
      'Use \'!==\' to compare with \'null\'.': true,
      '\'now\' was used before it was defined.': true
    };


for (i = 0, n = files.length; i < n; ++i) {
  lint(dir + files[i]);
}


function lint (file) {

  var found = 0, src, errors, i, n, error;

  print('JSLint checking: ' + file);

  src = readFile(file);

  JSLINT(src, config);
  
  errors = JSLINT.errors;
  
  for (i = 0, n = errors.length; i < n; ++i) {
    
    error = errors[i];

    if (!ok[error.reason]) {
      found++;
      print(error.evidence);
      print('    Problem at line ' + error.line + ' character ' + error.character + ': ' + error.reason);
    }
  }

  if (found > 0) {
    print(found + ' error(s) found.');
  } else {
    print('JSLint check passed.');
  }
}
