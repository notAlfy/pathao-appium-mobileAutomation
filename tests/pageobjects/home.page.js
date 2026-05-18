class HomePage {

    //Elements
    get bikeEntryButton()   {return $('id:com.pathao.user:id/ivFirstLogo')}
    get carEntryButton()    {return $('id:com.pathao.user:id/ivSecondLogo')}
    get cngEntryButton()    {return $('id:com.pathao.user:id/ivFifthLogo')}
    get foodEntryButton()   {return $('id:com.pathao.user:id/ivThirdLogo')}
    get parcelEntryButton() {return $('id:com.pathao.user:id/ivForthLogo')}
    get pathaoPayContainer(){return $('id:com.pathao.user:id/moreIcIv')}

    //next page validation
    get toLocationBox()     {return $('id:com.pathao.user:id/destinationAddressWidget')}
    get foodSearchBox()     {return $('id:com.pathao.user:id/layout_food_header')}
    get parcelInstant()     {return $('id:com.pathao.user:id/containerInstantDelivery')}
    get pathaoPayPinBox()   {return $('id:com.pathao.user:id/payPinView')}

    //Actions

    async selectService(service) {

        console.log(`Step 1: Selecting service: ${service}`);

        const map = {
            bike:       this.bikeEntryButton,
            car:        this.carEntryButton,
            cng:        this.cngEntryButton,
            // food:       this.foodEntryButton,
            parcel:     this.parcelEntryButton,
            pathaoPay:  this.pathaoPayContainer
        };

        const selectedService = map[service];

        if (!selectedService) {
            throw new Error(`Invalid service: ${service}`);
        }

        await selectedService.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: `${service} service not displayed`
        });

        await selectedService.click();

        await this.validateNavigation(service);       

    }

    async validateNavigation(service) {
        
        const validationMap = {
            bike:       this.toLocationBox,
            car:        this.toLocationBox,
            cng:        this.toLocationBox,
            // food:       this.foodSearchBox,
            parcel:     this.parcelInstant,
            pathaoPay:  this.pathaoPayPinBox
        };

        const targetElement = validationMap[service];

        await targetElement.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: `Failed to navigate to ${service} next page.`
        });
        
        console.log(`Breaking News: Navigation to ${service} validated successfully`);

    }

}

module.exports = new HomePage();