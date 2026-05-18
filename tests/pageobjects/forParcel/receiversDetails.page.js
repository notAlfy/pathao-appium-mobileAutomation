const Gestures = require('../../../utils/gestures');
const Helpers = require('../../../utils/helpers');

class ReceiversDetailsPage {

    // Elements
    get chooseSend()            {return $('android=new UiSelector().description("Sending Item")')}
    get chooseReceive()         {return $('id:Receiving Item')}
    get receiverNumber()        {return $('android=new UiSelector().text("Enter number")')}
    get name()                  {return $('android=new UiSelector().text("Enter Name")')}
    get deliveryInstruction()   {return $('android=new UiSelector().resourceId("com.pathao.user:id/clInputContainer").instance(2)')}
    get senderHomeNo()          {return $('android=new UiSelector().text("House / Building / Flat number")')}
    get receiverHomeNo()        {return $('android=new UiSelector().text("House / Building / Flat number *")')}
    get payingPerson()          {return $('android=new UiSelector().className("android.widget.LinearLayout").index(1)')}
    get itemDetails()           {return $('id:com.pathao.user:id/tvInputItemDetails')}
    get revierButton()          {return $('id:com.pathao.user:id/button')}
    get reviewPackage()         {return $('id:com.pathao.user:id/layoutReviewPackageGuideline')}

    get activeField()           { return $('//*[@focused="true"]'); }

    // Sub Page Elements
    get itemSize()              {return $('android=new UiSelector().text("Medium")')}
    get itemWeight()            {return $('android=new UiSelector().text("3-5kg")')}
    get itemType()              {return $('id:com.pathao.user:id/tvItemType')}
    get itemGifts()             {return $('android=new UiSelector().text("Gifts")')}
    get itemValue()             {return $('id:com.pathao.user:id/etItemValue')}
    get continueButton()        {return $('id:com.pathao.user:id/button')}
    get reviewPayment()         {return $('id:com.pathao.user:id/button')}

    //next page validation
    get sendRequest()           {return $('id:com.pathao.user:id/textView')}   
    
    // Actions
    async setReceiverDetails(receiverData) {
        await this.fillMainForm(receiverData);
        await this.fillItemDetails(receiverData);
        await this.submitRequest();
    }

    async fillMainForm(receiverData) {

        console.log(`Step 4: Setting Receiver Info for ${receiverData.name}`);

        await Helpers.findAndClick(this.chooseSend, 'Sending Item Option');

        await Helpers.findAndClick(this.receiverNumber, 'Number Entry');

        const formSequence = [
            receiverData.number,
            receiverData.name,
            receiverData.instructions,
            receiverData.senderHouse,
            receiverData.receiverHouse
        ];

        for (let i = 0; i < formSequence.length; i++) {
            await this.activeField.setValue(formSequence[i]);
            
            if (i < formSequence.length - 1) {
                await driver.execute('mobile: performEditorAction', { action: 'next' });
            }

        }

        await Gestures.halfSwipeUp();
       
        await Helpers.waitAndClick(this.payingPerson, 'Pay by Receiver Name');

        console.log(`[PASS] Receiver details for ${receiverData.name} completed successfully`);

    }

    async fillItemDetails(receiverData) {

        await Helpers.waitAndClick(this.itemDetails, 'Sending Item Details Box');

        await Helpers.wait(this.continueButton,'Item Details page');

        await Helpers.findAndClick(this.itemSize,'Item Size');

        await Helpers.findAndClick(this.itemWeight,'Item Weight');

        await Helpers.findAndClick(this.itemType,'Item Type');

        await Helpers.findAndClick(this.itemGifts,'Gift Item');

        await Gestures.halfSwipeUp();

        await Helpers.findAndClick(this.itemValue,'Item Value');
        await this.itemValue.setValue(receiverData.itemValue);

        await Helpers.waitAndClick(this.continueButton,'Continue Button');

        // Validate previous screen
        await Helpers.wait(this.reviewPayment,'Delivery Details page');

        console.log('Receiver details & Item Details completed successfully');

    }

    async submitRequest() {
        
        //Validate Review Step
        await Helpers.waitAndClick(this.reviewPayment,'Review Payment');

        //Validate Send Request
        await Helpers.waitAndClick(this.sendRequest,'Send Request');

    }
    
}
module.exports = new ReceiversDetailsPage();