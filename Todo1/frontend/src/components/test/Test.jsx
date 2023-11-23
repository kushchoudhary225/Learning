import React, { useState } from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setAllUser, setShowModal} from '../../slices/empSlices';import './test.scss'
import  topology from '../../assets/topology.png'
import  round from '../../assets/Ellipse2.png'
import './test.scss'
const Test = () => {
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
      <div className='test_container'>
        <div className='test_wrapper'>
          <div className='test_left'>
            <h1 className='test_title'>Create Account</h1>
            <div className='test_input_parent'>
              <input type="text" 
              onChange={(e)=> inputHanlder(e)} value={input.name} 
              name='name'
              placeholder='Full Name*' />
            </div>

            <div className='test_input_parent'>
              <input type="text" 
              onChange={(e)=> inputHanlder(e)} name='designation' value={input.designation} 
              placeholder='Enter Designation*' />
            </div>


            <div className='test_input_parent'>
              <input
               type="email" name='email' onChange={(e)=> inputHanlder(e)} value={input.email} 
               placeholder='Work Email*' />
            </div>



            <div className='test_input_parent'>
              <input type="password" onChange={(e)=> inputHanlder(e)} name='password' value={input.password}  placeholder='Password*' />
            </div>


            <div className='test_input_parent'>
              <input type="date" onChange={(e)=> inputHanlder(e)} name='doj' value={input.doj}placeholder='*' />
            </div>


            <div className='test_input_parent'>
            <select name="department"  defaultValue="hr" onChange={(e)=> inputHanlder(e)}>
                <option value="hr">HR</option>
                <option value="technical">Technical</option>
                <option value="technical+hr">Technical+HT</option>
                <option value="operation">operation  </option>
                <option value="account">account</option>
              </select>
            </div>

            <div 
            className='cursor-pointer test_btn' onClick={(e)=> submitHanlder(e)}
            >
              <button>Create</button>
            </div>
          </div>

          <div className='test_right'>
            <div className='topology_container'>

            <img className='topology' src={topology} alt="" />
            </div>
            <img className='round1' src={round} alt="" />
            <img className='round2' src={round} alt="" />
            <img className='round3' src={round} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Test