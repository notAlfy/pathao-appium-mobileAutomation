const Gestures = require('./gestures');

class Helpers {

    async waitAndClick(element, name) {
        await element.waitForDisplayed({
            timeout: 100000,
            timeoutMsg: `TIMEOUT: ${name} could not be found on the screen.`
        });
        await element.click();
    }

    async wait(element, name) { 
        await element.waitForDisplayed({
            timeout: 100000,
            timeoutMsg: `TIMEOUT: ${name} could not be found on the screen.`
        });
    }

    async ensureVisible(element, elementName, maxRetries = 5) {
        
        let attempts = 0;

        while (attempts < maxRetries) {

            const exists = await element.isExisting().catch(() => false);

            if (exists) {

                const displayed = await element.isDisplayed().catch(() => false);

                if (displayed) {
                    console.log(`${elementName} is visible`);
                    return;
                }
            }

            console.log(`${elementName} not visible. Swipe attempt ${attempts + 1}`);

            await Gestures.halfSwipeUp();

            await driver.pause(1500);

            attempts++;
        }

        throw new Error(`${elementName} still not displayed after ${maxRetries} swipes`);
    }

    async findClickFill(element, name, value) {

        await this.ensureVisible(element, name);

        await element.waitForEnabled({ timeout: 5000 });
    
        await element.click();
        
        await element.setValue(value);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
    }

    async findAndClick(element, name) {

        await this.ensureVisible(element, name);
    
        await element.waitForEnabled({ timeout: 5000 });

        await element.click();

    }

    async hideKeyboardIfVisible() {

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

    }

    async nativeScrollToText(text) {
        console.log(`Natively scrolling to find text: ${text}`);
        const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`;
        await $(selector);
    }

}

module.exports = new Helpers();