const playwright = require('playwright');
const loadify= require("./playwrite_wrapper")
// const argv = require('yargs/yargs')(process.argv).argv;
var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .usage('Usage: redirect command | $0 [options] | redirect output')
    .alias('o', 'output')
    .describe('o', 'choose output format ')
    .choices('o',["json",'csv','table'])
    .default('o','table')
    .alias('m', 'mode')
    .describe('m', 'choose either mf or stock')
    .choices('m',["mf",'stock'])
    .default('m','stock')
    .help('h')
    .alias('h', 'help')
    .epilog('2021 @ nikhilesh')
    .argv;
process.yargs=argv
const {StocksSelection,MutualFundSelection} = require('./Selector.js');
const {Printer}=require('./Printer.js')
const { QuoteStock, QuoteMutualFund} = require("./Quoter.js");
async function main() {
    const browser = await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setDefaultNavigationTimeout(0)
    await loadify(page)
    if (argv.mode=='stock')
    {
        var selector=new StocksSelection(page);
        var quoter=new QuoteStock(page)
    }
    else
    {
         var selector=new MutualFundSelection(page)
         var quoter=new QuoteMutualFund(page)
    }
    var printer;
    while (true)
    {
        try{
            await selector.load(page);
            var quote=await quoter.quote()
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
            }
        }
    }

    await browser.close()
};
main()
