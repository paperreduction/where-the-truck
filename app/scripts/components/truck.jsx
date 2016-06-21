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

var ListingHeader = React.createClass({
    render: function () {
        return (
            <a href="javascript:javascript:history.go(-1)" className="button-RoundBackContainer">
                <div className="button-RoundBackContainerText">
                    &lt;
                </div>
            </a>
        );
    }
});

var ListingFooter = React.createClass({
    render: function () {
        return (
            <section className="truck-ListOpen-FooterContainer">
                <div className="truck-ListOpen-FooterSearchContainer">
                    <form className="truck-ListOpen-FooterSearch">
                        <span><input type="text"  className="truck-ListOpen-FooterSearchInput" placeholder="SEARCH BY TRUCK NAME" /></span>
                    </form>
                </div>
                <button type="button" className="truck-ListOpen-FooterFilterContainer">
                    <div className="truck-ListOpen-FooterFilterText">
                        FILTERS
                    </div>
                </button>
                <button type="button" className="truck-ListOpen-FooterNavMenuContainer">
                    <div className="truck-ListOpen-FooterNavMenuText">
                        NAV
                    </div>
                </button>
            </section>
        );
    }
});

var Nav = React.createClass({
    render: function(){
        return (
            <div className="truck-ListOpen-FooterNavMenuPopUpContainer" id="NavMenuPopUp">
                <div className="nav-WittySayingContainer">
                    <div className="number-TrucksListedText">
                        I always order<br />
                        extra tater tots!
                    </div>
                </div>
                <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                    <a href="WTT.html" className="truck-ListOpen-FooterFilterPopUp-FilterContainerInner" >
                        <div className="button-WhatsComingUpText">
                            Home
                        </div>
                    </a>
                </div>
                <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                    <a href="list_TruckUpcoming.html" className="truck-ListOpen-FooterNavMenuPopUp-NavContainerInner">
                        <div className="truck-ListOpen-FooterNavMenuPopUp-NavText" >
                            What&#8217;s coming up
                        </div>
                    </a>
                </div>
                <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                    <a href="about.html" className="truck-ListOpen-FooterNavMenuPopUp-NavContainerInner">
                        <div className="truck-ListOpen-FooterNavMenuPopUp-NavText" >
                            About where the truck
                        </div>
                    </a>
                </div>
                <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                    <a href="truckloginregister.html" className="truck-ListOpen-FooterNavMenuPopUp-NavContainerInner">
                        <div className="truck-ListOpen-FooterNavMenuPopUp-NavText" >
                            Truck Login / Register
                        </div>
                    </a>
                </div>
            </div>
        );
    }
});

var Filter = React.createClass({
    render: function(){
        return (
          <div className="truck-ListOpen-FooterFilterPopUpContainer" id="FilterMenuPopUp">
            <div className="nav-WittySayingContainer">
                <div className="number-TrucksListedText">
                    I always order<br />
                    extra tater tots!
                </div>
            </div>
            <div className="truck-ListOpen-FooterFilterPopUp-FilterContainerOuter">
                <div className="truck-ListOpen-FooterFilterPopUp-FilterContainerInner">
                    <div className="truck-ListOpen-FooterFilterPopUp-FilterText">
                    SORT BY CLOSEST FIRST
                    </div>
                </div>
            </div>
            <div className="truck-ListOpen-FooterFilterPopUp-FilterContainerOuter">
                <div className="truck-ListOpen-FooterFilterPopUp-FilterContainerInner">
                    <div className="truck-ListOpen-FooterFilterPopUp-FilterText">
                    SORT BY FARTHEST FIRST
                    </div>
                </div>
            </div>
            <div className="truck-ListOpen-FooterFilterPopUp-FilterContainerOuter">
                <div className="truck-ListOpen-FooterFilterPopUp-FilterContainerInner">
                    <div className="truck-ListOpen-FooterFilterPopUp-FilterText">
                    SORT BY CLOSING SOONEST
                    </div>
                </div>
            </div>
            <div className="truck-ListOpen-FooterFilterPopUp-FilterContainerOuter">
                <div className="truck-ListOpen-FooterFilterPopUp-FilterContainerInner">
                    <div className="truck-ListOpen-FooterFilterPopUp-FilterText">
                    SORT BY CLOSEST LAST
                    </div>
                </div>
            </div>
        </div>
        );
    }
});

var TruckComponent = React.createClass({
    render: function(){
        var truck = this.props.truck;

        return (
            <section className="truck-ListEntry">
                <div className="truck-ListEntry-UpperHalf">
                    <a href="profile_TruckCustomer.html" className="truck-ListEntry-NameContainer">
                        <h1 className="truck-ListEntry-NameText">
                            {truck.name}
                        </h1>
                        <h2 className="truck-ListEntry-DescriptionText">
                            {truck.ds}
                        </h2>
                    </a>
                </div>
                <div className="truck-ListEntry-LowerHalf">
                    <div className="truck-ListEntry-ButtonsContainer">
                        <a href={truck.menuURL} target="_blank" className="truck-ListEntry-ButtonsMenuContainer">
                            <h3 className="truck-ListEntry-ButtonsMenuText">
                            MENU
                            </h3>
                        </a>
                        <a href="profile_TruckCustomer.html" className="truck-ListEntry-ButtonsProfileContainer" data-transition="slide">
                            <h3 className="truck-ListEntry-ButtonProfileText">
                            PROFILE
                            </h3>
                        </a>
                        <a href={truck.directionsUrl} target="_blank" className="truck-ListEntry-ButtonsDirectionsContainer">
                            <h3 className="truck-ListEntry-ButtonDirectionsText">
                            DIRECTIONS
                            </h3>
                        </a>
                    </div>
                    <div className="truck-ListEntry-InfoContainer">
                        <div className="truck-ListEntry-InfoMilesContainer">
                        <h4 className="truck-ListEntry-InfoMilesDistanceText">5.75<span className="truck-ListEntry-InfoMilesUnitText">mi</span></h4>
                        </div>
                        <div className="truck-ListEntry-InfoTimeContainer">
                        <h4 className="truck-ListEntry-InfoTimeText"><span className="truck-ListEntry-InfoTimeTilText">til</span>12:45<span className="truck-ListEntry-InfoTimeAMPMText">AM</span></h4>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

var TruckListComponent = React.createClass({
    getInitialState: function(){
        return {
            'results': [{
                'id': 1,
                'name': 'NICK&#8217;S ROADKILL DELIGHT',
                'ds': 'A Bit Of Asphalt In Every Bite',
                'menuUrl': 'http://thoroughfarefoodtruck.com/menu/',
                'directionsUrl': 'https://www.google.com/maps/dir/Coffee+Underground,+East+Coffee+Street,+Greenville,+SC/Methodical+Coffee,+101+N+Main+St,+Greenville,+SC+29601/@34.8516118,-82.4011364,17z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x885831d1edde8ccb:0x6161602b529d8b!2m2!1d-82.3982977!2d34.851629!1m5!1m1!1s0x885831d04b758631:0x5c7bb3ec1a1275f5!2m2!1d-82.3995977!2d34.8519691!3e2'
            }]
        }
    },
    getResultCount: function(){
        var trucks = this.state.results,
            plural = true,
            num;

        switch(trucks.length){
            case 1:
                num = 'One';
                plural = false;
                break;
            
            case 2:
                num = 'Two';
                break;

            case 3:
                num = 'Three';
                break;

            case 4:
                num = 'Four';
                break;

            case 5:
                num = 'Five';
                break;

            case 6:
                num = 'Six';
                break;

            case 7:
                num = 'Seven';
                break;

            case 8:
                num = 'Eight';
                break;

            case 9:
                num = 'Nine';
                break;

            case 10:
                num = 'Ten';
                break;

            default:
                num = trucks.length;
        }
        return num + ' delicious result' + (plural ? 's' : '');
    },
    render: function(){
        var trucks = this.state.results;

        var truckListing = trucks.map(function(truck){
            return (
                <TruckComponent key={truck.id} truck={truck} />
            );
        });

        if(truckListing.length == 0){
            truckListing = (
                <section className="truck-ListEntryOpen-NotFoundContainer">
                        <div className="truck-ListEntryOpen-NotFoundText">
                        Didn&#8217;t find what you were looking for? <br/> Check out &mdash;
                        </div>

                    <div className="button-WhatsComingUpOuter button-WhatsComingUpOuter-standalone">
                        <a href="list_TruckUpcoming.html" className="button-WhatsComingUpInner">
                            <div className="button-WhatsComingUpText">
                                WHAT&#8217;S COMING UP
                            </div>
                        </a>
                    </div>

                </section>
            );
        }

        return (
            <div>
                <ListingHeader />
                <ListingFooter />
                <Nav />
                <Filter />

                <div className="body-mobilewrapper">
                    <div className="number-TrucksListedContainer">
                        <div className="number-TrucksListedText">
                            {this.getResultCount()} <br />
                            are you hungry yet?
                        </div>
                    </div>

                    {truckListing}
                </div>
            </div>
        );
    }
});

module.exports = {
    'AddChangeTruckComponent': AddChangeTruckComponent,
    'TruckListComponent': TruckListComponent
};