const pool = require('../db/postgrase')


const GetAllQuestion = async(req,res)=>{
    // res.status(200).json({QUESTIONS})
    const questions = await pool.query("SELECT * FROM questions");
    res.status(200).json({questions: questions.rows})
    
}

const PostQuestion = async(req, res) =>{
    const {  title ,description, testCases} = req.body
    if( !title || !description || !testCases){
        return res.status(401).send('Plese provide all fields')       
    }

    const newTest = JSON.stringify(testCases)

    const question = await  pool.query("INSERT INTO questions(title, description,test_cases) VALUES($1,$2,$3) RETURNING *",[title,description,newTest]);
    
    res.status(200).json({question: question.rows[0]});
}

const GetQuestion= async(req,res)=>{
    const id = parseInt(req.params.id);
    //Db logic
    const question = await pool.query("SELECT * FROM questions WHERE q_id = $1",[id])
    if(question.rows.length === 0) return res.status(400).sned(`No question found with id: ${id}`)
    res.status(200).json({question:question.rows[0]});
}
module.exports = {GetAllQuestion,PostQuestion,GetQuestion}

