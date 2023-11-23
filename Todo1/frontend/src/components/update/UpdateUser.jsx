import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import './updateuser.scss'
import { setAllUser, getOnlyActiveUser, setShowModal } from '../../slices/empSlices';


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
        const {data} = await axios.post(`${BASE_URL}/user/update`, input)
        if(!data.success) {
            dispatch(setShowModal(data.msg))
            return;
        }
        dispatch(setShowModal("User Updated successfully..."))
       
        const res = await axios.get(`${BASE_URL}/user/getuser`)
        dispatch(setAllUser(res.data.alluser))
        dispatch(getOnlyActiveUser())
    }
    return (
        <>
        <div className='form-container'>
            <div className="form-wrapper">

            <form action="">
                <h1>Complete the Form</h1>
                <div className='row'>
                    <div className="col">
                        <input type="text" id='name' name='name' onChange={(e)=> inputHanlder(e)} value={input.name} placeholder='Enter Name' />
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e)=> inputHanlder(e)} name='designation' value={input.designation}  placeholder='Enter Designation' />
                    </div>
                </div>

                <div className='row'>
                    <div className="col">
                        <input type="text" onChange={(e)=> inputHanlder(e)} name='doj' value={input.doj}  placeholder='Date of Joining' />
                    </div>
                    <div className="col">
                        {
                            <select name="department" value={input?.department} onChange={(e)=> inputHanlder(e)}>
                            <option  value="hr">HR</option>
                            <option  value="technical">Technical</option>
                            <option  value="technical+hr">Technical+HT</option>
                            <option   value="operation">operation  </option>
                            <option  value="account">account</option>
                        </select>
                        }
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label htmlFor="status" style={{color:'white'}}>Current Status</label>
                        {/* { input?.status ?  
                        <select name="status" id='status' value="true" onChange={(e)=> inputHanlder(e)}>
                            <option  value={true}>Active 1</option>
                            <option  value={false}>Not Active 1</option>
                        </select> : 
                        <select name="status" id='status'  value="false" onChange={(e)=> inputHanlder(e)}>
                            <option  value={false} >Not Active 2</option>
                            <option  value= {true}>Active 1</option>
                        </select>
                        } */}
                        {
                            <select name="status" value={input?.status} onChange={(e)=> inputHanlder(e)}>
                            <option value={true}>Active</option>
                            <option value={false}>Not Active</option>
                        </select>
                        }
                        {/* <input type="text" onChange={(e)=> inputHanlder(e)} name='doj' value={input.status}  placeholder='Date of Joining' /> */}
                    </div>
                </div>
        
                <button onClick={(e)=> updateHanlder(e)}>Update</button>
            </form>
            </div>
        </div>
            
        </>
    )
}

export default UpdateUser