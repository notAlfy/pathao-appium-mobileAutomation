const HomePage =            require('../pageobjects/home.page');
const DeliveryType =        require('../pageobjects/forParcel/deliveryType.page');
const SelectDestination =   require('../pageobjects/forParcel/setDestination.page');
const ReceiverDetails =     require('../pageobjects/forParcel/receiversDetails.page');
const CancelRequest =       require('../pageobjects/forParcel/cancelRequest.page');

const parcelData =          require('../testData/parcelData');

const dest = process.env.PARCEL_DEST || 'Mirpur 10';

describe('Parcel Delivery Flow', () => {

    it('should create and cancel a parcel delivery request', async () => {

        await driver.activateApp('com.pathao.user');
        
        console.log(`Destination is set to: ${dest}`);
        
        await HomePage.selectService('parcel');

        await DeliveryType.selectDeliveryType();

        await SelectDestination.setDestination(dest);

        await ReceiverDetails.setReceiverDetails(parcelData.validReceiver1);

        await CancelRequest.cancelRequest();

    });
    
});