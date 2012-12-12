var build = require('./build/build.js'),
    lint = require('./build/hint.js'),
    UglifyJS = require('uglify-js');

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
task('build', ['lint'], function (compsBase32, buildName) {

	var files = build.getFiles(compsBase32);

	console.log('Concatenating ' + files.length + ' files...');

	var content = build.combineFiles(files),
	    newSrc = COPYRIGHT + content,

	    pathPart = 'dist/leaflet' + (buildName ? '-' + buildName : ''),
	    srcPath = pathPart + '-src.js',

	    oldSrc = build.load(srcPath),
	    srcDelta = build.getSizeDelta(newSrc, oldSrc);

	console.log('\tUncompressed size: ' + newSrc.length + ' bytes (' + srcDelta + ')');

	if (newSrc === oldSrc) {
		console.log('\tNo changes');
	} else {
		build.save(srcPath, newSrc);
		console.log('\tSaved to ' + srcPath);
	}

	console.log('Compressing...');

	var path = pathPart + '.js',
	    oldCompressed = build.load(path),
	    newCompressed = COPYRIGHT + UglifyJS.minify(files, {warnings: true}).code,
	    delta = build.getSizeDelta(newCompressed, oldCompressed);

	console.log('\tCompressed size: ' + newCompressed.length + ' bytes (' + delta + ')');

desc('Run PhantomJS tests');
task('test', ['lint'], build.test);

task('default', ['build']);
