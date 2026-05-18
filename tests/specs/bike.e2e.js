const HomePage =            require('../pageobjects/home.page');
const SetDestinationPage =  require('../pageobjects/forRide/setDestination.page');
const RideDetailsPage =     require('../pageobjects/forRide/rideDetails.page');
const SetPickUpPage =       require('../pageobjects/forRide/setPickUp.page')
const ConfirmCancelPage =   require('../pageobjects/forRide/confirmCancel.page');

const dest = process.env.BIKE_DEST || 'Mirpur 10';

describe('Bike Booking Flow', () => {

    it('should create and cancel a bike ride request', async () => {

        await driver.activateApp('com.pathao.user');

        console.log(`Destination is set to: ${dest}`);

        await HomePage.selectService('bike');

        await SetDestinationPage.setDestination(dest);

        await RideDetailsPage.selectFirstRideOption();

        await SetPickUpPage.setPickUp();

        await ConfirmCancelPage.confirmAndCancel();
        
    });
    
});