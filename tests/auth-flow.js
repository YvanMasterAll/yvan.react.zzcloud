module.exports = {
    'get to login page': (browser) => {
        browser
            .url(browser.launchUrl)
            .waitForElementVisible('.navbar', 1000)
            .click('a[href="/login"]')
        browser.assert.urlContains('login')
    },
    'logging in': (browser) => {},
    'logging out': (browser) => {},
    'close': (browser) => {}
}