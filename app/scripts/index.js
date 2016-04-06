var $ = require('jquery');
var Backbone = require('backbone');

var app = require('./router.js');


// Fire up the app!
$(function(){
    Backbone.history.start();
});
