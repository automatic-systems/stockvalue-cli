const inquirer= require('inquirer');
module.exports=async function load_company(page)
{
 	var reg=new RegExp('/stockpricequote/')	
	while (true)
	{
		var {company_name}=await inquirer.prompt([{type:'input',name:'company_name',message:'Enter name of Company :'}]);
	        await page.goto(`https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?search_str=${company_name}`);
		if (reg.test(await page.url())) break;
		await page.waitForSelector('.srch_tbl');
		var choices=await page.evaluate(
			()=>[...document.querySelectorAll('.srch_tbl  tr td:first-child')]
			     .map(el=>[el.innerText,el.querySelector('a').href]));
		if (choices.length == 0)continue;
		choices=Object.fromEntries(choices);
		var {company_name}=await inquirer.prompt([{type:'list',name:'company_name',message:'Which one do you want to inquire?',choices:Object.keys(choices)}]);
		page.goto(choices[company_name]);
		break
	}
}
