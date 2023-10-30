import {Routes,Route,Outlet,useNavigate, Link, Navigate} from 'react-router-dom'
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Empdetails from './components/empdetails/Empdetails';
import ManagerDashboard from './components/manager-dashboard/ManagerDashboard';
import ManagerAssign from './components/manager-dashboard/ManagerAssign';


const PrivateRoute = () => {
  
    const empId = localStorage.getItem('employee');
    const managerId = localStorage.getItem('manager');
    
    const auth = !!empId || !!managerId; 

  return auth ? <Outlet /> : <Navigate to="/" />;
}



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route exact path='/' element={<PrivateRoute/>}>
        <Route path="/getempdata" element={<Empdetails />} />
        <Route path="/managerdashboard" element={<ManagerDashboard />} />
        <Route path="/assigndept" element={<ManagerAssign />} />
      </Route>
      

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
