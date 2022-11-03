# puppeteer-extra-plugin-captchaai
[![](https://img.shields.io/badge/1.0.0-puppeteer--extra--plugin--captchaai-blue?logo=npm&logoColor=white)](https://www.npmjs.com/package/puppeteer-extra-plugin-captchaai)
[![](https://img.shields.io/badge/provider-captchaai.io-blue)](https://www.captchaai.io/)
[![](https://img.shields.io/badge/API_doc-captchaai.atlassian.net-blue)](https://captchaai.atlassian.net/wiki/spaces/CAPTCHAAI/pages/393295/All+task+types+and+price+list)


- **Manage to solve captcha challenges with AI ([captcha service based](https://dashboard.captchaai.io/passport/register?inviteCode=CHhA_5os)).**
- **Puppeteer browser context.**
- ❗ An API key it's **required**. [**Get here.**](https://dashboard.captchaai.io/passport/register?inviteCode=CHhA_5os)
---

⬇️ Install
-
    npm i puppeteer puppeteer-extra puppeteer-extra-plugin-captchaai

✋ Usage
-
1. Import and use within [`puppeteer-extra`](https://github.com/berstend/puppeteer-extra).

   ```javascript 
    const puppeteer = require('puppeteer-extra');
    const CaptchaaiPlugin = require('puppeteer-extra-plugin-captchaai')();
    
    puppeteer.use(CaptchaaiPlugin);
    ```

2. `.setHandler('apikey', verbose)` - at the top of your script.

Set your apikey in order to request solving tasks.


   ```javascript 
    CaptchaaiPlugin.setHandler('CAI-XXX...', 1); // debug tasks: 1 or 2
 ```


📖 Handler / Solving API Wrapper
-

- **Handler it's based on [captchaai-npm](https://github.com/0qwertyy/captchaai-npm) (nodejs api wrapper for captchaai.io api).**

- Get the currently handler with `CaptchaaiPlugin.handler()` method.
- Perform any method that [***captchaai-npm***](https://github.com/0qwertyy/captchaai-npm) brings.
- Supported captcha tasks listed on [***captchaai-npm***](https://github.com/0qwertyy/captchaai-npm) at *Supported API methods*.

🖱 Extra DOM Features
-

- [x] **`.hcaptchaclicker(page)`**  - handle a page including hcaptcha and trigger, then emulate human clicks. *[example script.]()*

![](https://i.ibb.co/VqVCrZD/webstorm64-a8-AKCsln4p.png)

- [ ] hcaptcha callback.
- [ ] funcaptcha clicker
- [ ] funcaptcha callback

📁 Examples
-

figure out at examples directory