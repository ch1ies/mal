var printer = {}
if (typeof module !== 'undefined') {
  var types = require('./types')
  printer.println = exports.println = function () {
    console.log.apply(console, arguments)
  }
}
function _pr_str(obj, print_readably = true) {
  var _r = print_readably
  var type = types._obj_type(obj) // 判断类型
  console.log(type, 'type' )
  switch (type) {
    case 'list':
      var ret = obj.map(function(it){return _pr_str(it, _r)})
      console.log(ret, 'ret')
      return "(" + ret.join(" ") + ")"
    case 'symbol':
      return obj.value
    default:
      return obj.toString()
  }
}



exports._pr_str = printer._pr_str = _pr_str