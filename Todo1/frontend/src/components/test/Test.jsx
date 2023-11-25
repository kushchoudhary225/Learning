import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { userSchema } from '../../Schema'
import { setAllUser, setShowModal } from '../../slices/empSlices'; import './test.scss'

import topology from '../../assets/topology.png'
import round from '../../assets/Ellipse2.png'

import { useFormik,Field } from 'formik'
import './test.scss'
const Test = () => {
  const BASE_URL = useSelector(state => state.BASE_URL);
  const message = useSelector(state => state.message);
  const dispatch = useDispatch();
  const initialValues = {

    name: '',
    designation: '',
    email: '',
    password: '',
    doj: '',
    department: ''

  }

  const inputHanlder = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/user/new`, values)
        if (!data.success) {
          dispatch(setShowModal(data.msg))
          return;
        }
        dispatch(setShowModal(data.msg));
        const { token } = data;
        localStorage.setItem('token', token);
        setInput({
          name: '',
          designation: '',
          doj: '',
          email: '',
          password: '',
          department: 'hr'
        });
      } catch (error) {
        dispatch(setShowModal(error.message))
      }
    }
  })
  const [err, setErr] = useState('')
  useEffect(()=> {
    console.log(errors?.department)
    if(!errors?.department) {
      const arr = Object.values(errors);
      setErr(arr.length >= 1 ? arr[0] : '')
      console.log({arr})
    }
  }, [errors])
  return (
    <>
      
      <div className='test_container'>
        <div className='test_wrapper'>
          <div className='test_left'>
            <h1 className='test_title'>Create Account</h1>
            {
               err && <div className='err_parent'>
        <p className='errorclass test_input_paraent'>{err}</p>
              </div>
      }
            <form onSubmit={handleSubmit}>
              <div className='test_input_parent'>
  
                <input type="text"
                  onChange={handleChange}  
                  name='name'
                  value={values.name}
                  placeholder='Full Name*' />
              </div>

              <div className='test_input_parent'>
                <input type="text"
                value={values.designation}
                  onChange={handleChange}  name='designation' 
                  placeholder='Enter Designation*' />
                
              </div>


              <div className='test_input_parent'>
              
                <input
                  type="email" name='email'
                  value={values.email}
                  onChange={handleChange}  
                  placeholder='Work Email*' />
                
              </div>



              <div className='test_input_parent'>
             
                <input type="password"
                 onChange={handleChange}
                 value={values.password}
                   name='password'  placeholder='Password*' />
              </div>


              <div className='test_input_parent'>
            
                <input type="date" 
                
                onChange={handleChange} value={values.date}  name='doj'  placeholder='*' />
               
              </div>


              <div className='test_input_parent'>
              
              <Field name="color" as="select">

<option value="red">Red</option>

<option value="green">Green</option>

<option value="blue">Blue</option>

</Field>

                {/* <select name="department" value={values.dep} onChange={handleChange} >
                  <option value="hr">HR</option>
                  <option value="technical">Technical</option>
                  <option value="technical+hr">Technical+HT</option>
                  <option value="operation">operation  </option>
                  <option value="account">account</option>
                </select> */}
               
              </div>

              <div
                className='cursor-pointer test_btn '
              >
                <button className='update_btn'>Create</button>
              </div>
            </form>
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