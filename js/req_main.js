requirejs.config({
    waitSeconds: 90,
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    },
    shim: {
        'lib/jquery-min': {
            exports: '$'
        },
        'lib/underscore-min': {
            exports: '_'
        },
        'lib/backbone-min': {
            deps: ['lib/underscore-min', 'lib/jquery-min'],
            exports: 'Backbone'
        },
        'lib/backbone.localStorage-min': {
            deps: ['lib/backbone-min'],
            exports: 'localStorage'
        }
    }
});

require([
    'lib/jquery-min',
    'lib/underscore-min',
    'lib/backbone-min',
    'lib/backbone.localStorage-min',
    'main2' 
    ], 
    function () 
    {
        'use strict';
        window.Bisu = {};
        window.Bisu.App = new (require('main2'))();
        Backbone.history.start();
        //testing
    }
);