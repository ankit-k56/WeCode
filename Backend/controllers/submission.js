// const cppCompiler = require('../LanguageCompilers/cppComp')
const fs = require('fs')
const path = require('path')
const compiler = require('compilex')
const options = {stats :true }

compiler.init(options)
// const {compilePython, cppCompiler} = require('../LanguageCompilers/pythonComp')
const SubmitQuestion = async(req,res) =>{
    const Qid = req.params.Qid

    const {Uid, code , input, lang} = req.body

    if(!Uid){
        res.status(400).send("User Id is not provided")
    }
    // let output = await  compilePython(code,input)
    if (lang==='python'){
        const envData = {os:"windows"}
        compiler.compilePythonWithInput(envData,code,input, function(data){
            if(data.err){
                console.log(err)
                res.status(401).json({error:err})
            } else{
                const {output} = data
                console.log(data)
                res.status(200).json({output})   
            }
        })
    } else if(lang==='C++'||lang ==="C"){
        const envData = {os : "windows",cmd : "g++"}
        compiler.compileCPPWithInput(envData, code, input, (data)=>{
        if(data.err){
            res.stats(401).json({error:err})
        } else{
            const {output} = data
            res.ststus(200).json({output})
        }
    })
    }
    // const tempPath = './temp'
    // fs.readdir(tempPath,(err, files)=>{
    //     if (err) throw err ;
    //     for( let i = 0; i<files.length ;i++){
    //         const filePath = path.join(tempPath , files[i])
    //         // console.log(filePath)
    //         fs.unlink(filePath, (err)=>{
    //             if (err) throw err;
    //             // console.log('File deleted')
    //         })
    //     }

    // })
    // console.log('Hi4');

}

module.exports = {SubmitQuestion}
