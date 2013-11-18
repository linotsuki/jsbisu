define([
    'require',
    'lib/backbone-min'
    ],
    function (require, Backbone) 
    { 
        'use strict';
        var diaryStrV = Backbone.View.extend(
        {
            tagName:  "li",
            template: _.template($('#d_entry_tpl').html()),

            //initialize: function () {},
            render: function () 
            {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });
        return diaryStrV;
    }
);