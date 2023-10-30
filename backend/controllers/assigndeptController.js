const AssignedDept = require('../models/assigndeptModel')
const {dynamicLookupMiddleware} = require('../middleware/tablejoin')

const lookupOptions1 = {
    fromCollection: "departments", 
    localField: "departmentId", 
    foreignField: "_id", 
    as: "departmentData",
  };
  
  
const lookupOptions2 = {
    fromCollection: "employees", 
    localField: "employeeId", 
    foreignField: "_id", 
    as: "employeeData",
  };

  const lookupOptions3 = {
    fromCollection: "employees", 
    localField: "managerId", 
    foreignField: "_id", 
    as: "managerData",
  };

  exports.getAllAssignedDepartment = async (req, res) => {
    try {
      const lookupOptionsArray = [lookupOptions1, lookupOptions2,lookupOptions3];
  
      const assignedWithLookups = await dynamicLookupMiddleware(AssignedDept, lookupOptionsArray)(req, res);
  
      res.status(200).json({ assigned: assignedWithLookups });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  };
  



exports.createAssignedDepartment = async(req,res)=>{
    try{
        const {departmentId, employeeId, managerId} = req.body;
        const assigned = new AssignedDept({
            departmentId, employeeId, managerId
        })
        await assigned.save();
        res.status(201).json({assigned})
    }
    catch(err)
    {
        return res.status(400).json({
            error : err
        })
    }
}