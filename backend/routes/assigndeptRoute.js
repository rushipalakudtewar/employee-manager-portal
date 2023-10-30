const express = require('express');
const {getAllAssignedDepartment,createAssignedDepartment,} =require('../controllers/assigndeptController')
const router = express.Router()

router.post("/createassigndepartment",createAssignedDepartment)
router.get("/getallassigndepartment",getAllAssignedDepartment)

module.exports = router