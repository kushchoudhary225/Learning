import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { userSchema } from '../../Schema'
import { setAllUser, setShowModal } from '../../slices/empSlices';
import './test.scss'

import topology from '../../assets/topology.png'
import round from '../../assets/Ellipse2.png'

import { useFormik } from 'formik'
import './test.scss'
import { createUser, fetchData } from '../../API/collection';
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

  const { values, errors,  handleBlur, handleChange, handleSubmit,touched, setValues } = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm }) => {
      try {

        dispatch(createUser(values));
        dispatch(fetchData())
        values.name = '',
        values.designation = '',
        values.email = '',
        values.password = '',
        values.doj = '',
        values.department = ''
      } catch (error) {
        dispatch(setShowModal(error.message))
      }
    }
  })
  const [err, setErr] = useState('')
  useEffect(()=> {
    if(touched.password || touched.name || touched.designation || touched.doj || touched.department || touched.email) {
      const errArr = Object.values(errors);
      console.log({errors})
      setErr(errArr.length > 0 ? errArr[0] : '')
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
  
                <input
                 type="text"
                  onChange={handleChange}  
                  name='name'
                  onBlur = {handleBlur}
                  value={values.name}
                  placeholder='Full Name*' />
              </div>

              <div className='test_input_parent'>
                <input type="text"
                value={values.designation}
                onBlur = {handleBlur}
                  onChange={handleChange}  name='designation' 
                  placeholder='Enter Designation*' />
                
              </div>


              <div className='test_input_parent'>
              
                <input
                  type="email" name='email'
                  value={values.email}
                  onChange={handleChange}  
                  onBlur = {handleBlur}
                  placeholder='Work Email*' />
                
              </div>



              <div className='test_input_parent'>
                <input type="password"
                 onChange={handleChange}
                 value={values.password}
                 onBlur = {handleBlur}
                   name='password'  placeholder='Enter Password*' />
              </div>


              <div className='test_input_parent'>
            
                <input type="date" 
                 onBlur = {handleBlur}
                onChange={handleChange}  value={values.date}  name='doj'  placeholder='*' />
               
              </div>


              <div className='test_input_parent'>

                <select name="department" id='department'  onBlur = {handleBlur} value={values.department} onChange={handleChange} >
                  <option value="">Select Department</option>
                  <option value="hr">HR</option>
                  <option value="technical">Technical</option>
                  <option value="technical+hr">Technical+HT</option>
                  <option value="operation">operation  </option>
                  <option value="account">account</option>
                </select>
               
              </div>

              <div
                className='cursor-pointer test_btn '
              >
                <button type='submit' disabled= {errors.length === 0} className='update_btn'>Create</button>
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