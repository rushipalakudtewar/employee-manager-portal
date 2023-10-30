const mongoose = require('mongoose')


const assigndeptSchema = new mongoose.Schema({
    
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department'
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    
})

module.exports = mongoose.model('AssignedDept',assigndeptSchema)