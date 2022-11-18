const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
const CapSolverPlugin = require('../src/index')(); // ! Initialize once with ()

puppeteer.use(CapSolverPlugin);
CapSolverPlugin.setHandler('CAI-C80954DFBBACBBAEAD84395D19554D65', 1); // set your capsolver.com apikey

// ########## //
// ## MAIN ## //  *hcaptchaclicker example
// ########## //  qwertyy 2022 - https://github.com/0qwertyy/puppeteer-extra-plugin-capsolver

let targeturl = 'https://accounts.hcaptcha.com/demo';

puppeteer.launch({
    headless: false, executablePath: executablePath(),
})
.then(async browser => {

    await browser.createIncognitoBrowserContext();
    let page = await browser.newPage();
    await page.goto(targeturl);
    console.log('[myapp][get][' + targeturl + ']');

    //
    // build your own script here ...
    //

    console.log('[myapp][running hcaptcha clicker on '+JSON.stringify(page)+']');
    await CapSolverPlugin.hcaptchaclicker(page, true)
    .then(async (page) => {
        // handle hcaptchaclicker success
        await page.click('#hcaptcha-demo-submit');
        await page.waitForNavigation();
    }).catch((e) => {
        // handle hcaptchaclicker errors
        console.log(e);
    });

})