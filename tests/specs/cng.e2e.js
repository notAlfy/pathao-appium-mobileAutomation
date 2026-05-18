const HomePage =            require('../pageobjects/home.page');
const SetDestinationPage =  require('../pageobjects/forRide/setDestination.page');
const RideDetailsPage =     require('../pageobjects/forRide/rideDetails.page');
const SetPickUpPage =       require('../pageobjects/forRide/setPickUp.page')
const ConfirmCancelPage =   require('../pageobjects/forRide/confirmCancel.page');

const dest = process.env.CNG_DEST || 'Mirpur 10';

describe('Cng Booking Flow', () => {

    it('should create and cancel a cng ride request', async () => {

        await driver.activateApp('com.pathao.user');

        console.log(`Destination is set to: ${dest}`);

        await HomePage.selectService('cng');

        await SetDestinationPage.setDestination(dest);

        await RideDetailsPage.selectFirstRideOption();

        await SetPickUpPage.setPickUp();

        await ConfirmCancelPage.confirmAndCancel();
        
    });
    
});