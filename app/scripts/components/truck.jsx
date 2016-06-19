var React = require('react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Parse = require('parse');

var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var Truck = require('../models/truck').Truck;


var AddChangeTruckComponent = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function(){
        return {'name': '', 'description': '', 'url': '', 'menu': '', 'lat': 0, 'lng': 0, 'confirm': ''};
    },
    componentDidMount: function() {
        var self = this;

        // Bail if no truck id passed in
        if(!this.props.truckId){
            return;
        }

        // Get the truck
        var query = new Parse.Query(Truck);
        query.get(this.props.truckId, {
            success: function(truck) {
                self.truck = truck;
                var user = Parse.User.current();

                self.setState({
                    name: truck.get('name'),
                    description: truck.get('description'),
                    url: user.get('siteURL'),
                    menu: user.get('menuURL')
                });
            },
            error: function(truck, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },
    handleSubmit: function(event){
        event.preventDefault();
        var self = this;

        this.truck.set({
            name: self.state.name,
            description: self.state.description
        });
        this.truck.save().then(function(){
           self.setState({'confirm': 'Truck Updated!'});
        });

        var user = Parse.User.current();
        user.set({
            siteURL: self.state.url,
            menuURL: self.state.menu
        });
        user.save();
    },
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Your Truck</h1>
                        <h3>{this.state.confirm}</h3>
                    </div>
                </div>

                <div className="row">

                    <div className="col-sm-12">
                        <form onSubmit={this.handleSubmit}>
                            <Input name="truck" type="text" label="Click To Edit Foodtruck Name" placeholder="food truck name" valueLink={this.linkState('name')}/>
                            <Input name="description" type="text" label="Click To Edit Foodtruck Description" placeholder="food truck description" valueLink={this.linkState('description')}/>

                            <hr/>

                            <Input name="url" type="text" label="Click To Edit Website Link" placeholder="www.example.com" valueLink={this.linkState('url')}/>
                            <Input name="menu" type="text" label="Click To Edit Menu Link" placeholder="www.example.com/menu" valueLink={this.linkState('menu')}/>

                            <hr/>

                            <Input name="lat" type="text" label="Test Lat" placeholder="34.8526126" valueLink={this.linkState('lat')}/>
                            <Input name="lng" type="text" label="Test Lng" placeholder="-82.4291157" valueLink={this.linkState('lng')}/>

                            34.8526126, -82.4291157


                            <ButtonInput className="btn btn-info" type="submit" value="Save" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = {
    'AddChangeTruckComponent': AddChangeTruckComponent
};