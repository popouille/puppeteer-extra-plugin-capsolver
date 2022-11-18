# puppeteer-extra-plugin-capsolver
[![](https://img.shields.io/badge/1.0.0-puppeteer--extra--plugin--capsolver-blue?logo=npm&logoColor=white)](https://www.npmjs.com/package/puppeteer-extra-plugin-capsolver)
[![](https://img.shields.io/badge/provider-capsolver.com-blue)](https://www.capsolver.com/)
[![](https://img.shields.io/badge/API_doc-captchaai.atlassian.net-blue)](https://captchaai.atlassian.net/wiki/spaces/capsolver/pages/393295/All+task+types+and+price+list)


- **Manage to solve captcha challenges with AI ([captcha service based](https://dashboard.capsolver.com/passport/register?inviteCode=CHhA_5os)).**
- **Puppeteer browser context.**
- ❗ An API key it's **required**. [**Get here.**](https://dashboard.capsolver.com/passport/register?inviteCode=CHhA_5os)
---

⬇️ Install
-
    npm i puppeteer puppeteer-extra puppeteer-extra-plugin-capsolver

✋ Usage
-
1. Import and use within [`puppeteer-extra`](https://github.com/berstend/puppeteer-extra).

   ```javascript 
    const puppeteer = require('puppeteer-extra');
    const CapSolverPlugin = require('puppeteer-extra-plugin-capsolver')();
    
    puppeteer.use(CapSolverPlugin);
    ```

2. `.setHandler('apikey', verbose)` - at the top of your script.

Set your apikey in order to request solving tasks.


   ```javascript 
    CapSolverPlugin.setHandler('CAI-XXX...', 1); // debug tasks: 1 or 2
 ```


📖 Handler / Solving API Wrapper
-

- **Handler it's based on [capsolver-npm](https://github.com/0qwertyy/capsolver-npm) (nodejs api wrapper for capsolver.com api).**

- Retrieve the currently handler:
```javascript
const handler = CapSolverPlugin.handler()
```
- Perform any method that [capsolver-npm](https://github.com/0qwertyy/capsolver-npm) brings.
- Supported captcha tasks listed on capsolver-npm at [*Supported API methods*](https://github.com/0qwertyy/capsolver-npm#%EF%B8%8Fsupported-api-methods).

*example: retrieve handler and call for funcaptcha token.*
```javascript
//  
await CapSolverPlugin.handler()
  .funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain)
  .then((response) => {
    if(response.error !== 0){ 
        const token = response.apiResponse.solution;
    }else{ 
        const token = null; 
        console.log('[myapp][got error]' + JSON.stringify(response.apiResponse))
    }  
  }).catch(e => {
      console.log(e);
  })
```

🖱 Extra DOM Features
-

- [x] **`await CapSolverPlugin.hcaptchaclicker(page)`**  - handle a page including hcaptcha iframe and trigger it, then emulates human clicks. *[example script (how to use).](https://github.com/0qwertyy/puppeteer-extra-plugin-capsolver/blob/master/examples/hcaptchaclicker.js)*

```javascript
puppeteer.launch({ headless: false })
.then(async browser => {
    let page = await browser.newPage();
    await page.goto(targeturl);
    await CapSolverPlugin.hcaptchaclicker(page, true)
    .then(async (page) => {
        // handle clicker success
        await page.click('#submit');
        await page.waitForNavigation();
    }).catch((e) => {
        // handle clicker error
        console.log(e);
    });

})
```
![](https://i.ibb.co/VqVCrZD/webstorm64-a8-AKCsln4p.png)
- [ ] hcaptcha callback.
- [ ] funcaptcha clicker.
- [ ] funcaptcha callback.

📁 Examples
-

figure out at [examples](https://github.com/0qwertyy/puppeteer-extra-plugin-capsolver/blob/master/examples/) directory
