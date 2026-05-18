const Helpers = require('../../../utils/helpers');

class SetPickUpPage{

    //Elements
    get clickConfirm()          {return $('id:com.pathao.user:id/textView')}
    get confirmButton()         {return $('id:com.pathao.user:id/rlConfirm')}
    get currentLocationIcon()   {return $('id:com.pathao.user:id/fabCurrentLocation')}
    get pickUpAddressCard()     {return $('id:com.pathao.user:id/rlAddressCard')}
    get savedAddressTitle()     {return $('id:com.pathao.user:id/tvSavedAddressTitle')}
    get savedAddress()          {return $('id:com.pathao.user:id/rlAddressInfo')}

    //Actions
    async setPickUp() {
 
        console.log('Step 4: Setting Pick Up location');

        await Helpers.waitAndClick(this.currentLocationIcon , "Current location icon");

        await Helpers.waitAndClick(this.pickUpAddressCard , "Pick Up address card");

        await expect(this.savedAddressTitle).toBeDisplayed();

        await Helpers.waitAndClick(this.savedAddress , "Saved Address");

        // Validate previous screen
        await expect(this.confirmButton).toBeDisplayed();

    }

}
module.exports = new SetPickUpPage();