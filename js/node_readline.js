// 使用c++ 原生模块，同步方式读取命令行，而不是用异步
var RL_LIB = "libreadline"

// 引入 c++ 动态链接库
var ffi = require("ffi-napi")

// 模块命名空间
var rlwrap = {}
var rllib = ffi.Library(RL_LIB, {
  'readline': ['string', [ 'string' ] ]
})

exports.readline = rlwrap.readline = function(prompt) {
  prompt = prompt || "user>"

  var line = rllib.readline(prompt)
  console.log(rllib.readline, 'readline')
  return line
}