define([
	'lib/backbone-min',
	'lib/backbone.localStorage-min'
	], 
	function (Backbone, localStorage) 
	{
		'use strict';
		var diaryEntry = Backbone.Model.extend( // a diary entry model, I couldn't figure out how to get
		{                                       // this in via require...
			defaults: function () 
			{
		  		return {                    // return so every obj is unique (objects are passed by ref,
		    		entry: 'Stuff happened.' // multiple instances would share the same dict if not)
		  		}
			}
		});
		var diaryC = Backbone.Collection.extend(
		{	
			model: diaryEntry,
		    localStorage: new localStorage("bisudb2")
		});
		return diaryC;
	}
);