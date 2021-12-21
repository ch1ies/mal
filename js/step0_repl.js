// 实现一个 REPL 的终端系统,读取求值，循环打印（READ-EVAL-PRINT-LOOP）
const readLine = require('readline')
const rl = readLine.createInterface({ 
  input: process.stdin,
  output: process.stdout,
  prompt: "user> "
})

function READ() {
  rl.prompt();
  rl.on('line', (line) => {
    EVAL(line)
    rl.prompt();
  }).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
  });
}
function EVAL(line) {
  PRINT(line)
}
function PRINT(line) {
  console.log('answer: ', line)
}
function rep() {
  READ()
}
rep()