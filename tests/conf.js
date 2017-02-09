exports.config = {
    framework: 'mocha',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    SELENIUM_PROMISE_MANAGER: true,
    restartBrowserBetweenTests: false,
    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY'
    }
}
