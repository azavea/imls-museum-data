// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-23 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/leaflet-dist/leaflet.js',
      'bower_components/leaflet-draw/dist/leaflet.draw-src.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'test/mock/**/*.js',
      'app/scripts/config.js',
      'app/scripts/affix/module.js',
      'app/scripts/affix/action-bar-affix-directive.js',
      'app/scripts/brand/module.js',
      'app/scripts/brand/brand-directive.js',
      'app/scripts/map/module.js',
      'app/scripts/map/cartodb-vis-directive.js',
      'app/scripts/views/footer/module.js',
      'app/scripts/views/footer/footer-directive.js',
      'app/scripts/views/home/module.js',
      'app/scripts/views/home/home-controller.js',
      'app/scripts/views/about/module.js',
      'app/scripts/views/about/about-controller.js',
      'app/scripts/views/contact/module.js',
      'app/scripts/views/contact/contact-controller.js',
      'app/scripts/views/museum/module.js',
      'app/scripts/views/museum/museum-controller.js',
      'app/scripts/app.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
