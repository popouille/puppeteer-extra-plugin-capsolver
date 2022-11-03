const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
const CaptchaaiPlugin = require('puppeteer-extra-plugin-captchaai')(); // ! Initialize once with ()

puppeteer.use(CaptchaaiPlugin);
CaptchaaiPlugin.setHandler('CAI-XXX...', 1); // set your captchaai.io apikey

// ########## //
// ## MAIN ## //  *hcaptchaclicker example
// ########## //  qwertyy 2022 - https://github.com/0qwertyy/puppeteer-extra-plugin-captchaai

let targeturl = 'https://accounts.hcaptcha.com/demo';

puppeteer.launch({
    headless: false, executablePath: executablePath(),
})
.then(async browser => {

    await browser.createIncognitoBrowserContext();
    let page = await browser.newPage();
    await page.goto(targeturl);
    console.log('[myapp][get]['+targeturl+']');

    //
    // build your own script here ...
    //

    console.log('[myapp][running hcaptcha clicker on '+JSON.stringify(page)+']');
    await CaptchaaiPlugin.hcaptchaclicker(page, true)
    .then(async (page) => {
        // handle hcaptchaclicker success
        await page.click('#hcaptcha-demo-submit');
        await page.waitForNavigation();
    }).catch((e) => {
        // handle hcaptchaclicker errors
        console.log(e);
    });

})