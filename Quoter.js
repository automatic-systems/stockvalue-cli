
class QuoteStock
{
	constructor(page)
	{
		if(!page) throw "illage page"
		this.page=page
	}
	async quotexist(){
	
		var text=await this.page.evaluate(()=>find(`Stock not traded`))
		if(text)throw "Not Found"
	}
	async quote(page)
	{
		await this.page.waitForSelector('.inindi_price,#stockName');
		await this.quotexist()
		var result=await this.page.evaluate(()=>[
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
}

class QuoteMutualFund
{
	constructor(page)
	{
		if(!page) throw "illage page"
		this.page=page
	}
	async quotexist(){
	
		var text=await this.page.evaluate(()=>find(`Not Found.`))
		if(text)throw "Not Found"
	}
	async quote()
	{
		await this.page.waitForSelector('.page_heading,.PA10');
		await this.quotexist()
		var nav=await this.page.evaluate(()=>({
				name:document.querySelector('.page_heading').innerText,
				nav:document.querySelector('.top_section  .amt')?.innerText || 'not listed',
				change:document.querySelector('.top_section  .green_text')?.innerText || null
			}))
		return [nav]
	}
}

module.exports={QuoteMutualFund,QuoteStock}