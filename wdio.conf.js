require('dotenv').config();

exports.config = {
    runner: 'local',
    port: 4723,

    specs: [
        './tests/specs/*.js'
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'RZCT80PEYEH',
        'appium:platformVersion': '16.0',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.pathao.user',
        'appium:noReset': true,
        'appium:newCommandTimeout': 3600,
        'appium:autoGrantPermissions': true,
        'appium:fullReset': false,
        'appium:autoLaunch': true
    }],

    logLevel: 'warn',

    bail: 0,

    waitforTimeout: 15000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: ['appium', 'visual'],

    framework: 'mocha',

    reporters: [
        'dot',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            reportedEnvironmentVars: {
                Project: 'Pathao Android App Automation',
                Platform: 'Android',
                Device: 'RZCT80PEYEH',
                Android_Version: '16.0',
                App_Package: 'com.pathao.user',
                Automation_Driver: 'UiAutomator2',
                Framework: 'WebDriverIO',
                Test_Framework: 'Mocha',
                Reporter: 'Allure'
            }
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 300000
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
            console.log(`Test "${test.title}" failed. Leaving app open for debugging.`);
        } else {
            console.log(`Test "${test.title}" passed. Closing app...`);
            await driver.terminateApp('com.pathao.user');
        }
    }
};