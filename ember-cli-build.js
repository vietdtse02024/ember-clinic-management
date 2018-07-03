'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  var bower = 'bower_components';
  app.import(bower + '/bootstrap/dist/css/bootstrap.css');
  app.import(bower + '/bootstrap/dist/css/bootstrap.css.map', {
    destDir : 'assets'
  });
  app.import(bower + '/font-awesome/web-fonts-with-css/css/fontawesome.css');
  app.import(bower + '/bootstrap-select/dist/css/bootstrap-select.css');

  var fa_font = bower + '/font-awesome/webfonts.';
  var fa_font_exts = [ 'ttf', 'woff', 'woff2', 'svg' ];
  fa_font_exts.forEach(function(ext) {
    app.import(fa_font + ext, {
      destDir : 'fonts'
    });
  });

  app.import(bower + '/bootstrap/dist/js/bootstrap.js');
  app.import(bower + '/bootstrap-select/dist/js/bootstrap-select.js');

  return app.toTree();
};
