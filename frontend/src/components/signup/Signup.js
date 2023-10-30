import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from "axios";
import {BASEURL} from "../../BaseUrl"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'



const Signup = () => {
  const navigate = useNavigate()
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: 'Male',
    role: 'Employee',
    hobbies: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password at least 8 characters')
      .max(20, 'Password less than 20 characters'),
    gender: Yup.string().required('Gender is required'),
    role: Yup.string().required('Role is required'),
    hobbies: Yup.string(),
  });

  const handleSubmit = async(values, { setSubmitting }) => {
    
    try {
      const response = await axios.post(`${BASEURL}/signup`, values)
      .then((response)=>{
        toast.success("Registered successfully")
        localStorage.setItem('token', response.data.token);
        if(response.data.user.role === "Manager")
        {
          navigate('/managerdashboard')
          localStorage.setItem('manager', response.data.user._id);
        }
        else
        {
          navigate('/getempdata')
          localStorage.setItem('employee', response.data.user._id);
        }
      })
      

    } catch (error) {
      toast.error('Error:', error.response.data);
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-12 w-[50vw] rounded shadow-md">
        <h2 className="text-3xl mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-600">
                  FirstName
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full border rounded py-2 px-3"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-600">
                  LastName
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full border rounded py-2 px-3"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border rounded py-2 px-3"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border rounded py-2 px-3"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-600">
                  Gender
                </label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="w-full border rounded py-2 px-3"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-600">
                  Role
                </label>
                <Field
                  as="select"
                  id="role"
                  name="role"
                  className="w-full border rounded py-2 px-3 "
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="hobbies" className="block text-gray-600">
                  Hobbies
                </label>
                <Field
                  type="text"
                  id="hobbies"
                  name="hobbies"
                  className="w-full border rounded py-2 px-3"
                />
                <ErrorMessage name="hobbies" component="div" className="text-red-500" />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-1 px-6 rounded hover:bg-green-600"
              >
                Sign Up
              </button>
              <p>
                Already have an account?{' '}
                <Link to="/" className="underline text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
