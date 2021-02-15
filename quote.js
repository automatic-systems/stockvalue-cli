module.exports=async function scrap(page)
{
	await page.waitForSelector('.inindi_price');
	var [bse,nse]=await page.evaluate(()=>[
		{
			spotVal:document.querySelector('#bsespotval')?.value || 'not traded',
			change:document.querySelector('.bsechange')?.innerText || null
		},
		{
			spotVal:document.querySelector('#nsespotval')?.value || 'not traded',
			change:document.querySelector('#nsechange')?.innerText || null
		}])
	return {nse,bse}
}

