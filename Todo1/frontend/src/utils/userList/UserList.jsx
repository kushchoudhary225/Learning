import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import './userList.scss';


const UserList = ({data}) => {
  const  deleteHanlder = () => {
    const checkNodes = document.querySelectorAll('input[name="deletet[id]"]');
    const filtered = [];
    for(const checkNode of checkNodes) if(checkNode.checked) filtered.push(checkNode.value);
    console.log(filtered)
   
  }

  return (
    <div className='list-container'>
      <div>

      <table cellSpacing="3">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Designation</th>
            <th>DOJ</th>
            <th>Department</th>
            <th colSpan="2">Options</th>
          </tr>
        </thead>
        <tbody>

        {
          data.map((ele, i) => (
            <tr key={ele.id} style={{backgroundColor: i % 2 == 0 ? 'lightblue' : 'lightgray', marginTop: '20px'}}>
              <td>{i + 1}</td>
              <td>{ele?.name}</td>
              <td>{ele?.designation}</td>
              <td>{ele?.doj}</td>
              <td>{ele?.department}</td>
              <td style={{textAlign:'center'}}>
               <input name='deletet[id]' value={ele.id} style={{color:'red'}} type='checkbox'  />
              </td>
              <td style={{textAlign:'center'}}>
                <Link to={`/updateuser/${ele.id}`}>
               {<FaRegEdit className='cursor-pointer' color='green'  />}
                </Link>
              </td>
            </tr>
          ))
        }
        </tbody>
        </table>

        <div className='list-del-btn' onClick={deleteHanlder}>
            <span>Delete </span>
        </div>
    </div>
    </div>
  )
}

export default UserList