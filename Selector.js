/**
 *  This module allows user to enter comapnay name,
 *   and if the entered company name is not very specific,
 *  it gives option to choose a more specific company name.
 */
const prompt = require('./prompts_wrapper');
class StocksSelection
{	
	page;
	constructor(page)
	{
		if(!page)throw "illegal page"
		this.page=page
	}
	async  searchaCompany()
	{
		var {company_name}=await prompt([{type:'text',name:'company_name',message:'Enter name of Company :'}]);
		if(!company_name)throw "done"
		await this.page.goto(`https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?search_str=${company_name}`);
	}
	async checkSearchFailed()
	{
		var text=await this.page.evaluate(()=>find("no matches"))
		if (text)throw "Not Found"
	}
	async  isQuotePage()
	{
		var reg=new RegExp('/stockpricequote/')	
		var url=await this.page.url()
		return reg.test(url);
		
	}
	async  collectSearchResult()
	{
		await this.page.waitForSelector('.srch_tbl');
			var choices=await this.page.evaluate(
				()=>[...document.querySelectorAll('.srch_tbl  tr td:first-child')]
					.map(el=>[el.innerText,el.querySelector('a').href]));
		return Object.fromEntries(choices)
	}
	async  ChooseFromSearchResult(choices)
	{
			var options=Object.keys(choices)
				var {company}=await prompt(
					[{
						type:'select',
						name:'company',
						message:'Which one do you want to inquire?',
						choices:options}])
		if(options[company]==undefined)throw "error"
		return options[company]
	}
	async  load()
	{
		while (true)
		{
			await this.searchaCompany()
			if (await this.isQuotePage()) break; // implies, a specific company name had been searched , hence not showing choices
			await this.checkSearchFailed()
			var choices=await this.collectSearchResult()
			if (Object.keys(choices).length == 0)continue;// no result match, try again
			var company_name=await this.ChooseFromSearchResult(choices)
			await this.page.goto(choices[company_name]);
			break
		}
	}
}
// async  load_MF(page)
// {
 	// var reg=new RegExp('/mutual-funds/nav/')	
	// while (true)
	// {
	// 	var {mf}=await enquirer.prompt([{type:'input',name:'mf',message:'Enter name of Mutual Fund :'}]);
	//         await page.goto(`http://www.moneycontrol.com/mf/mf_info/mfsearch.php?search_str=${mf}`);
	// 	if (reg.test(await page.url())) break; // implies, a specific mf had been searched , hence not showing choices
	// 	await page.waitForSelector('.srch_tbl');
	// 	var choices=await page.evaluate(
	// 		()=>[...document.querySelectorAll('.srch_tbl  tr td:first-child')]
	// 		     .map(el=>[el.innerText,el.querySelector('a').href]));
	// 	if (choices.length == 0)continue;
	// 	choices=Object.fromEntries(choices);
	// 	var {mf}=await enquirer.prompt([{type:'select',name:'mf',message:'Which one do you want to inquire?',choices:Object.keys(choices)}]);
	// 	page.goto(choices[mf]);
	// 	break
	// }
// }
class MutualFundSelection
{
	page
	constructor(page)
	{
		if(!page)throw "Invalid Page"
		this.page=page
	}
	async checkSearchFailed()
	{
		var text=await this.page.evaluate(()=>find("No result found"))
		if (text)throw "Not Found"
	}
	async searchMF(page)
	{	
		var {mf}=await prompt([{type:'text',name:'mf',message:'Enter name of Mutual Fund :'}]);
		if(!mf)throw "done"
		await this.page.goto(`http://www.moneycontrol.com/mf/mf_info/mfsearch.php?search_str=${mf}`);
	}

	async  isQuotePage(page)
	{
		var reg=new RegExp('/mutual-funds/nav/')	
		var url=await this.page.url()
		return reg.test(url);
		
	}

	async  collectSearchResult()
	{
		await this.page.waitForSelector('.srch_tbl');
			var choices=await this.page.evaluate(
				()=>[...document.querySelectorAll('.srch_tbl  tr td:first-child')]
					.map(el=>[el.innerText,el.querySelector('a').href]));
		return Object.fromEntries(choices)
	}

	async  ChooseFromSearchResult(choices)
	{
			var options=Object.keys(choices)
				var {mf}=await prompt(
					[{
						type:'select',
						name:'mf',
						message:'Which one do you want to inquire?',
						choices:options}])
		if(options[mf]==undefined)throw "error"
		return options[mf]
	}
	async  load()
	{
		while (true)
		{
			await this.searchMF()
			if (await this.isQuotePage()) break; // implies, a specific company name had been searched , hence not showing choices
			await this.checkSearchFailed()
			var choices=await this.collectSearchResult()
			if (Object.keys(choices).length == 0)continue;// no result match, try again
			var mf=await this.ChooseFromSearchResult(choices)
			await this.page.goto(choices[mf]);
			break
		}
	}
	
	// async load(page)
	// {
	// 	var reg=new RegExp('/mutual-funds/nav/')	
	// 	while (true)
	// 	{
			
	// 		var {mf}=await enquirer.prompt([{type:'input',name:'mf',message:'Enter name of Mutual Fund :'}]);
	// 			await page.goto(`http://www.moneycontrol.com/mf/mf_info/mfsearch.php?search_str=${mf}`);
	// 		if (reg.test(await page.url())) break; // implies, a specific mf had been searched , hence not showing choices
	// 		await page.waitForSelector('.srch_tbl');
	// 		var choices=await page.evaluate(
	// 			()=>[...document.querySelectorAll('.srch_tbl  tr td:first-child')]
	// 				 .map(el=>[el.innerText,el.querySelector('a').href]));
	// 		if (choices.length == 0)continue;
	// 		choices=Object.fromEntries(choices);
	// 		var {mf}=await enquirer.prompt([{type:'select',name:'mf',message:'Which one do you want to inquire?',choices:Object.keys(choices)}]);
	// 		page.goto(choices[mf]);
	// 		break
	// 	}
	// }
}

module.exports={StocksSelection,MutualFundSelection}