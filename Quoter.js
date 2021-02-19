module.exports={scrapMF,scrapStock}
async function scrapStock(page)
{
	await page.waitForSelector('.inindi_price');
	var result=await page.evaluate(()=>[
		{	
			...(()=>
				{
					var [name,sector]=document.querySelector(".inid_name")?.innerText.split("\n")
					sector=sector.split(":")[1].trim()
					return {name,sector}
				})(),
			nsespotVal:document.querySelector('#bsespotval')?.value || 'not traded',
			nsechange:document.querySelector('.bsechange')?.innerText || null,
			bsespotVal:document.querySelector('#nsespotval')?.value || 'not traded',
			bsechange:document.querySelector('#nsechange')?.innerText || null,
			bsevol:document.querySelector('#bse_vol')?.innerText || null,
			nsevol:document.querySelector('#nse_vol')?.innerText || null
		}])
	return result
}
async function quotexist(page){
	
	var text=await page.evaluate(()=>find(`Not Found.`))
	if(text)throw "Not Found"
}
async function scrapMF(page)
{
	await page.waitForSelector('.page_heading,.PA10');
	await quotexist(page)
	var nav=await page.evaluate(()=>({
			name:document.querySelector('.page_heading').innerText,
			nav:document.querySelector('.top_section  .amt')?.innerText || 'not listed',
			change:document.querySelector('.top_section  .green_text')?.innerText || null
		}))
	return [nav]
}

