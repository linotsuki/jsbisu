jsbisu v0.x
======

bisu in the browser :) , using backbone (and backbone.localStorage), require, jquery, and underscore. It's actually fitted into a larger skeletion which will make it extremely easy to add an articles view, resume view, pictures view, reviews view, etc if desired. See the bisu repo for more background info on bisu which this repo is mostly full of.

Basically though, in exchange for an entry a day, the program will hold your diary, form a seinfeld chain (don't break it), and balance your work vs learning vs play. The proportions I'm using are  
	
	play : (work+learn) is 1 : 4
    learn : work is 2 : 3

...but it's easy to change if you want a different balance.

Currently it's a standalone version, storing the data in localStorage as JSON (future functionality: import/export). Just dl the project directory and point your browser accordingly (e.g. file:///home/your_user/jsbisu/index.html) if you want to play with it. Since it's using backbone it can easily be adapted to running off a server. 

Although tabbing works with a mouse, it's meant to be used completely with the keyboard (as currently envisioned). The controls are:
	
	ctrl + leftkey to tab left
	ctrl + rightkey to tab right
	ctrl + i to input
		shift + enter (from within the input view) to submit

There's a lot missing for the void tab, and some of it needs to be tightened (e.g. validation), but the core is there. Although Backbone can be a pain, it's extremely easy to modify and add once everything is well and connected. Um, I've only tried this in Chromium, but it should be fine in Firefox too.

Future:
	
	countdown items (e.g. 25 days until X)
	vim keybindings
	to-do pad
	styling (background will be dark, views light)