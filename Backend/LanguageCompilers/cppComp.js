const compiler = require('compilex')
const options = {stats: true}
compiler.init(options)
const cppCompiler = (code,input)=>{
    const envData = {os : "windows",cmd : "g++"}
    compiler.compileCPPWithInput(envData, code, input, (data)=>{
        return data
    })
}
// module.exports = {cppCompiler}
number = int(input(''))
print('The number you entered is:', number)