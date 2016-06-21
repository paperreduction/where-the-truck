var $ = require('jquery');
require('../scrolllock');

var React = require('react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');


var FooterComponent = React.createClass({
    render: function(){
        return (
            <section className="truck-ListOpen-FooterContainer">
                <div className="truck-ListOpen-FooterSearchContainer">
                    <form className="truck-ListOpen-FooterSearch">
                        <span><input className="truck-ListOpen-FooterSearchInput"/></span>
                    </form>
                </div>
                <button type="button" className="truck-ListOpen-FooterFilterContainer"/>
                <button type="button" className="truck-ListOpen-FooterNavMenuContainer">
                    <div className="truck-ListOpen-FooterNavMenuText">NAV</div>
                </button>
            </section>
        );
    }
});

var NavPopUpComponent = React.createClass({
   render: function(){
       return (
         <div className="truck-ListOpen-FooterNavMenuPopUpContainer" id="NavMenuPopUp">

            <div className="nav-WittySayingContainer">
                <div className="number-TrucksListedText">
                    You're good<br/>
                    at making decisions!
                </div>
            </div>
            <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                <a href="#trucks/open/" className="truck-ListOpen-FooterFilterPopUp-FilterContainerInner">
                    <div className="truck-ListOpen-FooterNavMenuPopUp-NavText">
                        What&#8217;s Nearby
                    </div>
                </a>
            </div>
            <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                <a href="#trucks/upcoming/" className="truck-ListOpen-FooterNavMenuPopUp-NavContainerInner">
                    <div className="truck-ListOpen-FooterNavMenuPopUp-NavText">
                        What&#8217;s coming up
                    </div>
                </a>
            </div>
            <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                <a href="about.html" className="truck-ListOpen-FooterNavMenuPopUp-NavContainerInner">
                    <div className="truck-ListOpen-FooterNavMenuPopUp-NavText">
                        About where the truck
                    </div>
                </a>
            </div>
            <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                <a href="truckloginregister.html" className="truck-ListOpen-FooterNavMenuPopUp-NavContainerInner">
                    <div className="truck-ListOpen-FooterNavMenuPopUp-NavText">
                        Truck Login / Register
                    </div>
                </a>
            </div>
        </div>  
       );
   } 
});

var IndexComponent = React.createClass({
    componentDidMount: function(){
        /**
         * Event listener for the menu "nav" button
         */
        $(".truck-ListOpen-FooterNavMenuContainer").click(function(){
            var $self = $(this);

            // Swap the menu button text
            if($self.hasClass('js-nav-open')){
              $self.removeClass('js-nav-open');
              $(".truck-ListOpen-FooterNavMenuText").text("NAV");
              //$.scrollLock( false );
            }else{
              $self.addClass('js-nav-open');
              $(".truck-ListOpen-FooterNavMenuText").text("CLOSE");
              //$.scrollLock( true );
            }

            // Show/Hide the Navigation Modal
            $(".truck-ListOpen-FooterNavMenuPopUpContainer").toggleClass("truck-ListOpen-FooterNavMenuPopUpContainer-Show");
            $(".truck-ListOpen-FooterSearchContainer").toggleClass("opacity-Zero-NotClickable");
            $(".truck-ListOpen-FooterFilterContainer").toggleClass("opacity-Zero-NotClickable");
            // $("body").toggleClass("overflow-Hidden");

        });

    /**
     * Event listener for menu "filter" button
     */

    $(".truck-ListOpen-FooterFilterContainer").click(function(){
        var $self = $(this);

        // Swap the filter button text
        if($self.hasClass('js-nav-open')){
          $self.removeClass('js-nav-open');
          $(".truck-ListOpen-FooterFilterText").text("FILTERS");
          $.scrollLock( false );
        }else{
          $self.addClass('js-nav-open');
          $(".truck-ListOpen-FooterFilterText").text("CLOSE");
          $.scrollLock( true );
        }

        // Show/Hide the Filter Modal
        $(".truck-ListOpen-FooterFilterPopUpContainer").toggleClass("truck-ListOpen-FooterFilterPopUpContainer-Show");
        $(".truck-ListOpen-FooterSearchContainer").toggleClass("opacity-Zero-NotClickable");
        $(".truck-ListOpen-FooterNavMenuContainer").toggleClass("opacity-Zero-NotClickable");
        // $("body").toggleClass("overflow-Hidden");

      });
    },
    render: function(){
        return (
            <div>
                <FooterComponent />

                <NavPopUpComponent />

                <section className="body-mobilewrapper container-LandingPageBody">
                    <div className="logo_WTT"></div>

                    <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                        <a href="#trucks/open/" className="truck-ListOpen-FooterFilterPopUp-FilterContainerInner">
                            <div className="button-WhatsComingUpText">
                                What&#8217;s nearby
                            </div>
                        </a>
                    </div>

                    <div className="truck-ListOpen-FooterNavMenuPopUp-NavContainerOuter">
                        <a href="#trucks/upcoming/" className="truck-ListOpen-FooterFilterPopUp-FilterContainerInner">
                            <div className="button-WhatsComingUpText">
                                What&#8217;s coming up
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        );
    }
});

module.exports = {
    'IndexComponent': IndexComponent
};