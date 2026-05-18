const Helpers = require('../../../utils/helpers');

class RideDetailsPage {

    // Elements
    get rideFirstOption()   {return $('android=new UiSelector().resourceId("com.pathao.user:id/layoutRideService").index(0)')}
    get chooseButton()      {return $('id:com.pathao.user:id/btnSendRequest')}
    get understandButton()  {return $('id:com.pathao.user:id/button')}

    //next page validation   
    get confirmButton()     {return $('id:com.pathao.user:id/rlConfirm')}

    // Actions
    async selectFirstRideOption() {

        console.log('Step 3: Setting up ride details');

        await Helpers.waitAndClick(this.rideFirstOption , "Ride option");

        // Handle popup
        try {
            await Helpers.waitAndClick(this.understandButton , "Understand Button");
        } catch {
            console.log('Popup not shown');
        }

        await Helpers.waitAndClick(this.chooseButton , "Choose Button");

        // Validate next screen
        await Helpers.wait(this.confirmButton , "Confirm screen");

    }

}

module.exports = new RideDetailsPage();