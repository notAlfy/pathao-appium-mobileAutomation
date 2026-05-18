const Helpers = require('../../../utils/helpers');

class SetDestinationPage {

    // Elements
    get toLocationBox()     {return $('id:com.pathao.user:id/destinationAddressWidget')}
    get toLocationInput()   {return $('id:com.pathao.user:id/etAddress')}
    firstResult(destination){return $(`android=new UiSelector().className("android.widget.TextView").textContains("${destination}")`)}

    //next page validation
    get rideFirstOption()   {return $('android=new UiSelector().resourceId("com.pathao.user:id/layoutRideService").index(0)')}
    
    // Actions
    async setDestination(destination) {

        console.log('Step 2: Setting Up destination');

        await this.toLocationBox.click();

        await Helpers.waitAndClick(this.toLocationInput , "Destination Input");

        await this.toLocationInput.clearValue();
        
        await this.toLocationInput.setValue(destination);

        const result = await this.firstResult(destination);

        await Helpers.waitAndClick(result , "Search result");
        
        // Validate next screen
        await Helpers.wait(this.rideFirstOption , "Vehicle list");
        
    }
}

module.exports = new SetDestinationPage();