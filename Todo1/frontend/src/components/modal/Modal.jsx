import React, { useEffect } from 'react'
import { MdOutlineDone } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux'
import {setShowModal} from '../../slices/empSlices'
import done from '../../../lottie/done.json'
import Lottie from "lottie-react";
import './modal.scss'
const Modal = () => {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.showModal)
  const message = useSelector(state => state.message)
  const toggleModal = () => {
    dispatch(setShowModal(''))
  }
  useEffect(()=> {
      const modal = document.querySelector('.modal_wrapper');
      setTimeout(() => {
        modal.style.transform = 'translateX(0)';
        modal.style.opacity = '1';
      },[])
      console.log("called")
  },[]) 
  return (
    <div className='modal_container'>
      <div className="modal_wrapper">
          <p>
            Something Important !
          </p>
          <div>
            <p className='modal_desc'>{message}</p>
            <button onClick={toggleModal}>Okay</button>
          </div>
          
          <div>
          </div>
      </div>
    </div>
  )
}

export default Modal