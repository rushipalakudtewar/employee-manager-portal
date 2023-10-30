import React from 'react'
import {useState,useEffect} from "react"
import { BASEURL } from '../../BaseUrl';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';


const ManagerDashboard = () => {
  const [data, setData] = useState([]);
  const [department,setDepartment] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [newItem, setNewItem] = useState({
  //   fullname: "",
  //   email: "",
  //   country: "",
  //   state: "",
  //   city: "",
  //   languages: "",
  // });
  const [editingItem, setEditingItem] = useState(null);
  const [page, setPage] = useState(0);
  const [updatedItem, setUpdatedItem] = useState({});
  const navigate = useNavigate()
  

  useEffect(()=>{
    axios
    .get(`${BASEURL}/getallassigndepartment`)
    .then((response) => {
      // console.log(response.data.assigned);
      setDepartment(response.data.assigned);
    })
    .catch((error) => {
      toast.error('Failed to fetch the data');
    });
},[])
  const handleDeleteItem = () =>{

  }

  const handleUpdateItem = () =>{

  }
  const handleEditItem = () =>{

  }
  function logout()
  {
    localStorage.removeItem('manager')
    localStorage.removeItem('token')
    navigate("/")
  }
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  
  const assignTask = () =>{
    navigate("/assigndept")
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };
  


  return (
    <div className='m-14'>
          <button onClick={logout} className='bg-red-400 text-slate-100 rounded-md transition float-right mr-5 hover:bg-red-600 px-6 py-1'>Logout</button>
          <button onClick={assignTask} className='bg-blue-400 text-slate-100 rounded-md transition float-right mr-5 hover:bg-blue-600 px-6 py-1'>Assign Department</button>

      <h1 className='text-3xl font-bold'>Manager Dashboard</h1>
      <div className='m-10'>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>EmployeeID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {department.slice(startIndex, endIndex).map((item,itemIndex) => (
                <TableRow key={item._id}>
                  <TableCell>{startIndex + itemIndex + 1}</TableCell>
                  <TableCell style={{ textTransform: 'capitalize' }}>
                      {item.departmentData[0].departmentName}
                    </TableCell>

                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {item.departmentData[0].categoryName}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {item.departmentData[0].location}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {item.departmentData[0].salary}
                    </TableCell>

                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {item.employeeData[0].firstName}
                    </TableCell>
                    

                  <TableCell>
                    {editingItem === item._id ? (
                      <Button variant="contained" color="primary" onClick={() => handleUpdateItem(item)}>
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button variant="contained" color="primary" style={{marginRight:"5px"}} onClick={() => handleEditItem(item)}>
                          Edit
                        </Button>
                        
                        <Button variant="contained" color="secondary" onClick={() => handleDeleteItem(item._id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={department.length} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        
      </div>
    </div>
  )
}

export default ManagerDashboard