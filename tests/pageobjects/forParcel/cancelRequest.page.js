const Gestures = require('../../../utils/gestures');
const Helpers = require('../../../utils/helpers');

class CancelRequest {

    get sendRequest()           {return $('id:com.pathao.user:id/button')}

    async cancelRequest(){

        console.log('Step 5: Canceling the Request');

        await driver.pause(2000);

        await Gestures.bottomSwipeUp();

        await driver.pause(2000);

        await Gestures.tapByCoordinates(764,1585);

        await driver.pause(1000);

        await Gestures.tapByCoordinates(300,2060);

        // Validate Cancellation
        await Helpers.wait(this.sendRequest, "Again Send Request Button");

    }

}
module.exports = new CancelRequest();