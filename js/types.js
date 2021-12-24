var types = {}
function Symbol(name) {
  this.value = name;
  return this;
}
function _symbol(name) { return new Symbol(name)}
function _symbol_Q(obj) { return obj instanceof Symbol}

// lists
function _list() { return Array.prototype.slice.call(arguments, 0)}
function _list_Q(obj){ return Array.isArray(obj)}

// 区分类型
function _obj_type(obj) {
  if (_symbol_Q(obj)) { return 'symbol'}
  else if (_list_Q(obj)) { return 'list'}
  else {
    switch (typeof(obj)) {
      case 'number': return 'number'
      case 'function': return 'function'
      case 'string': return 'string'
      default: throw new Error("Unknown type '" + typeof(obj) + "'")
    }
  }
}
exports._symbol = types._symbol = _symbol;
exports._symbol_Q = types._symbol_Q = _symbol_Q;
exports._obj_type = types._obj_type = _obj_type;
exports._list = types._list = _list;
exports._list_Q = types._list_Q = _list_Q;

