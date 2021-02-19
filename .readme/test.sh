node MoneyControl --mode stock -o json # demonstate search ,by searching hdfc
node MoneyControl --mode stock ; # output stock as table to terminal, yes bank
node MoneyControl --mode mf --output csv ; # print mutual fund as csv to terminal
node MoneyControl --mode mf  # demonstate search ,by searching icici

printf "mrf\nongc\nyes bank" | node MoneyControl --mode stock -o json | jq '.name,.nsevol'  ; #print name and nse volume of a list of comapnies 
printf "mrf\nongc\nyes bank" | node MoneyControl --mode mf -o json  ; # handles wrong names