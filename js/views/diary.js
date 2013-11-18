define([
    'require',
    'lib/backbone-min',
    'views/d_str'
    ],
    function (require, Backbone, dStrV) 
    { 
        'use strict';
        var diaryV = Backbone.View.extend({

            initialize: function ()
            {   
                _.bindAll(this, 'render');
            },
            render: function ()
            {   
                var tpl = _.template($('#d_tpl').html());
                this.$el = $('#tabbody')
                this.$el.html(tpl);
                window.Bisu.App.root_view.diary_c.each( function (entry) 
                {
                    var view = new dStrV({model: entry});
                    $("#diary-list").append(view.render().el);
                });
            }
        });
        return diaryV;
    }
);