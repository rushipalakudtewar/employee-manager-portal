const express =require('express');
const router = express.Router()

const {createDepartment,getAllDepartment,updateDepartment,deleteDepartment}=require('../controllers/departmentController')

router.post('/createdepartment',createDepartment)
router.get('/getalldepartment',getAllDepartment)
router.put('/updatedepartment/:id',updateDepartment)
router.delete('/deletedepartment/:id',deleteDepartment)


module.exports = router;