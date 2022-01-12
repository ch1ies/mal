
if (typeof module !== 'undefined') {
  var types = require('./types')
  var readline = require('./node_readline')
  var printer = require('./printer')
  var reader = require('./reader')
}

function READ(str) {
  return reader.read_str(str)
}
// 求值器 EVAL-APPLY 循环
function EVAL(ast, env) {
  var result = _EVAL(ast, env)
  return (typeof result !== 'undefined') ? result : null
}
// 值考虑（），基本数字，和基本运算符，不包含向量，哈希表等。。
function _EVAL(ast, env) {
  // ast 不是一个列表
  if (!types._list_Q(ast)) {
    return eval_ast(ast, env)
  }
  // 是一个空的列表
  if (ast.length === 0) {
    return ast
  }
  // 不为空的列表
  var el = eval_ast(ast, env)
  console.log(el, 'el')
  var f = el[0]
  return f.apply(el, el.slice(1))
}
// 对ast 的类型进行匹配，并做出相应处理
function eval_ast(ast, env) {
  // 是操作符号
  console.log(ast, 'ast');
  if (types._symbol_Q(ast)) {
    if (ast.value in env) {
      return env[ast.value];
    } else {
      throw new Error("'" + ast.value + "' not found");
    }
  } else if (types._list_Q(ast)) { // 是一个列表如 [ Symbol: {value : " + "}, 1,2]
    return ast.map(function(a) {return EVAL(a, env)}) 
  } else { // 基本元素 1， 2 。。。
    return ast
  }
}

function PRINT(exp) {
  return printer._pr_str(exp, true)
}
// 定义一个简单的REPL 环境， 这个环境是一个关联数据结构。将符号（symbols names）映射为数学运算函数
// [ Symbol { value: '+' }, 1, [ Symbol { value: '*' }, 2, 3 ] ] --> [ [Function], 2, 3 ], [ [Function], 1, 6 ] 
var repl_env = {}
var rep = function(str){ return PRINT(EVAL(READ(str), repl_env))}

repl_env['+'] = function (a, b){return a + b}
repl_env['-'] = function (a, b){return a - b}
repl_env['*'] = function (a, b){return a * b}
repl_env['/'] = function (a, b){return a / b}


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
