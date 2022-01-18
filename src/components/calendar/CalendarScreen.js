import React, { useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventActiveCleanAtClose, eventSetActive } from '../../actions/event'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'


// moment.locale('es')

const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const {events, activeNote} = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView')|| 'month')

    const onDoubleClick = () => {
        dispatch(uiOpenModal())

    }
    const onSelectEvent = (e)=>{
        dispatch(eventSetActive(e))
    }

    const onViewChange = (e) =>{
        localStorage.setItem('lastView', e)
        setLastView(e)
    }
    const eventStyleGetter = () => {
        const style = {
            backgroundColor: '#367C7',
            boderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'        
        }
        return {style}
    }

    const onSelectSlot = (e) => {
        dispatch(eventActiveCleanAtClose())
    }


    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                onDoubleClickEvent={onDoubleClick}
                onView={onViewChange}
                onSelectEvent={onSelectEvent}
                eventPropGetter={eventStyleGetter}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
                onSelectSlot={onSelectSlot}
                selectable={true}
            />
            <CalendarModal />
            <AddNewFab />
            {
                
                (activeNote) && <DeleteEventFab />
            }
        </div>
    )
}
