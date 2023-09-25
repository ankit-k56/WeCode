// const cppCompiler = require('../LanguageCompilers/cppComp')
const pool = require('../db/postgrase')
const fs = require('fs')
const path = require('path')
const compiler = require('compilex')
const options = {stats :true }

compiler.init(options)
// const {compilePython, cppCompiler} = require('../LanguageCompilers/pythonComp')
const SubmitQuestion = async(req,res) =>{
    const Qid = req.params.Qid
    
    const question = await pool.query("SELECT * FROM questions where q_id=$1",[Qid] )
    const {Uid, code ,  lang} = req.body
    console.log(typeof(question.rows[0].test_cases))

    if(!Uid){
        res.status(400).send("User Id is not provided")
    }
    // let output = await  compilePython(code,input)
    if (lang==='python'){
        let flag = true;
         question.rows[0].test_cases.map(async(testCase)=>{
        const envData = {os:"windows"}
       
            await compiler.compilePythonWithInput(envData,code,testCase.input, function(data){
                if(data.err){
                    console.log(err)
                    res.status(401).json({error:err})
                } else{
                    const {output} = data
                    // console.log(data.output)
                    if (data.output==testCase.output) {
                        // res.status(401).send("test case failed")
                        flag = null;
                        console.log('hi')
                        
                    }
                    console.log(testCase.output)
                    console.log({output})
                    
                    // res.status(200).json({output})   
                }
            })

       
        })
        if(flag===true){

            res.status(200).send("All test cases passed")
        }else if(flag===false){
            res.status(201).send("test case failed")
        }
        
       
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
