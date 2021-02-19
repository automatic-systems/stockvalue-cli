const chalk = require("chalk");
class Printer {
  constructor({keys}) {
    this.keys = keys;
  }
  static getPrinter(...args) {
    if (process.stdout.isTTY) {
      if (process.yargs.output == "j") return new JSONPrinter(...args);
      else return new TerminalPrinter(...args);
    } else if (process.yargs.output == "c") return new CSVPrinter(...args);
    else return new JSONPrinter(...args);
  }
  _select_entries(object) {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) =>
        this.keys ? this.keys.includes(key) : false
      )
    );
  }
}
class JSONPrinter extends Printer {
  print(...objects) {
    objects.forEach((object)=>{
        object = this._select_entries(object);
        console.log(JSON.stringify(object));
    })
  }
}
class CSVPrinter extends Printer {
  constructor({keys, sep = ","}) {
    super({keys});
    this.sep=sep
    if('header' in process.yargs) this._printline(keys);
  }
  _printline(values) {
    console.log(values?.map((k) => JSON.stringify(k)).join(this.sep) || "");
  }
  print(...objects) {
    objects.forEach((object)=>{
        object = this._select_entries(object);
        this._printline(Object.values(object));
    })
  }
}

class TerminalPrinter extends Printer {
    constructor({keys,key_field})
    {
      super({keys});
      this.key_field=key_field;
    }
    _restruct(objects)
    {
        
        return Object.fromEntries(objects.map(object=>{
          object={...object}
          var key=object[this.key_field]
          delete object[this.key_field]
          return [key,object]
        }))
    }
    print(...objects)
    {
        console.table(this._restruct(objects.map(this._select_entries.bind(this))))
    }
  }
  
module.exports = { Printer, JSONPrinter, CSVPrinter };