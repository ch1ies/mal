// 用来保存reader函数
var reader = {}
if (typeof module !== 'undefined') {
  var types = require('./types');
} else {
  var exports = reader;
}
class Reader {
  constructor(tokens) {
    this.tokens=tokens,
    this.position=0
  }
  // 返回当前位置的token,并且增大position
  next() {
    return this.tokens[this.position++];
  }
  // 返回当前位置的token
  peek() {
    return this.tokens[this.position]
  }
}
// 词法分析
function read_str(str) {
  var tokens = tokenize(str) // [ '(', '+', '1', '2', ')' ]
  if (tokens.length === 0) {throw new BlankException() }
  return read_form(new Reader(tokens))
}

// 该函数接受一个字符串，返回一个数组/列表，里面包含了所有的token
function tokenize(str) {
  var re = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g;
  var results = [];
  while ((match = re.exec(str)[1]) != '') {
    // console.log(match, 'match')
    if (match[0] === ';') {continue;}
    results.push(match)
  }
  console.log(results, 'results')
  return results
}

// 读取toke字符，分类做判断, 返回一个ast
function read_form(reader) {
  var token = reader.peek();
  console.log(token, 'token')
  // 分情况讨论, 至顶向下递归调用分析
  switch (token) {
    case ';': return null
    case '\'':
      console.log(token, 'token_form')
      reader.next();
      return [types._symbol('quote'), read_form(reader)]
    case '`': reader.next()
      return [types._symbol('quasiquote'), read_form(reader)]
    // list ()
    case ')': throw new Error("unexpected ')' ")
    case '(': return read_list(reader)

    // atom 基本字符
    default: return read_atom(reader)
  }
}
// 对子树反复调用 read_form 分情况讨论, 将结果收集到list中
function read_list(reader, start, end) {
  start = start || '(';
  end = end || ')';
  var ast = []
  var token = reader.next(); // 拿到当前的字符，并且指针指向下一项
  console.log(token, 'token_list');
  if (token !== start) {
    throw new Error("expectef '" + start + "'")
  }
  while((token = reader.peek()) !== end) { // 当前字符不等于 “ ）”
    if (!token) {
      throw new Error("Expected '" + end + "', but got EOF")
    }
    ast.push(read_form(reader))
  }
  // （）使用reader收集完成，此时当前字符为 “ ）”
  reader.next()
  return ast
}
// 解析token内容，并返回简单，非复合的数据，即没有（）
function read_atom(reader) {
  var token = reader.next();
  console.log(token, 'token_atom')
  if (token.match(/^-?[0-9]+$/)) { // integer
    return parseInt(token, 10);
  } else if (token.match(/^-?[0-9][0-9.]*$/)) { // float}
    return parseFloat(token, 10)
  } else if (token.match(/^"(?:\\.|[^\\"]*"$)/)) {
    console.log(token, 'symbol-')
  } else if (token === 'true') {
    return true
  } else if (token === 'false') {
    return false
  } else { // 记录数学含义符号 + - * /
    return types._symbol(token)
  }
}
function BlankException(msg) {
}

// const str = "(+ 1 (* 2 3))"
// var ast = read_str(str)
// console.log(ast, 'ast')
exports.read_str = reader.read_str = read_str
exports.tokenize = reader.tokenize = tokenize
exports.read_form = reader.read_form = read_form
exports.Reader = reader.Reader = Reader
exports.BlankException = reader.BlankException = BlankException