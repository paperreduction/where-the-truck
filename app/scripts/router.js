var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');

var IndexComponent = require('./components/index.jsx').IndexComponent;
var LoginComponent = require('./components/login.jsx').LoginComponent;
var TruckListComponent = require('./components/truck.jsx').TruckListComponent;
var AddChangeTruckComponent = require('./components/truck.jsx').AddChangeTruckComponent;


var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'dashboard/': 'index',
        'login/': 'login',
        'logout/': 'logout',
        'admin/trucks/add/': 'adminTruckForm',
        'admin/trucks/:id/': 'adminTruckForm',
        'admin/trucks/': 'adminTruckList',
        'trucks/:status/': 'truckList'
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
        }else{
            this.navigate('login/', {trigger: true});
        }
    },
    requireLogin: function(){
        if(!Parse.User.current()){
            this.navigate('login/', {trigger: true});
        }
    },
    index: function(){
        var self = this;
        ReactDOM.unmountComponentAtNode(this.appContainer);
        ReactDOM.render(React.createElement(IndexComponent, {app: self}), this.appContainer);
        //this.appContainer.innerHTML = "<div class='well'>Intentionally Left Blank</div>";
    },
    truckList: function(status){
        var self = this;
        ReactDOM.unmountComponentAtNode(this.appContainer);
        console.log('truck list');
        ReactDOM.render(React.createElement(TruckListComponent, {app: self, status: status}), this.appContainer);
    },
    login: function(){
        this.checkUser();

        var self = this;
        ReactDOM.unmountComponentAtNode(this.appContainer);
        ReactDOM.render(React.createElement(LoginComponent, {app: self}), this.appContainer);
    },
    logout: function(){
        Parse.User.logOut();
        this.checkUser();
    },

    // Admin Views
    adminTruckForm: function(id){
        var self = this;
        ReactDOM.unmountComponentAtNode(this.appContainer);
        ReactDOM.render(React.createElement(AddChangeTruckComponent, {app: self, truckId: id}), this.appContainer);
    }
});

module.exports = new Router();
