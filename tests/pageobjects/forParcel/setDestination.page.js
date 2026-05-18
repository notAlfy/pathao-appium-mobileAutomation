const Helpers = require('../../../utils/helpers');

class SetDestinationPage {

    // Elements
    get destinationBox()        {return $('id:com.pathao.user:id/etDestination')}
    firstResult(destination)    {return $(`android=new UiSelector().className("android.widget.TextView").textContains("${destination}")`)}
    get saveButton()            {return $('id:com.pathao.user:id/button')}

    // Next Page Validation
    get deliveryDetails()       {return $('android=new UiSelector().text("Delivery Details")')}

    // Actions
    async setDestination(destination){

        console.log('Step 3: Setting Destination');

        await Helpers.waitAndClick(this.destinationBox , "Destination Box");

        await this.destinationBox.clearValue();

        await this.destinationBox.setValue(destination);

        const result = await this.firstResult(destination);

        await Helpers.waitAndClick(result , "Search Result");
        
        await Helpers.waitAndClick(this.saveButton, "Save Address page");

        // Validate next screen
        await Helpers.waitAndClick(this.deliveryDetails, "Delivery Details page");

    }

}
module.exports = new SetDestinationPage();