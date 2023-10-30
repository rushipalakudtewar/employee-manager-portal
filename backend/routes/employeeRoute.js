const express = require('express');
const {dummyroute,signup,login,getEmployeeDetails,getAllEmployeeDetails} =require('../controllers/employeeController')
const router = express.Router()

router.get("/dummyroute",dummyroute)

router.post("/signup",signup)
router.post("/login",login)

router.get("/employeedetails/:id",getEmployeeDetails)
router.get("/allemployeedetails",getAllEmployeeDetails)


module.exports = router