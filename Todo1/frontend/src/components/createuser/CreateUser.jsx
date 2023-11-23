import React, { useState } from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setAllUser, setShowModal} from '../../slices/empSlices';
import './createuser.scss';
const CreateUser = () => {
    const BASE_URL = useSelector(state => state.BASE_URL);
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name : '',
        designation: '',
        email: '',
        password: '',
        doj : '',
        department : 'hr'
    });
    console.log(input)
    const inputHanlder = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const submitHanlder = async (e) => {
      try {
          e.preventDefault();
          if( input.name === '' ||
          input.designation === '' ||
          input.doj  === '' ||
          input.email  === '' ||
          input.password  === '' ||
          input.department  === '') {
            dispatch(setShowModal("All field are required"))
            return;
          }
          const {data} = await axios.post(`${BASE_URL}/user/new`,input)
          dispatch(setShowModal(data.msg));
          // let  res = await axios.get(`${BASE_URL}/user/getuser`)
          // res = res.data.alluser;
          // dispatch(setAllUser(res))
  
          const {token} = data;
          localStorage.setItem('token', token);
          setInput({
              name : '',
              designation: '',
              doj : '',
              email : '',
              password : '',
              department : 'hr'
          });
      } catch (error) {
        dispatch(setShowModal(data.msg));
      }
    }
    return (
        <>
        <div className='form-container'>
            <div className="form-wrapper">

            <form action="">
                <h1>Add New User</h1>
                <div className='row'>
                    <div className="col">
                        <input type="text" required name='name' onChange={(e)=> inputHanlder(e)} value={input.name} placeholder='Enter Name' />
                    </div>
                    <div className="col">
                        <input type="text"  required onChange={(e)=> inputHanlder(e)} name='designation' value={input.designation}  placeholder='Enter Designation' />
                    </div>
                </div>

                <div className='row'>
                    <div className="col">
                        <input required type="email" name='email' onChange={(e)=> inputHanlder(e)} value={input.email} placeholder='Enter e-mail' />
                    </div>
                    <div className="col">
                        <input type="password" onChange={(e)=> inputHanlder(e)} name='password' value={input.password}  placeholder='Enter password' />
                    </div>
                </div>

                <div className='row'>
                    <div className="col">
                        <input required type="date" onChange={(e)=> inputHanlder(e)} name='doj' value={input.doj}  placeholder='Date of Joining' />
                    </div>
                    <div className="col">
                        <select name="department"  defaultValue="hr" onChange={(e)=> inputHanlder(e)}>
                            {/* ['technical', 'hr', 'technical+hr', 'account', 'operation'], */}
                            <option value="hr">HR</option>
                            <option value="technical">Technical</option>
                            <option value="technical+hr">Technical+HT</option>
                            <option  value="operation">operation  </option>
                            <option value="account">account</option>
                        </select>
                        {/* <input type="text" onChange={(e)=> inputHanlder(e)} name='department' value={input.department}  placeholder='Enter Department' /> */}
                    </div>
                </div>
        
                <button className='cursor-pointer' onClick={(e)=> submitHanlder(e)}>submit</button>
            </form>
            </div>
        </div>
            
        </>
    )
}

export default CreateUser