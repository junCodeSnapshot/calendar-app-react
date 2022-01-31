import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../../actions/modal'
import '../../styles/ui-AddEvent/styles.css'
export const AddEventButton = () => {
    
    const dispatch = useDispatch()
    const handleModal = () => {
        dispatch(openModal())
    }
    
    return (
        <button className='float-button addbtn' onClick={handleModal}>
            <i className="uil uil-plus"></i>
        </button>
    )
}
