class Gestures {

    async bottomSwipeUp() {

        console.log('Swiping up...');

        const size = await driver.getWindowSize();

        const startX = Math.floor(size.width / 2);
        const startY = Math.floor((size.height * 0.80));
        const endX = startX;
        const endY = Math.floor(size.height * 0.25);

        await driver.action('pointer', {
            parameters: { pointerType: 'touch' }
        })
        .move({ duration: 0, x: startX, y: startY, origin: 'viewport' })
        .down({ button: 0 })
        .pause(200)
        .move({ duration: 1000, x: endX, y: endY, origin: 'viewport' })
        .up({ button: 0 })
        .perform();

    }

    async halfSwipeUp() {

        console.log('Swiping up...');

        const size = await driver.getWindowSize();

        const startX = Math.floor(size.width / 2);
        const startY = Math.floor((size.height / 2) - (size.height * 0.1));
        const endX = startX;
        const endY = Math.floor(size.height * 0.25);

        await driver.action('pointer', {
            parameters: { pointerType: 'touch' }
        })
        .move({ duration: 0, x: startX, y: startY, origin: 'viewport' })
        .down({ button: 0 })
        .pause(200)
        .move({ duration: 100, x: endX, y: endY, origin: 'viewport' })
        .up({ button: 0 })
        .perform();
        
    }

    async tapByCoordinates(x, y) {

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause',       duration: 100 },
                    { type: 'pointerUp',   button: 0 }
                ]
            }
        ]);

        await driver.releaseActions();

    }

}

module.exports = new Gestures();