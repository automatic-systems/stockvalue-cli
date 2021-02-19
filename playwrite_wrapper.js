const ora = require('ora');
const spinner = ora('Loading unicorns')
const chalk = require('chalk');
const URL=require('url');
const { url } = require('inspector');
function basename(url)
{
    return (new (URL.URL)(url)).hostname
}
module.exports=async function wrapPage(page)
{
    // await page.setRequestInterception(true);

    await page.route('**/*.{png,jpg,jpeg,css,js}', route => route.abort());
    var goto=page.goto
    page.goto=async(...arg)=>
    {
        spinner.start("Loading data from "+chalk.greenBright(basename(arg[0]))+'\n')
        await goto.call(page,...arg);
        spinner.stop()
    }
}