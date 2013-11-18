define([
    'require',
    'lib/backbone-min'
    ],
    function (require, Backbone) 
    { 
        'use strict';
        var inputV = Backbone.View.extend({

            initialize: function ()
            {
                _.bindAll(this, 'render');
            },
            render: function ()
            {   
                var tpl = _.template($('#input_tpl').html());
                this.$el = $('#input');
                this.$el.html(tpl);
                $('#l_entry').focus();
            },
            hide: function () {
                this.$el = $('#input')
                this.$el.html('');
            }

        });
        return inputV;
    }
);