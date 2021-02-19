# stockvalue-cli
Command line utility to quickly search stock values of a company in both markets.
# How to install 
```shell
git clone https://github.com/automatic-systems/stockvalue-cli && cd stockvalue-cli  && npm install && npm install playwright
```
### DEMO:
- (latest) https://terminalizer.com/view/c0dfb7b44659
- https://terminalizer.com/view/4a1483da4645
### USAGE:
```bash
❯ node MoneyControl -h
Usage: MoneyControl [options]
Usage: redirect command | MoneyControl [options] | redirect output

Options:
      --version  Show version number                                   [boolean]
  -o, --output   choose output format
                            [choices: "json", "csv", "table"] [default: "table"]
  -m, --mode     choose either mf or stock
                                     [choices: "mf", "stock"] [default: "stock"]
  -h, --help     Show help                                             [boolean]

2021 @ nikhilesh
```
## Features:
- Supports input from streams, or keyboard. Can be operated as a child-process, or as a stand alone utility in terminal.
- Supports output to json,csv or tabular format. Output choice can be choosen by command argument `---output [json|csv]` or are choosen automatically by this utlity considering where does the output goes. 

## Implemented:
- added, and wrapped `prompts` npm module, it now smoothly accepts multiline stdin stream as input.
- wrapped playwrite module to show indeication of some background activitties ont he terminal itself. eg. page.goto
- Added better error handling, also allows exiting of utlity when the stream ends in non-tty mode, skips iterations where error occurs
- `debug` `prompt` , `printer`. use DEBUG=* node . , to be very verbose