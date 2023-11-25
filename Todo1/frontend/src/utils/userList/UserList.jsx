import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import {setAllUser, getOnlyActiveUser, setShowModal} from '../../slices/empSlices'
import './userList.scss';


const UserList = ({data, showOnlyActive = false}) => {
  const dispatch = useDispatch();
  const BASE_URL = useSelector(state => state.BASE_URL);
  const showModal = useSelector(state => state.showModal);


  const  deleteHanlder = async () => {
    const checkNodes = document.querySelectorAll('input[name="deletet[id]"]');
    const filtered = [];
    for(const checkNode of checkNodes) if(checkNode.checked) filtered.push(checkNode.value);
    if(filtered.length === 0) {
      dispatch(setShowModal("Select something...."))
      return;
    }
    const res = await axios.post(`${BASE_URL}/user/delete`, {ids : filtered});
    const {data} = await axios.get(`${BASE_URL}/user/getuser`);
    dispatch(setAllUser(data.alluser));
    // console.log({data : data.alluser})
    dispatch(getOnlyActiveUser());
    dispatch(setShowModal(res.data.msg))
    for(const checkNode of checkNodes) checkNode.checked = false
  }
  console.log({data})
  return (
    <>
    <div className="alert_message">Please Switch to Laptop Screen </div>

    <div className='list-container'>
      <div>
      <table cellSpacing="3">
        <thead>
          <tr className='table_first_row'>
            <th>Sno</th>
            <th>Name</th>
            <th>Designation</th>
            <th>DOJ</th>
            <th>Department</th>
            <th>Status</th>
            <th colSpan="2">Options</th>
          </tr>
        </thead>
        <tbody>

        {
          data?.map((ele, i) => (
            <tr className='trfornew' key={ele._id}>
              <td>{i + 1}</td>
              <td>{ele?.name}</td>
              <td>{ele?.designation}</td>
              <td>{ele?.doj}</td>
              <td>{ele?.department}</td>
              <td>{ele?.status.toString()}</td>
              <td style={{textAlign:'center'}}>
               <input name='deletet[id]' value={ele._id} style={{color:'red'}} type='checkbox'  />
              </td>
              <td style={{textAlign:'center'}}>
                <Link to={`/updateuser/${ele.empid}`}>
               {<FaRegEdit className='cursor-pointer' color='green'  />}
                </Link>
              </td>
            </tr>
          ))
        }
        </tbody>
        </table>

        <div className='list-del-btn' onClick={deleteHanlder}>
            <button>Delete </button>
        </div>
    </div>
    </div>
          </>
  )
}

export default UserList