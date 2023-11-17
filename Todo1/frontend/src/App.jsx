import './App.css'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AllUserList from './components/allUserList/AllUserList'
import ActiveUser from './components/activeUser/ActiveUser'
import CreateUser from './components/createuser/CreateUser'
import UpdateUser from './components/update/UpdateUser'
import Home from './components/home/Home'
import {fetchData} from './slices/empSlices.js'
import {useSelector, useDispatch} from 'react-redux';

function App() {
  const emps =  useSelector(state => state.emps)
  const dispatch = useDispatch()
  console.log(emps)
  return (
    <>
    {/* <button onClick={(e)=> dispatch(fetchData())}>click me</button> */}
      <Navbar />
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/getallusers' element={<AllUserList/>}/>  
        <Route path='/activeusers' element={<ActiveUser/>}/>  
        <Route path='/newuser' element={<CreateUser/>}/>  
        <Route path='/updateuser/:id' element={<UpdateUser/>}/>  
      </Routes>      
    </>
  )
}

export default App
