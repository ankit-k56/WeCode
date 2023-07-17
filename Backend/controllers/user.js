const {USERS} = require('../db/data')
const pool = require('../db/postgrase')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const login = async(req,res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.send(400).send("Please send all data")        
    }
         
    // await pool.connect();

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);

    if(user.rows.length === 0){
        return res.status(400).send("User does not exist");
    }
   
    //comparing password
    const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].user_password)

    if( !isPasswordCorrect){
        return res.status(401).send("Well tried kid");
    }
    //Generating token
    const token = jwt.sign({u_id: user.rows[0].u_id, user_email:user.rows[0].user_email},process.env.JWT_SECRET, {expiresIn:'30d'} )

    res.status(200).json({token,user: user.rows[0]})    
}
const signup = async(req,res)=>{
    const {name, email,password} = req.body;
    if(!email || !password || !name){
        res.status(400).send("Please send all data")
        return
    }
    
    //Db logic
    const user = await pool.query("SELECT * from users WHERE user_email = $1", [email])
    if( user.rows.length> 0){
        return res.status(400).send("User already exist");
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = await pool.query(
        "INSERT INTO users(user_name,user_email,user_password) VALUES($1, $2, $3) RETURNING *",[
            name,email,hashedPassword
        ]
    )

    //Generating token
    const token = jwt.sign({u_id: user.rows[0].u_id, user_email:user.rows[0].user_email},process.env.JWT_SECRET,{expiresIn: '30d'})

    res.status(200).json({token,user: newUser.rows[0]})
}
module.exports = {login, signup}