const mongoose = require('mongoose')
const Department = require('../models/departmentModel')
const Employee = require('../models/employeeModel')

exports.createDepartment = async(req,res) =>{
        try
        {
            const {departmentName, categoryName, location, salary, employeeID} = req.body;
                const department = new Department({
                    departmentName, categoryName, location, salary, employeeID
                })
                await department.save()
                res.status(201).json({department})

        }    
        catch(err)
        {
            res.status(500).json({ err: 'Internal server error otherwise missing the parameters' });
        }
}

exports.getAllDepartment = async(req,res)=>{
    try{
        const departments = await Department.find()
        res.status(200).json({departments})
    }
    catch(err)
    {
        return res.status(400).json({
            error : err
        })
    }
}

exports.updateDepartment = async(req,res) =>{
    try{
        const {id} =req.params;
        const {departmentName, categoryName, location, salary, employeeID} = req.body
        const department = await Department.findByIdAndUpdate({_id:id},{
            departmentName, categoryName, location, salary, employeeID
        })
        res.status(200).json({
            success:true,
            updateddata : department
        })
    }
    catch(err)
    {
        return res.status(400).json({
            error : "Error while Fetching data "
        })
    }
}


exports.deleteDepartment = async(req,res) =>{
    try {
        const {id} = req.params;
        await Department.findByIdAndDelete(id);

        res.json({
            success: true,
            message : "Department deleted successfully"
        })
    }
    catch(err)
    {
        return res.status(400).json({
            error : "Error while Fetching data "
        })
    }   
}