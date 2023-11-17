import { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AllUserList from './components/allUserList/AllUserList'
import ActiveUser from './components/activeUser/ActiveUser'
import CreateUser from './components/createuser/CreateUser'
import UpdateUser from './components/update/UpdateUser'
import Home from './components/home/Home'
import { getOnlyActiveUser, setAllUser } from './slices/empSlices'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import './App.scss'

function App() {
  const dispatch = useDispatch();
  const emps = useSelector(state => state.emps);
  const BASE_URL = useSelector(state => state.BASE_URL);
  const fetchDataFromAPI = async () =>{
    const {data} = await axios.get(`${BASE_URL}/user/getuser`)
    dispatch(setAllUser(data?.alluser))
    dispatch(getOnlyActiveUser())
    // dispatch(setAllUser(data?.alluser));
  }
  useEffect(()=> {
      fetchDataFromAPI();
  },[])
  return (
    <>

      <Navbar />
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/getallusers' element={<AllUserList/>}/>  
        <Route path='/activeusers' element={<ActiveUser/>}/>  
        <Route path='/newuser' element={<CreateUser/>}/>  
        <Route path='/updateuser/:empid' element={<UpdateUser/>}/>  
      </Routes>      
    </>
  )
}

export default App
