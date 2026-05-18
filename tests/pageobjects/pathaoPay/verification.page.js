const Helpers = require('../../../utils/helpers');

class Verification {

    // Elements
    get pinInput()          {return $('id:com.pathao.user:id/pinEt')}
    get loginButton()       {return $('id:com.pathao.user:id/submitBtnPay')}
    // Validate Next Page
    get dashboard()         {return $('id:com.pathao.user:id/parentLayout')}

    // Actions
    async verifyPin() {

        console.log('Step 2: Verify User')

        const pin = process.env.PATHAO_PAY_PIN;

        if (!pin) {
            throw new Error('PATHAO_PAY_PIN is not set in .env file');
        }

        await Helpers.waitAndClick(this.pinInput, 'PIN Input Field');
        // await driver.keys(pin);
        await this.pinInput.setValue(pin);

        await Helpers.waitAndClick(this.loginButton, 'Login Button');

        // Validate Next Page
        await Helpers.wait(this.dashboard,'Pathao Pay Screen');

        console.log('Breaking News: User verified successfully');

    }

}

module.exports = new Verification();