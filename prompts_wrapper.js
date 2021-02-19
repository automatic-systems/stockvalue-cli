const ora = require('ora');
const spinner = ora('Loading unicorns')
const prompt = require('prompts');
const debug=require("debug")('prompt')
if (!process.stdin.isTTY)
{
    prompt._locks=[]
    var leftover='';
	prompt._injected=prompt._injected||[]
    function refresh()
    {
        prompt._injected.forEach((a)=>{
            if (a instanceof Error)
                while (a=prompt._locks.shift())a.rej()
            else 
                prompt._locks.shift()?.res()
        })
    }
    process.stdin.on('data',(d)=>{
        debug('chunck recieved')
        var data=d.toString().split("\n");
        data[0]=leftover+data[0]
        leftover=data.pop()
        prompt._injected.push(...data);
        refresh()
	});
	process.stdin.on('end',(e)=>{
        prompt._injected.push(leftover,new Error)
        refresh()
        debug('stdin finished')
    })
}
module.exports=async function prompt_wrapped(...arg)
{
    if(prompt._injected?.length==0)
    {
            spinner.start("Waiting for input. . ")
            await new Promise((res,rej)=>prompt._locks.push({res,rej})); //wait for a value
            spinner.stop()
    }
    else if(prompt._injected&&prompt._injected[0] instanceof Error)
        throw "done"
    return prompt(...arg)
}