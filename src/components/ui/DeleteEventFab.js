import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventDeleted } from '../../actions/event'

export const DeleteEventFab = () => {
    const {activeNote} = useSelector(state => state.calendar)
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(eventDeleted(activeNote))
    }
    return (
        <button className='btn btn-danger fab-danger' onClick={handleDelete}>
            <i className='fas fa-trash'></i>
            <span> Borrar evento</span>
        </button>
    )
}
