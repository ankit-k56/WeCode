const {Pool} = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "ankit123",
    database: "wecode",
    port : 5432,
});

// module.exports = {
//     query: (text, params) => pool.query(text, params),
//   };
module.exports = pool