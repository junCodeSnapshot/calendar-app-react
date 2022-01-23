import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../../actions/modal'
import '../../styles/ui-AddEvent/styles.css'
export const AddEventButton = () => {
    const dispatch = useDispatch()
    const handleModal = () => {
        console.log('i been clicked')
        dispatch(openModal())
    }
    return (
        <button className='float-button' onClick={handleModal}>
            <i className="uil uil-plus"></i>
        </button>
    )
}
