define([
    'require',
    'lib/jquery-min',
    'lib/backbone-min',
    'views/root'
    ],
    function (require, $, Backbone) 
    {
        'use strict';
        var appRouter = Backbone.Router.extend( //a router is overkill for an app this size,
        {                                       //but it's nice to have for future extension
            initialize: function () 
            {   
                this.root_view = new (require('views/root'))(); 
            },

            routes: {
                "": "root",
            },
            
            root: function () 
            {
                this.root_view.render();
                this.root_view.views[0].render(); 
            },
        });
        return appRouter;
    }
);