import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASEURL } from '../../BaseUrl';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


const Empdetails = () => {
  const [details,setDetails] = useState({})
  const navigate = useNavigate();
  useEffect(()=>{
    fetchEmpDetails()
    getAssignedDepartment()
  },[])

  const fetchEmpDetails = async() => {
    const empid=localStorage.getItem('employee')
    try {
      const response = await axios.get(`${BASEURL}/employeedetails/${empid}`)
      .then((response)=>{
       setDetails(response.data.user)
      })
    } catch (error) {
      toast.error('Login error:', error.response.data);
    }
   
  };
  
  const getAssignedDepartment = async()=> {
    const empid=localStorage.getItem('employee')
    await axios.get(`${BASEURL}/getallassigndepartment`)
    .then((response) => {
      console.log(response.data.assigned);
      // setDepartment(response.data.assigned);
    })
    .catch((error) => {
      toast.error('Login error:', error.response.data);
    });
  }
  
  function logout()
  {
    localStorage.removeItem('employee')
    localStorage.removeItem('token')
    navigate("/")
  }
  

  return (
    <>
    <button onClick={logout} className='bg-red-400 text-slate-100 rounded-md transition float-right mr-5 hover:bg-red-600 px-6 py-1'>Logout</button>
    <div className='flex justify-between items-center m-3 p-5'>
      <div>
        <h1 className='text-5xl font-semibold'>Employee Details</h1>
        <div className='mt-5'>
        <p className='text-2xl py-3'>FirstName:<span className='ml-5'>{details.firstName}</span></p>
        <p className='text-2xl py-3'>LastName:<span className='ml-5'>{details.lastName}</span></p>
        <p className='text-2xl py-3'>Email:<span className='ml-5'>{details.email}</span></p>
        <p className='text-2xl py-3'>Gender:<span className='ml-5'>{details.gender}</span></p>
        <p className='text-2xl py-3'>Hobbies:<span className='ml-5'>{details.hobbies.join(', ')}</span></p>
        <p className='text-2xl py-3'>Role:<span className='ml-5'>{details.role}</span></p>
        </div>        
      </div>
      <div>
        {/* <h1 className='text-2xl'>Assigned Department</h1> */}
        <button className='bg-blue-500 text-slate-50 rounded-md px-6 py-1  hover:bg-blue-700' onClick={getAssignedDepartment}>Assigned Department</button>
      </div>
    </div>
    </>
  )
}

export default Empdetails