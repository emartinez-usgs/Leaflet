/*
 * The L namespace contains all Leaflet classes and functions.
 * This code allows you to handle any possible namespace conflicts.
 */

var L, originalL;

var oldL = window.L,
    L = {};

L.version = '0.7-dev';

// define Leaflet for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = L;

// define Leaflet as an AMD module
} else if (typeof define === 'function' && define.amd) {
	define(L);
}

L.version = '0.5';
