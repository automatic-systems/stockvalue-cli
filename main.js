const playwright = require('playwright');
const loadify= require("./playwrite_wrapper")
const argv = require('yargs/yargs')(process.argv).argv;
process.yargs=argv
const {StocksSelection,MutualFundSelection} = require('./Selector.js');
const {Printer}=require('./Printer.js')
const {scrapStock,scrapMF} = require("./Quoter.js");
const yargs = require('yargs');

async function main() {
    const browser = await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setDefaultNavigationTimeout(0)
    await loadify(page)
    if (yargs.mode?.startsWith('s'))
    {
        var selector=new StocksSelection(page)
    }
    else var selector=new MutualFundSelection(page)
    var printer;
    while (true)
    {
        try{
            await selector.load(page);
            var quote=await scrapMF(page)
            if(!printer)printer=Printer.getPrinter({keys:Object.keys(quote[0]),key_field:'name'})
            printer.print(...quote)
            await page.evaluate(() => window.stop());
        }
        catch(e)
        {
            if(e=="done")break
            else if(e=='Not Found')console.error("No Result found for given entry")
            else 
            {
                console.error("Error Occured!",e)
                break
            }
        }
    }

    await browser.close()
};
main()
