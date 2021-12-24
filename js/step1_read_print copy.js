if (typeof module !== 'undefined') {
  var readline = require('./node_readline')
  var printer = require('./printer')
  var reader = require('./reader')
}

function READ(str) {
  return reader.read_str(str)
}

function EVAL(ast, env) {
  return ast
}

function PRINT(exp) {
  return printer._pr_str(exp, true)
}

var rep = function(str){ return PRINT(EVAL(READ(str)))}

// repl loop 循环打印
// 检查当前环境是否为node
if (typeof require !== 'undefined' && require.main === module) {
  while (true) {
    var line = readline.readline("user>")
    if (line === null) { break}
    try {
      if (line) {printer.println(rep(line))}
    } catch (exc) {
      if (exc instanceof reader.BlankException) {continue}
      if (exc instanceof Error) {console.warn(exc.stack)} else {
        console.warn('Error: ' + printer._pr_str(exc, true))}
    }
  }
}