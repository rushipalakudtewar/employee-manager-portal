const express=require('express');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())
const employeeRoute = require('./routes/employeeRoute')
const departmentRoute = require('./routes/departmentRoute')
const assigndeptRoute = require('./routes/assigndeptRoute')
const dotenv= require('dotenv')

dotenv.config();
const connectDatabase = require('./db/database')
connectDatabase()


app.use("/api/v1/",employeeRoute)
app.use("/api/v1",departmentRoute)
app.use("/api/v1",assigndeptRoute)


const port = process.env.PORT || 8181
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})