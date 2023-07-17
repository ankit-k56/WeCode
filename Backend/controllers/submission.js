const SubmitQuestion = (req,res) =>{
    const Qid = req.params.Qid
    console.log(Qid)
    const {Uid} = req.body
    if(!Uid){
        res.status(400).send("User Id is bot provided")
    }
    //Db Logic
    //Docker Logic
    res.status(200).send("Submitted")
}

module.exports = {SubmitQuestion}