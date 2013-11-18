define([
	'lib/backbone-min',
	'lib/backbone.localStorage-min'
	], 
	function (Backbone, localStorage) 
	{
		'use strict';
		var dayEntry = Backbone.Model.extend(
		{
			defaults: function () 
			{
		  		return {
		    		learn: 0,
		  			work: 0,
		  			play: 0,
		  			grade: ''
		  		}
			}
		});
		var dayC = Backbone.Collection.extend(
		{	
			model: dayEntry,
		    localStorage: new localStorage("bisudb")
		});
		return dayC;
	}
);