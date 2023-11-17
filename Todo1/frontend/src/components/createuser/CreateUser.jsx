import React, { useState } from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setAllUser} from '../../slices/empSlices';
import './createuser.scss';
const CreateUser = () => {
    const BASE_URL = useSelector(state => state.BASE_URL);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name : '',
        designation: '',
        doj : '',
        department : 'hr'
    });
    console.log(input)
    const inputHanlder = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const submitHanlder = async (e) => {
        e.preventDefault();
        const {data} = await axios.post(`${BASE_URL}/user/new`,input)
        alert(data.success ? "user created successfully" : "Failed to create user");
        let  res = await axios.get(`${BASE_URL}/user/getuser`)
        res = res.data.alluser;
        dispatch(setAllUser(res))
        setInput({
            name : '',
            designation: '',
            doj : '',
            department : 'hr'
        });
    }
    return (
        <>
        <div className='form-container'>
            <div className="form-wrapper">

            <form action="">
                <h1>Complete the Form</h1>
                <div className='row'>
                    <div className="col">
                        <input type="text" name='name' onChange={(e)=> inputHanlder(e)} value={input.name} placeholder='Enter Name' />
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e)=> inputHanlder(e)} name='designation' value={input.designation}  placeholder='Enter Designation' />
                    </div>
                </div>

                <div className='row'>
                    <div className="col">
                        <input type="date" onChange={(e)=> inputHanlder(e)} name='doj' value={input.doj}  placeholder='Date of Joining' />
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
        
                <button onClick={(e)=> submitHanlder(e)}>submit</button>
            </form>
            </div>
        </div>
            
        </>
    )
}

export default CreateUser