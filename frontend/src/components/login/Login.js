import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

import {BASEURL} from "../../BaseUrl"

const Login = () => {
  const navigate = useNavigate()


  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
  
    try {
      const response = await axios.post(`${BASEURL}/login`, values)
      .then((response)=>{
        toast.success("Login successfully")
        console.log(response.data);
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
      toast.error('Login error:', error.response.data);
    }
    setSubmitting(false);
  };
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-12 rounded shadow-md">
        <h2 className="text-3xl mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
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
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-6 rounded hover:bg-blue-600"
              >
                Login
              </button>
              <p>
                If you are new to this site, please{' '}
                <a href="/signup" className="underline text-blue-500">
                  Register
                </a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
