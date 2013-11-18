define([
    'require',
    'lib/backbone-min'
    ],
    function (require, Backbone) 
    { 
        'use strict';
        var streakV = Backbone.View.extend({

            initialize: function ()
            {
                _.bindAll(this, 'render');
            },
            render: function ()
            {   
                this.$el = $('#tabbody')
                var meow = window.Bisu.App.root_view.day_c.pluck("grade"); // returns list of grades
                this.$el.html(meow.join(''));
            },
        });
        return streakV;
    }
);