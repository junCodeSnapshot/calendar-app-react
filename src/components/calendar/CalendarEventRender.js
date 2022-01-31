import React from 'react'
import '../../styles/CalendarScreen/style.css'
export const CalendarEventRender = ({event}) => {
    return (
        <div className='renderEvent'>
            <strong>{event.title}</strong>
            <p>{event.note}</p>
        </div>
    )
}
