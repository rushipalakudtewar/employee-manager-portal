const mongoose = require('mongoose')

const db_url = process.env.DB_URL
const connectDatabase = ()=>{
    try{
        mongoose.connect(`${db_url}`,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then((data)=>{
            console.log(`Mongodb connected sucessfully ${data.connection.host}`);
        })
    }   
    catch(err)
    {
        console.log("Failed to connect the database");
    }

}

module.exports = connectDatabase