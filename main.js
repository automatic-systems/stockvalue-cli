const playwright = require('playwright');
const choose_company = require('./choose.js');
const quotes = require("./quote.js")

async function main() {
    const browser = await playwright.chromium.launch({headless:true});
    const context = await browser.newContext();
    const page = await context.newPage();
    while (true)
    {
        try{
            await choose_company(page);
            var quote=await quotes(page)

            console.log()
            console.table(quote);
            await page.evaluate(() => window.stop());
            await browser.close()
            break
        }
        catch(e)
        {
            console.error("Error Occured!",e.msg)
        }
    }
};
main()
