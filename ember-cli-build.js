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
  app.import(bower + '/simple-line-icons/css/simple-line-icons.css');
  app.import(bower + '/bootstrap-select/dist/css/bootstrap-select.css');
  app.import(bower + '/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css');

  app.import(bower + '/font-awesome/css/font-awesome.css');
  app.import(bower + '/font-awesome/css/font-awesome.css.map', {
    destDir : 'assets'
  });
  var fa_font = bower + '/font-awesome/fonts/fontawesome-webfont.';
  var fa_font_exts = [ 'ttf', 'woff', 'woff2' ];
  fa_font_exts.forEach(function(ext) {
    app.import(fa_font + ext, {
      destDir : 'fonts'
    });
  });

  var icon_font = bower + '/simple-line-icons/fonts/Simple-Line-Icons.';
  var icon_font_exts = [ 'ttf', 'woff', 'woff2', 'svg' ];
  icon_font_exts.forEach(function(ext) {
    app.import(icon_font + ext, {
      destDir : 'fonts'
    });
  });

  app.import(bower + '/glyphicons/styles/glyphicons.css');

  var glyphicon_font = bower + '/glyphicons/fonts/glyphicons-halflings-regular.';
  var glyphicon_font_exts = [ 'ttf', 'woff', 'woff2', 'svg' ];
  glyphicon_font_exts.forEach(function(ext) {
    app.import(glyphicon_font + ext, {
      destDir : 'fonts'
    });
  });

  app.import(bower + '/bootstrap/dist/js/bootstrap.js');
  app.import(bower + '/bootstrap-select/dist/js/bootstrap-select.js');
  app.import(bower + '/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js');
  app.import(bower + '/pdfmake/build/pdfmake.js');
  app.import(bower + '/pdfmake/build/vfs_fonts.js');

  app.import('node_modules/print-js/dist/print.js');

  app.import('node_modules/jsbarcode/dist/JsBarcode.all.js');
  return app.toTree();
};
