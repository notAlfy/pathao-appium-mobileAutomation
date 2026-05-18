const Helpers = require('../../../utils/helpers');

class DeliveryType{

    // Elements
    get parcelInstant()         {return $('id:com.pathao.user:id/containerInstantDelivery')}
    get parcelRegular()         {return $('id:com.pathao.user:id/containerRegularDelivery')}
    get sendItem()              {return $('android=new UiSelector().text("Send Item")')}
    get continueButton()        {return $('id:com.pathao.user:id/button')}

    // Next Page Validation
    get destinationAddress()    {return $('id:com.pathao.user:id/rlDestinationAddress')}

    // Actions
    async selectDeliveryType() {

        console.log('Step 2: Selecting Delivery Type');

        await this.parcelInstant.click();
       
        console.log('Checking for "Send Item" popup');

        await Helpers.waitAndClick(this.sendItem , "Popup");

        await Helpers.waitAndClick(this.continueButton , "Continue Button");
        
        // Validate next screen
        await Helpers.wait(this.destinationAddress , "Destination Page");

    }

}

module.exports = new DeliveryType();