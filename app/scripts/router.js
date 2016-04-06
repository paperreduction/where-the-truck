var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');

var LoginComponent = require('./components/login.jsx').LoginComponent;
var AddChangeTruckComponent = require('./components/truck.jsx').AddChangeTruckComponent;


var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'dashboard/': 'index',
        'login/': 'login',
        'admin/trucks/add/': 'adminTrucksAdd',
        'admin/trucks/': 'adminTrucks'
    },
    initialize: function(){
        // Configure the node mount point
        this.appContainer = document.getElementById('app');

        // Configure parse
        Parse.initialize("wherethetruck");
        Parse.serverURL = 'http://where-the-truck.herokuapp.com/api/';
        this.Parse = Parse;

        // User logged in?
        this.checkUser();
    },
    checkUser: function(){
        if(Parse.User.current()){
            this.navigate('admin/trucks/add/', {trigger: true});
        }
    },
    requireLogin: function(){
        if(!Parse.User.current()){
            this.navigate('login/', {trigger: true});
        }
    },
    index: function(){
        ReactDOM.unmountComponentAtNode(this.appContainer);
        this.appContainer.innerHTML = "<div class='well'>Intentionally Left Blank</div>";
    },
    login: function(){
        this.checkUser();

        var self = this;
        ReactDOM.unmountComponentAtNode(this.appContainer);
        ReactDOM.render(React.createElement(LoginComponent, {app: self}), this.appContainer);
    },

    // Admin Views
    adminTrucksAdd: function(){
        var self = this;
        ReactDOM.unmountComponentAtNode(this.appContainer);
        ReactDOM.render(React.createElement(AddChangeTruckComponent, {app: self}), this.appContainer);
    }
});

module.exports = new Router();
