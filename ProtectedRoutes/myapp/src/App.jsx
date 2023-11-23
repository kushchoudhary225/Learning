import "./App.css";
import {Routes, Route, Link} from 'react-router-dom'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'
import Logout from './Logout.jsx'
import Profile from './Profile.jsx'
import {useSelector, useDispatch} from 'react-redux'
import './App.css'
import Home from "./Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";


const Header = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/admin/dashboard">Dashboard</Link>
    <Link to="/login">Login</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/logout">Logout</Link>
  </nav>
);

function App() {

  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch()
  return (
    <>
           <Header/>
           <Routes >
            <Route path='/' element={<Home/>} />
                  <Route path='/login' element={<Login/>} />
              <Route element={<ProtectedRoute isLogin={isLogin} />}>
                  <Route path='/admin/dashboard' element={<Dashboard/>} />
                  <Route path='/logout' element={<Logout/>} />
                  <Route path='/profile' element={<Profile/>} />
              </Route>
           </Routes>

    </>
  )
}

export default App
