define([
	'lib/backbone-min',
	'lib/backbone.localStorage-min'
	], 
	function (Backbone, localStorage) 
	{
		'use strict';
		var Fitness = Backbone.Model.extend( 
		{
			defaults: function () 
			{
		  		return {        
		    		sequence: '101020300'
		  		}
			}
		});
		var fitnessC = Backbone.Collection.extend(
		{	
			model: Fitness,
		    localStorage: new localStorage("bisudb3")
		});
		return fitnessC;
	}
);

// pretty ridiculous since this collection only has one model...
// but that's a limitation of localStorage + require