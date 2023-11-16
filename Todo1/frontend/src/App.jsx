import './App.css'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AllUserList from './components/allUserList/AllUserList'
import ActiveUser from './components/activeUser/ActiveUser'
import CreateUser from './components/createuser/CreateUser'
import UpdateUser from './components/update/UpdateUser'


function App() {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path='/getallusers' element={<AllUserList/>}/>  
        <Route path='/activeusers' element={<ActiveUser/>}/>  
        <Route path='/newuser' element={<CreateUser/>}/>  
        <Route path='/updateuser/:id' element={<UpdateUser/>}/>  
      </Routes>      
    </>
  )
}

export default App
