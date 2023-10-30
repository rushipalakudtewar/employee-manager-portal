import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../../BaseUrl';
import toast from 'react-hot-toast';

const ManagerAssign = () => {
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate()
//   const [location, setLocation] = useState(['Abd','Pune','Mumbai']);
  const [employee, setEmployee] = useState([]);
  const [manager,setManager] = useState([])

  const managerId = localStorage.getItem('manager')

  const initialValues = {
    department: '',
    employee:'',
    managerId:`${managerId}`

};


  useEffect(() => {

    axios
      .get(`${BASEURL}/getalldepartment`)
      .then((response) => {
        setDepartment(response.data.departments);
      })
      .catch((error) => {
        toast.error('Failed to fetch the data');
      });

    axios.get(`${BASEURL}/allemployeedetails`)
    .then((response)=>{
        setEmployee(response.data.user?.filter((item)=>item.role!=="Manager"))
    })
    .catch((err)=>{
        console.log(err.response.data);
    })


  }, []);

  const handleSubmit = async(values, { setSubmitting }) => {
    console.log(values);
    try
    {
        const res = await axios.post(`${BASEURL}/createassigndepartment`,{departmentId:values.department,managerId:values.managerId,employeeId:values.employee})
        .then((res)=>{
            toast.success("Assigned Successfully")
            navigate('/managerdashboard')
            
        })
    }
    catch(err)
    {
        toast.error("Please fill the fields")
    }   
    setSubmitting(false);
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-12 w-[50vw] rounded shadow-md">
        <h2 className="text-3xl mb-4">Assign The Department</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-4">
              <label htmlFor="department" className="block text-gray-600">
                Department Name
              </label>
              <Field as="select" id="department" name="department" className="w-full border rounded py-2 px-3">
                {department?.length > 0 &&
                  department?.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.departmentName}
                    </option>
                  ))}
              </Field>
            </div>

           
            <div className="mb-4">
              <label htmlFor="employee" className="block text-gray-600">
                Employee Name
              </label>
              <Field as="select" id="employee" name="employee" className="w-full border rounded py-2 px-3">
                {employee?.length > 0 &&
                  employee?.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.firstName}
                    </option>
                  ))}
              </Field>
            </div>

            <div className="text-center">
              <button type="submit" className="bg-green-500 text-white py-1 px-6 rounded hover:bg-green-600">
                Assign
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ManagerAssign;
