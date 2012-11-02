/*
Leaflet building, testing and linting scripts.

var COPYRIGHT = '/*\n Copyright (c) 2010-2012, CloudMade, Vladimir Agafonkin\n' +
                ' Leaflet is an open-source JavaScript library for mobile-friendly interactive maps.\n' +
                ' http://leafletjs.com\n*/\n';

    npm install -g jake
    npm install

To check the code for errors and build Leaflet from source, run "jake".
To run the tests, run "jake test".

For a custom build, open build/build.html in the browser and follow the instructions.
*/

var build = require('./build/build.js');

desc('Check Leaflet source for errors with JSHint');
task('lint', build.lint);

desc('Combine and compress Leaflet source files');
task('build', ['lint'], build.build);

desc('Run PhantomJS tests');
task('test', ['lint'], build.test);

task('default', ['build']);
