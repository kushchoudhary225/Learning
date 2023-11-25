// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import {useDispatch, useSelector} from 'react-redux'
// import axios from 'axios'
// import './updateuser.scss'
// import { setAllUser, getOnlyActiveUser, setShowModal } from '../../slices/empSlices';


// const UpdateUser = () => {
//     let { empid } = useParams();
//     const dispatch = useDispatch();
//     const BASE_URL = useSelector(state => state.BASE_URL);
//     const showModal = useSelector(state => state.showModal);
//     const message = useSelector(state => state.message);

//     const [input, setInput] = useState({});
//     const getdata = async () => {
//         const {data} = await axios.post(`${BASE_URL}/user/getone`, {empid})
//         setInput({...data.user});
//     }
//     useEffect(()=>{
//         getdata();
//     },[])

//     // console.log(input)

//     const inputHanlder = (e) => {
//         setInput({...input, [e.target.name]: e.target.value})
//     }
//     const updateHanlder = async (e) => {
//         e.preventDefault();
//         const {data} = await axios.post(`${BASE_URL}/user/update`, input)
//         if(!data.success) {
//             dispatch(setShowModal(data.msg))
//             return;
//         }
//         dispatch(setShowModal("User Updated successfully..."))
       
//         const res = await axios.get(`${BASE_URL}/user/getuser`)
//         dispatch(setAllUser(res.data.alluser))
//         dispatch(getOnlyActiveUser())
//     }
//     return (
//         <>
//         <div className='form-container'>
//             <div className="form-wrapper">

//             <form action="">
//                 <h1>Complete the Form</h1>
//                 <div className='row'>
//                     <div className="col">
//                         <input type="text" id='name' name='name' onChange={(e)=> inputHanlder(e)} value={input.name} placeholder='Enter Name' />
//                     </div>
//                     <div className="col">
//                         <input type="text" onChange={(e)=> inputHanlder(e)} name='designation' value={input.designation}  placeholder='Enter Designation' />
//                     </div>
//                 </div>

//                 <div className='row'>
//                     <div className="col">
//                         <input type="text" onChange={(e)=> inputHanlder(e)} name='doj' value={input.doj}  placeholder='Date of Joining' />
//                     </div>
//                     <div className="col">
//                         {
//                             <select name="department" value={input?.department} onChange={(e)=> inputHanlder(e)}>
//                             <option  value="hr">HR</option>
//                             <option  value="technical">Technical</option>
//                             <option  value="technical+hr">Technical+HT</option>
//                             <option   value="operation">operation  </option>
//                             <option  value="account">account</option>
//                         </select>
//                         }
//                     </div>
//                 </div>
//                 <div className='row'>
//                     <div className="col">
//                         <label htmlFor="status" style={{color:'white'}}>Current Status</label>
//                         {/* { input?.status ?  
//                         <select name="status" id='status' value="true" onChange={(e)=> inputHanlder(e)}>
//                             <option  value={true}>Active 1</option>
//                             <option  value={false}>Not Active 1</option>
//                         </select> : 
//                         <select name="status" id='status'  value="false" onChange={(e)=> inputHanlder(e)}>
//                             <option  value={false} >Not Active 2</option>
//                             <option  value= {true}>Active 1</option>
//                         </select>
//                         } */}
//                         {
//                             <select name="status" value={input?.status} onChange={(e)=> inputHanlder(e)}>
//                             <option value={true}>Active</option>
//                             <option value={false}>Not Active</option>
//                         </select>
//                         }
//                         {/* <input type="text" onChange={(e)=> inputHanlder(e)} name='doj' value={input.status}  placeholder='Date of Joining' /> */}
//                     </div>
//                 </div>
        
//                 <button onClick={(e)=> updateHanlder(e)}>Update</button>
//             </form>
//             </div>
//         </div>
            
//         </>
//     )
// }

// export default UpdateUser




















import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import './updateuser.scss'
import { setAllUser, getOnlyActiveUser, setShowModal } from '../../slices/empSlices';
import  topology from '../../assets/topology.png'
import  round from '../../assets/Ellipse2.png'


const UpdateUser = () => {
    let { empid } = useParams();
    const dispatch = useDispatch();
    const BASE_URL = useSelector(state => state.BASE_URL);
    const showModal = useSelector(state => state.showModal);
    const message = useSelector(state => state.message);

    const [input, setInput] = useState({});
    const getdata = async () => {
        const {data} = await axios.post(`${BASE_URL}/user/getone`, {empid})
        setInput({...data.user});
    }
    useEffect(()=>{
        getdata();
    },[])

    // console.log(input)

    const inputHanlder = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const updateHanlder = async (e) => {
        e.preventDefault();
        try {
            if( input.name === '' ||
          input.designation === '' ||
          input.doj  === '' ||
          input.email  === '' ||
          input.password  === '' ||
          input.department  === '') {
            dispatch(setShowModal("All field are required"))
            return;
          }

          const {data} = await axios.post(`${BASE_URL}/user/update`, input)
          if(!data.success) {
              dispatch(setShowModal(data.msg))
              return;
          }
          dispatch(setShowModal("User Updated successfully..."))
         
          const res = await axios.get(`${BASE_URL}/user/getuser`)
          dispatch(setAllUser(res.data.alluser))
          dispatch(getOnlyActiveUser())
        } catch (error) {
            dispatch(setShowModal(data.msg));
        }
       
    }
  return (
    <>
      <div className='test_container'>
        <div className='test_wrapper'>
          <div className='test_left'>
            <h1 className='test_title'>Update User</h1>
            <div className='test_input_parent'>
              <input type="text" className='bg-white'
              onChange={(e)=> inputHanlder(e)} value={input.name} 
              name='name'
              placeholder='Full Name*' />
            </div>

            <div className='test_input_parent'>
              <input type="text"  className='bg-white'
              onChange={(e)=> inputHanlder(e)} name='designation' value={input.designation} 
              placeholder='Enter Designation*' />
            </div>


            <div className='test_input_parent'>
              <input className='bg-white'
               type="email" name='email' onChange={(e)=> inputHanlder(e)} value={input.email} 
               placeholder='Work Email*' />
            </div>


            <div className='test_input_parent'>
              <input className='bg-white' type="date" onChange={(e)=> inputHanlder(e)} name='doj' value={input.doj}placeholder='*' />
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
              <button className='update_btn' onClick={(e)=> updateHanlder(e)}>Update</button>
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

export default UpdateUser