define([
    'require',
    'lib/backbone-min'
    ],
    function (require, Backbone) 
    { 
        'use strict';
        var voidV = Backbone.View.extend({

            initialize: function ()
            {
                _.bindAll(this, 'render');
                this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];   
            },
            render: function ()
            {   
                var mini = window.Bisu.App.root_view.day_c; // convenience
                var seq = window.Bisu.App.root_view.fitness_c.first().get('sequence');
                
                // good time to fast?
                var len = mini.length;
                if (len % 76 === 0) {
                    var f = "Full Day Fast";
                } else if (len % 21 === 0) {
                    var f = "Partial Fast";
                } else {
                    var f = '';
                }
                
                // today's prediction
                var vals = this.what_do(mini.slice(-5)); // returns [most, little, least]
                // today's workout
                var act = this.fitness(seq);
                // populate the tpl
                var tpl = _.template($('#void_tpl').html(), { fast: f, 
                                                              most: vals[0],
                                                              little: vals[1],
                                                              least: vals[2],
                                                              action: act});
                this.$el = $('#tabbody');
                this.$el.html(tpl);
                    // display the date
                var d = new Date();
                $('#day').html(this.days[d.getDay()] + '<span style="font-weight:normal"> &#8212; </span>' + d.getDate());
                
                
            },
            what_do: function (days) // :: [Day_obj] -> [String] //four strings
            {
                    //   play : (work+learn) is 1 : 4
                    //   learn : work is 2 : 3
                var learn = '   SICP';
                var work = '   Renshuu';
                var play = '   Play';

                // if you're using firefox, then one can:
                // var [learn_hrs, work_hrs, play_hrs] = days.reduce(...)
                var hr_sums = days.reduce(function (acc, obj) { return [acc[0] + +obj.get('learn'),
                                                                        acc[1] + +obj.get('work'),
                                                                        acc[2] + +obj.get('play')]}, [0,0,0]);
                var learn_hrs = hr_sums[0]; var work_hrs = hr_sums[1]; var play_hrs = hr_sums[2];

                // ascertain proportions
                var too_much_play = play_hrs / (learn_hrs + work_hrs) >= 0.25;
                var too_much_study = (learn_hrs) / (work_hrs) >= 0.66;
                var lazy = too_much_play && too_much_study;
                
                // shift accordingly
                if (lazy) {
                    return [work, learn, play];
                } else if (too_much_play) {
                   return [learn, work, play];
                } else if (too_much_study) {
                    return [play, work, learn];
                } else {
                    return [play, learn, work];
                }
            },
            fitness: function (seq) 
            {
                var key = { 
                    '0' : '    Yoga', 
                    '1' : '    Run and Lift', 
                    '2' : '    Run', 
                    '3' : '    Climb'
                }
                return key[seq[0]];
            }
        });
        return voidV;
    }
);

