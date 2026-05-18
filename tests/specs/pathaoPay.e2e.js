const HomePage =        require('../pageobjects/home.page');
const Verification =    require('../pageobjects/pathaoPay/verification.page');
const Dashboard =       require('../pageobjects/pathaoPay/dashboard.page')

describe('Pathao Pay Flow', () => {

    it('should complete MRT recharge flow through Pathao Pay', async () => {

        await driver.activateApp('com.pathao.user');

        await driver.pause(3000);
        
        await HomePage.selectService('pathaoPay');

        await Verification.verifyPin();

        await Dashboard.chooseOption();

        await Dashboard.loginPage();

        await Dashboard.mrtCard();

        await Dashboard.mrtRecharge();

        await Dashboard.mrtTopUpPage();

        await Dashboard.mrtDashboard();

    });
    
});