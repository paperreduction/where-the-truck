var React = require('react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var Truck = require('../models/truck').Truck;


var LoginComponent = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function(){
      return {'username': '', 'password': '', 'usernameUp': '', 'passwordUp': '', 'truckName': '', 'phone': ''};
    },
    handleSignup: function(event){
        event.preventDefault();
        var self = this;
        var Parse = this.props.app.Parse;

        // Setup new user and sign up
        var user = new Parse.User();
        user.set({
            'username': this.state.usernameUp,
            'password': this.state.passwordUp,
            'email': this.state.email,
            'phone': this.state.phone
        });

        user.signUp(null, {
            'success': function(user){
                // Save truck
                var truck = new Truck();
                var truckACL = new Parse.ACL(Parse.User.current());
                truckACL.setPublicReadAccess(true);
                truck.setACL(truckACL);
                truck.set("name", self.state.truckName);
                truck.set("user", user);

                truck.save(null, {
                    success: function(truck) {
                        self.props.app.navigate('admin/trucks/' + truck.id + '/', {trigger: true});
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },
    handleSignIn: function(event){
        event.preventDefault();

        var self = this;
        var Parse = this.props.app.Parse;

        Parse.User
            .logIn(this.state.username, this.state.password, {
                success: function(user) {
                    var query = new Parse.Query(Truck);
                    query.equalTo("user", user);
                    query.first({
                        success: function (truck) {
                            self.props.app.navigate('admin/trucks/' + truck.id + '/', {trigger: true});
                        },
                        error: function(truck, error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                    });
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.
                    alert('There seems to be a problem:' + error);
                }
            });
    },
    render: function(){
        return (
            <section className="body-mobilewrapper container-LandingPageBody">

                <div className="field-Text">
                    <div id="mc_embed_signup">
                        <div className="image-TruckPhotoText">Login</div>

                        <form target="_blank" novalidate>
                            <input name="username" type="email" className="email form-control" placeholder="username" valueLink={this.linkState('username')}/>
                            <input name="password" type="password" className="password form-control" placeholder="Password Please" valueLink={this.linkState('password')}/>

                            <div className="button-NavContainerOuter">
                                <div className="button-NavContainerInner">
                                    <input type="submit" className="" value="Login" />
                                </div>
                            </div>
                        </form>

                        <div className="image-TruckPhotoText">
                        or Register
                        </div>
            
            
                        <form  target="_blank" novalidate>
                            <input type="email" name="username" className="username form-control" placeholder="username" required="required" />

                            <input type="password" name="password" className="username form-control" placeholder="password" required="required" />

                            <input type="password" name="password2" className="username form-control" placeholder="reenter password" required="required" />

                            <input type="text" name="truck" className="username form-control" placeholder="food truck name" required="required" />

                            <input type="text" name="phone" className="username form-control" placeholder="phone number" required="required" />

                            <input type="email" name="email" className="username form-control" placeholder="email address" required="required" />

                            <div className="button-NavContainerOuter">
                                <input type="submit" value="register" className="button-NavContainerInner button-NavText"/>
                            </div>
                        </form>
            
                    </div>
                </div>
            
            </section>
        );
            
        {/*
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>Start Your Engine!</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <form id="login" onSubmit={this.handleSignIn}>
                        <Input name="username" type="text" placeholder="username" valueLink={this.linkState('username')}/>
                        <Input name="password" type="password" placeholder="Password Please" valueLink={this.linkState('password')}/>

                        <ButtonInput className="btn btn-primary" type="submit" value="Login" />
                    </form>
                </div>

                <div className="col-sm-12">
                    <form id="signup" onSubmit={this.handleSignup}>
                        <Input name="username" type="text" placeholder="username" valueLink={this.linkState('usernameUp')}/>
                        <Input name="password" type="password" placeholder="password" valueLink={this.linkState('passwordUp')}/>
                        <Input name="password2" type="password" placeholder="reenter password" valueLink={this.linkState('password2Up')}/>
                        <Input name="truck" type="text" placeholder="food truck name" valueLink={this.linkState('truckName')}/>
                        <Input name="phone" type="text" placeholder="phone number" valueLink={this.linkState('phone')}/>
                        <Input name="email" type="email" placeholder="email" valueLink={this.linkState('email')}/>

                        <ButtonInput className="btn btn-info" type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </div>
        */}
    }
});

module.exports = {
    'LoginComponent': LoginComponent
};