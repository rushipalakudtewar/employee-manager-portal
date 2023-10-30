const Employee = require('../models/employeeModel')
const jwt  = require('jsonwebtoken')


exports.dummyroute = (req,res) => {
    res.send("hello its pringint");
}

exports.signup = async(req,res) =>{
    const {firstName, lastName,email, password, gender, hobbies,role} = req.body;
    try{
        const user = await Employee.create({
            firstName,lastName,email,password, gender,hobbies,role
        })
        const token = jwt.sign({ userId: user._id, email: user.email }, `${process.env.SECRET_TOKEN}`, {
            expiresIn: '1h'
          });
        res.status(201).json({user,token})
    }
    catch (err) {
        res.status(500).json({ err: 'Internal server error otherwise missing the parameters' });
      }

}


exports.login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await Employee.findOne({ email,password })
        if (!user) {
          return res.status(401).json("Invalid Email and Password");
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, `${process.env.SECRET_TOKEN}`, {
          expiresIn: '1h', 
        });
      
        res.json({ user,token });
    }
    catch(err)
    {
        res.status(500).json({ error: err })
    }
  };
  


  exports.getEmployeeDetails = async(req,res)=>{
    try{
        const user = await Employee.findById(req.params.id)
        res.status(200).json({user})
    }
    catch(err)
    {
        res.status(500).json({ err: 'Internal server error otherwise missing the parameters' });
    }
  }

  exports.getAllEmployeeDetails = async(req,res)=>{
    try{
        const user = await Employee.find()
        res.status(200).json({user})
    }
    catch(err)
    {
        res.status(500).json({ err: 'Internal server error otherwise missing the parameters' });
    }
  }