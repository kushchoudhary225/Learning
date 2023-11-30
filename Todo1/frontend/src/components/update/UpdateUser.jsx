import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setIn, useFormik } from 'formik'
import './updateuser.scss'
import { singleUser, updateUser } from '../../API/collection';
import { setAllUser, getOnlyActiveUser, setShowModal } from '../../slices/empSlices';
import topology from '../../assets/topology.png'
import round from '../../assets/Ellipse2.png'
import { userSchema } from '../../Schema';


const UpdateUser = () => {


  let { empid } = useParams();

  const dispatch = useDispatch();
  const BASE_URL = useSelector(state => state.BASE_URL);
  const showModal = useSelector(state => state.showModal);
  const message = useSelector(state => state.message);
  const updateuser = useSelector(state => state.updateuser);
  const [err, setErr] = useState('')
  const [input, setInput] = useState(updateuser || {
    _id: '',
    empid: '',
    name: '',
    designation: '',
    email: '',
    password: '',
    doj: '',
    department: '', 
    status: false,
    isAdmin: false,
    __v: ''
  });
  
  const inputHanlder = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
    useEffect(() => {
      if(updateuser) {
        setInput(updateuser);
        console.log("calling out")
      }
    }, [updateuser?.name])
  useEffect(() => {
    dispatch(singleUser({empid}))
  }, [])

  const updateHanlder = async (e) => {
    e.preventDefault();
    try {
      if (input.name === '' ||
        input.designation === '' ||
        input.doj === '' ||
        input.email === '' ||
        input.department === '') {
        dispatch(setShowModal("All field are required"))
        return;
      }

      const valid = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(input.password);
      if (!valid) {
        dispatch(setShowModal("Choose a strong password"))
        return;
      }
      if(Array.isArray(input.department)) {
        input.department = input.department[0]
      }
      dispatch(updateUser(input));
    } catch (error) {
      dispatch(setShowModal(error.message));
    }
  }

  return (
    <>
      <div className='test_container'>
        <div className='test_wrapper'>
          <div className='test_left'>
            <h1 className='test_title'>Update User</h1>
            {
              err && <p>{err}</p>
            }
            <form>

              <div className='test_input_parent'>
                <input
                  type="text"
                  className='bg-white'
                  onChange={(e) => inputHanlder(e)}
                  value={input?.name}
                  name='name'
                  placeholder='Full Name*' />
              </div>

              <div className='test_input_parent'>
                <input
                  type="text"
                  className='bg-white'
                  onChange={(e) => inputHanlder(e)}
                  name='designation'
                  value={input?.designation}
                  placeholder='Enter Designation*' />
              </div>


              <div className='test_input_parent'>
                <input className='bg-white'
                  type="email" name='email' onChange={(e) => inputHanlder(e)} value={input?.email}
                  placeholder='Work Email*' />
              </div>


              <div className='test_input_parent'>
                <input className='bg-white' type="date" onChange={(e) => inputHanlder(e)} name='doj' value={input?.doj} placeholder='*' />
              </div>



              <div className='test_input_parent'>
                <select name="status" value={input?.status} onChange={(e) => inputHanlder(e)} >
                  <option value={true}>Active</option>
                  <option value={false}>Not Active</option>
                </select>
              </div>

              <div className='test_input_parent'>
                {/* <select name="department"  value={input?.department}  onChange={(e) => inputHanlder(e)}>
                <option  value={"hr"}>HR</option>
                <option  value={"technical"}>Technical</option>
                <option  value={"technical+hr"}>Technical+HT</option>
                <option  value={"operation"}>operation  </option>
                <option  value={"account"}>account</option>
              </select> */}

                <select name="department" value={input?.department} onChange={(e) => inputHanlder(e)}>
                  <option value="hr">HR</option>            
                  <option value="technical">Technical</option>
                  <option value="technical+hr">Technical+HT</option>
                  <option value="operation">operation  </option>
                  <option value="account">account</option>
                </select>
              </div>

              <div
                className='cursor-pointer test_btn' onClick={(e) => updateHanlder(e)}
              >
                <button className='update_btn'>Update</button>
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

export default UpdateUser