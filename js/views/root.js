define([
    'require',
    'lib/backbone-min',
    'collections/diary_mc',
    'collections/day_mc',
    'collections/fitness_mc',
    // 'collections/cdown_mc',
    'views/void',
    'views/diary',
    'views/streak',
    'views/input'
    ],
    function (require, Backbone, diaryC, dayC, fitnessC, voidV, diaryV, streakV, inputV) 
    { 
        'use strict';
        var rootView = Backbone.View.extend({
            el: $('#content'),
            initialize: function ()
            {
                _.bindAll(this, 'render', 'key_handler', 'key_tabbing', 'toggle_bar');
                this.render(); //get skeleton ready for subviews

                // collection objects
                this.diary_c = new diaryC;
                this.day_c = new dayC;
                this.fitness_c = new fitnessC;
                // this.countdown_c = new cdownC;
                
                // load cached
                this.diary_c.fetch(); 
                this.day_c.fetch();
                this.fitness_c.fetch();
                // this.countdown_c.fetch();

                if (this.fitness_c.length === 0) { // touched for the very first time
                    this.fitness_c.create();
                }

                // view objects put in an array
                this.vs = [voidV, diaryV, streakV, inputV]
                this.views = _.map(this.vs, function (v) {return new v();});

                $(window).keyup(this.key_handler); // grab dem keys
            },
            render: function ()
            {
                var tpl = _.template($('#default_tpl').html());
                this.$el.html(tpl);
            },
            events: {
                'click .tabh': 'tab',           //mouse support
                'click div#vo_id' : 'vo_id',    //
                'click div#diary' : 'diary',    //
                'click div#streak' : 'streak',  //
                'keydown #input' : 'create_models' // shift+enter to create entry
            },
            key_tabbing: function (left) {   // constrain arrowkey tabbing
                var selection = $('.tabset div');
                var ima = $('.tabset div.open');
                var ind = selection.index(ima)
                if (left) {
                    if (ind === 0) {
                        return false;
                    } else { ind -= 1; }
                } else {
                    if (ind == selection.length - 1) {
                        return false;
                    } else { ind += 1; }
                }
                $('.open').removeClass('open');
                $(selection[ind]).addClass('open'); // open the tab and
                this.views[ind].render();           // render the view
                return false;
            },
            key_handler: function (e) {         // hotkeys:
                if (e.ctrlKey == 1) {           // ctrl +
                    if (e.which == 37) { // left
                        this.key_tabbing('left');
                    } else if (e.which == 39) { // right
                        this.key_tabbing();
                    } else if (e.which == 73) { // i
                        this.toggle_bar();
                    }
                }
            },
            toggle_bar: function () {
                if ($('#input').attr('tog') === '0') {
                    this.views[3].render();
                    $('#input').attr('tog', '1') // no easy way to tell if a view is rendered :(
                } else { 
                    this.views[3].hide(); 
                    $('#input').attr('tog', '0');
                }
            },
            create_models: function (e) 
            {   
                if (e.which == 13 && e.shiftKey == 1) {
                    // gather data
                    this.entries = [$('#l_entry'), $('#w_entry'), $('#p_entry'), $('#g_entry'), 
                    $('#d_entry')];

                    // to models
                    if ($("#lifted").is(':checked')) { // advance the sequence
                        var o_seq = this.fitness_c.first().get('sequence');
                        var new_seq = o_seq.slice(1) + o_seq[0];
                        this.fitness_c.first().save( {'sequence': new_seq} );
                    }
                    this.day_c.create({
                        learn: this.entries[0].val(),
                        work: this.entries[1].val(),
                        play: this.entries[2].val(),
                        grade: this.entries[3].val()
                    });  
                    this.diary_c.create( {entry: this.entries[4].val()} );

                    // cleanup
                    _.map(this.entries, function (e) { e.val(''); })
                    $('#lifted').prop('checked', false);
                    this.views[0].render();
                    return false;
                }
            },
            //  below here is for mouse tab clicking...
            tab: function (e) {
                $('.open').removeClass('open');
                $(e.target).addClass('open');
            },
            vo_id: function () {this.views[0].render();},
            diary: function () {this.views[1].render();},
            streak: function () {this.views[2].render();}
        });
        return rootView;
    }
);