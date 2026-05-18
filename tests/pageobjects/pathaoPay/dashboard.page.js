const Gestures = require('../../../utils/gestures');
const Helpers = require('../../../utils/helpers');

class Dashboard {

    // Elements
    /// Dashboard page
    get dashboard()         {return $('id:com.pathao.user:id/parentLayout')}
    get mrtTopUp()          {return $('android=new UiSelector().text("MRT Top Up")')}
    /// Login Page
    get loginForm()         {return $('android=new UiSelector().resourceId("loginForm")')}
    get email()             {return $('android=new UiSelector().resourceId("email")')}
    get password()          {return $('android=new UiSelector().resourceId("password")')}
    get submit()            {return $('android=new UiSelector().resourceId("submit")')}
    ///MRT Card Page
    get mrtCardRecharge()   {return $('android=new UiSelector().descriptionContains("রিচার্জ")')}
    ///MRT Recharge Page
    get mrtRechargePage()   {return $('android=new UiSelector().textContains("রিচার্জ")')}
    get amount100()         {return $('android=new UiSelector().textContains("৳ ১০০")')}
    get submitButton()      {return $('android.widget.Button')}
    ///MRT Top Up Page
    get mobilebanking()     {return $('android=new UiSelector().text("Mobile Banking")')}
    get pathaoPay()         {return $('android=new UiSelector().description("Pathaopay")')}
    get payButton()         {return $('android.widget.Button')}

    // Validate Next Page
    get goBackDashboard()   {return $('android=new UiSelector().text("ড্যাশবোর্ডে ফিরে যান")')}

    // Actions
    async chooseOption(){

        console.log('Step 3: Choose MRT Top Up');

        await Gestures.bottomSwipeUp();

        await Helpers.waitAndClick(this.mrtTopUp, 'MRT Top Up Button');

        console.log('Waiting for Login Page...');

        await this.loginForm.waitForDisplayed({
            timeout: 90000,
            timeoutMsg: 'TIMEOUT: Login Page did not appear after selecting MRT Top Up.'
        });

        console.log('[PASS] MRT Top Up selected and Login Page loaded successfully');

    }

    async loginPage(){

        console.log('Step 4: Login with Email & Password');

        await Helpers.wait(this.loginForm, 'Login Page');

        const email = process.env.EMAIL;
        if (!email) {
            throw new Error('Email is not set in .env file');
        }

        const password = process.env.PASSWORD;
        if (!password) {
            throw new Error('Password is not set in .env file');
        }

        await Helpers.waitAndClick(this.email, 'Email Field');

        await this.email.setValue(email);

        await Helpers.waitAndClick(this.password, 'Password Field');

        await this.password.setValue(password);

        await driver.pause(3000);

        await Helpers.waitAndClick(this.submit, 'Sign In Button');

        await driver.pause(3000);

        await Helpers.wait(this.mrtCardRecharge, 'MRT Card Recharge Page');

        console.log('Breaking News: Sign In Completed Successfully');

    }

    async mrtCard() {

        console.log('Step 5: Choose MRT Recharge');

        const maxAttempts = 5;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            console.log(`Attempt ${attempt}: Looking for MRT Card Recharge button`);

            const isMrtCardVisible = await this.mrtCardRecharge.waitForDisplayed({
                timeout: 15000
            }).catch(() => false);

            if (!isMrtCardVisible) {
                console.log(`MRT Card Recharge button not visible yet. Attempt ${attempt}`);
                await driver.pause(3000);
                continue;
            }

            await this.mrtCardRecharge.click();

            console.log('Clicked MRT Card Recharge. Waiting for MRT Recharge page...');

            const isRechargePageLoaded = await this.mrtRechargePage.waitForDisplayed({
                timeout: 30000
            }).catch(() => false);

            if (isRechargePageLoaded) {
                console.log('[PASS] MRT Recharge page loaded successfully');
                return;
            }

            console.log(`MRT Recharge page did not load after attempt ${attempt}. Retrying...`);
            await driver.pause(3000);
        }

        throw new Error(`Failed to open MRT Recharge page after ${maxAttempts} attempts`);
    }

    async mrtRecharge(){

        console.log('Step 6: Choose MRT Amount');

        await Helpers.wait(this.mrtRechargePage, 'MRT Recharge Page');

        await Gestures.bottomSwipeUp();

        await Helpers.waitAndClick(this.amount100, '100tk');

        await Gestures.bottomSwipeUp();

        await Helpers.waitAndClick(this.submitButton, 'Amount Submit Button');

        console.log('Waiting for payment method page...');

        await Helpers.wait(this.mobilebanking, 'Mobile Banking Option');

        console.log('Breaking News: MRT Amount Recharge Req Submitted');

    }
    

    async mrtTopUpPage(){

        console.log('Step 7: Pay the amount through Mobile Banking');

        await Helpers.waitAndClick(this.mobilebanking, 'Mobile Banking Option');

        await Helpers.waitAndClick(this.pathaoPay, 'Pathao Pay Option');

        await driver.pause(2000);

        await Helpers.waitAndClick(this.payButton, 'Pay Button');

        console.log('Breaking News: Pay Amount Req Submitted');

    }

    async mrtDashboard(){

        await Helpers.waitAndClick(this.goBackDashboard, 'Go Back to Dashboard option');

        await Helpers.wait(this.mrtCardRecharge, 'MRT Card Dashboard');

        console.log('MRT Card Dashboard page loaded successfully');

    }

}
module.exports = new Dashboard();