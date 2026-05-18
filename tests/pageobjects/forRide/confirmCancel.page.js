const Gestures = require('../../../utils/gestures');
const Helpers = require('../../../utils/helpers');

class ConfirmCancel{

    //Elements
    get clickConfirm()      {return $('id:com.pathao.user:id/textView')}
    get cancelOption()      {return $('//*[contains(@resource-id, "button")]')}
    get cancelYesButton()   {return $('android=new UiSelector().text("Yes, cancel")')}
    get rideOptions()       {return $('id:com.pathao.user:id/rvRideOptions')}

    // Next Page Validation
    get rideDetails()       {return $('id:com.pathao.user:id/tvTitle')}

    //Actions
    async confirmAndCancel() {

        console.log('Step 5: Confirming & Canceling');

        await this.clickConfirm.click();

        await driver.pause(2000);

        await Gestures.bottomSwipeUp();
        console.log('Swiped Up');

        await driver.action('pointer', {
            parameters: { pointerType: 'touch' }
        })
        .move({ x: 920, y: 2067, duration: 500 })
        .down()
        .pause(100)
        .up()
        .perform();

        await Helpers.waitAndClick(this.cancelYesButton , "Cancel Button");
        
        await expect(this.rideOptions).toBeDisplayed();

        // Validate next screen
        await Helpers.wait(this.rideDetails , "Ride Details Page");
        
    }

}
module.exports = new ConfirmCancel();