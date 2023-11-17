import {useSelector, useDispatch} from 'react-redux'
import './App.css'
import { useState } from 'react';
import { addToList, deleteFromList } from './todoSlices';
function App() {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists);
  const [name, setName] = useState('')
  const submitHanlder = () => {
    dispatch(addToList(name));
    setName('')
  }
  return (
    <>
    <div>
        <input type="text" onChange={e => setName(e.target.value)} />
         <button onClick={submitHanlder}>submit</button>

        {
          lists.map((list, i) => <p key={i}>{list} <button onClick={e => dispatch(deleteFromList(i))}>X</button></p>)
        }
        </div>
    </>
  )
}

export default App
