import { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AllUserList from './components/allUserList/AllUserList'
import ActiveUser from './components/activeUser/ActiveUser'
import CreateUser from './components/createuser/CreateUser'
import UpdateUser from './components/update/UpdateUser'
import Login from './components/login/Login.jsx'
import Home from './components/home/Home'
import { getOnlyActiveUser, setAllUser, setAuthUser, setIsAdmin, setIsLogin } from './slices/empSlices'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import './App.scss'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute.jsx'
import Modal from './components/modal/Modal.jsx'
import Test from './components/test/Test.jsx'

function App() {
  const dispatch = useDispatch();
  const emps = useSelector(state => state.emps);
  const authUser = useSelector(state => state.authUser);
  const showModal = useSelector(state => state.showModal);
  const isAdmin = useSelector(state => state.isAdmin);
  const isLogin = useSelector(state => state.isLogin);
  const BASE_URL = useSelector(state => state.BASE_URL);
  
  const fetchDataFromAPI = async () =>{
    const {data} = await axios.get(`${BASE_URL}/user/getuser`)
    dispatch(setAllUser(data?.alluser))
    dispatch(getOnlyActiveUser())
  }

  useEffect(()=>{
    const token = localStorage.getItem('token') || ''
    if(token) {
      dispatch(setIsLogin(true));
      dispatch(setIsAdmin(true))
      fetchDataFromAPI()
    } else {
      dispatch(setIsLogin(false));
      dispatch(setIsAdmin(false))
    }
  },[])
  return (
    <>

    { showModal &&
     <Modal  />
   }

    { isLogin && <Navbar />}
      <Routes>
        <Route element={<ProtectedRoute isLogin={isLogin} isAdmin = {isAdmin}  />} >
            <Route path='/' element={<Login/>}/>  
            <Route path='/getallusers' element={<AllUserList/>}/>  
            <Route path='/activeusers' element={<ActiveUser/>}/>  
            <Route path='/newuser' element={<Test/>}/>  
            <Route path='/updateuser/:empid' element={<UpdateUser/>}/>  
        </Route>
            <Route path='/login' element={<Login/>}/>  
      </Routes>       
    </>
  )
}

export default App
