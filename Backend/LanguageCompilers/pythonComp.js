const compiler = require('compilex')
const options = {stats :true }
compiler.init(options)

 compilePython = async(code,input) =>{
    const envData = {os:"windows"}
    let op= '';
    const output1 = await  compiler.compilePythonWithInput(envData,code,input, function(data){
        if(data.err){
            console.log(err)
            return err
        } else{
            console.log(typeof(data))
            console.log(data.output)
            const {output} = data
            // console.log(output)
            op = output
            console.log(op)

            return output
        }
    })
    // return op;

}
const cppCompiler = (code,input)=>{
    const envData = {os : "windows",cmd : "g++"}
    compiler.compileCPPWithInput(envData, code, input, (data)=>{
        // if(error){
        //     console.log(error)
        // }
        // console.log("D&  "+data)
        // return data
        if(data.err){
            return err
        } else{
            return data
        }

    })

}
module.exports = {compilePython, cppCompiler}