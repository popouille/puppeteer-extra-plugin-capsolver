const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
const CapSolverPlugin = require('../../src/index')(); // ! Initialize once with ()

puppeteer.use(CapSolverPlugin);
CapSolverPlugin.setHandler('CAI-C80954DFBBACBBAEAD84395D19554D65', 1);

async function fill(page){
    // ## fill form
    const emailbox = 'input[name="email"]';
    await page.waitForSelector(emailbox);
    await page.click(emailbox);
    await page.type(emailbox, email);

    const usernamebox = 'input[name="username"]';
    await page.click(usernamebox);
    await page.type(usernamebox, username);

    const passwordbox = 'input[type="password"]';
    await page.click(passwordbox);
    await page.type(passwordbox, password);

    const termsagreebox = 'input[type="checkbox"]';
    await page.waitForSelector(termsagreebox);
    await page.click(termsagreebox);

    const monthbox = 'div[class^=month-]';
    await page.click(monthbox);
    await page.$eval(monthbox, () =>{
        document.querySelector('div[class^=month-]')
            .children[0].children[0]
            .children[0].children[2]
            .children[0].children[Math.floor( Math.random() * (12 - 1) + 1 )].click()
    });

    const daybox = 'input#react-select-3-input';
    await page.click(daybox);
    await page.type(daybox, String(Math.floor(Math.random() * (30 - 1) + 1)) );

    const yearbox = 'input#react-select-4-input';
    await page.click(yearbox);
    await page.type(yearbox, String(1980) );

    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1800);

    const htmldata = await page.$eval('body', (e) => { return String(e.innerHTML); })
    if( htmldata.includes('rate limited')){
        console.log('[myapp] ❌[' + email + '][?banned ip]');
        process.exit(1);
    }
}

async function tokenizeHcaptcha(hcaptchaPage, websiteURL, websiteKey){

    await hcaptchaPage.waitForTimeout(100);

    const handler = CapSolverPlugin.handler();
    const response = await handler.hcaptchaproxyless(websiteURL, websiteKey);

    if(response.error !== 0 || response.apiResponse.errorId !== 0){ throw response.apiResponse; }   // throw solving/request error exception
    else{
        // handle Token into Page
        let token = String(response.apiResponse.solution.gRecaptchaResponse);   // token from capsolver response
        await hcaptchaPage.evaluate((token) => {
            document.querySelector('iframe[title="widget containing checkbox for hCaptcha security challenge"]').setAttribute('data-hcaptcha-response', token);
            document.querySelector('textarea[name="h-captcha-response"]').innerHTML = token;
        }, token);
        console.log('[myapp][Fresh HCaptcha token joined into html]');
        await hcaptchaPage.waitForTimeout(100);

        // ############ discord version ########## //
        await hcaptchaPage.evaluate((token) => { document.querySelector('iframe').parentElement.parentElement.__reactProps$.children.props.onVerify(token); }, token);
        console.log('[myapp][Hooked callback function]')

        return true;
    }
}

// ########## //
// ## MAIN ## //
// ########## //  qwertyy 2022 - https://github.com/0qwertyy/puppeteer-extra-plugin-capsolver

const targeturl = 'https://discord.com/register';
const catchall = '@owndomain.net';
let email, username, password;

puppeteer.launch({
    headless: false, executablePath: executablePath(),
}).then(async browser => {

    username = 'username1234'+
        Math.floor(Math.random() * 100);
    email = username + catchall;
    password = 'default00#';

    try{
        await browser.createIncognitoBrowserContext();
        let page = await browser.newPage();

        await page.goto(targeturl);
        console.log('[myapp][get]['+targeturl+']');

        await fill(page)
        await page.waitForSelector('iframe');

        // page with hcaptcha and captcha websitekey
        await tokenizeHcaptcha(page, 'https://discord.com/', '4c672d35-0701-42b2-88c3-78380b0db560');

        await page.waitForNavigation({timeout: 3500}).catch(async (e) => {  });
        await page.waitForTimeout(800);
        let htmldata1 = await page.$eval('body', (body) => { return body.innerHTML; });
        // handle htmldata1

        await browser.close();
    }catch (e){
        await browser.close();
        console.log('[myapp] ❌[' + email + '][' + e + ']');
        console.log(e);

    }
})

