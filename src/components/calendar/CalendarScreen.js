import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { CalendarEventRender } from './CalendarEventRender'
import { calendar_es } from '../../helpers/calendar-es'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../styles/CalendarScreen/style.css'
import { CalendarModal } from './CalendarModal'
import {useSelector } from 'react-redux'
import { AddEventButton } from '../ui/AddEventButton'


const localizer = momentLocalizer(moment)
// const startDate = moment()
// const endDate = startDate.clone().add(1, 'hours')


// const event = [{
//     title: 'Some Text',
//     note: 'some note',
//     start: startDate.toDate(),
//     end: endDate.toDate()
// },
// {
//     title: 'Some Text',
//     note: 'some note',
//     start: startDate.toDate(),
//     end: endDate.toDate()
// }]}


export const CalendarScreen = () => {

    const [view, setview] = useState('month')
    let lastView = localStorage.getItem('view')
    //TODO: Manejar el si hay nota selecta renderizar un boton para borrarla

    const { activeNote, notes } = useSelector(state => state.notes)
    const styleGetter = () => {
        const style = {
            backgroundColor: 'rgba(70,90,190)',
            display: 'flex',
            // height: 'fit-content'
        }
        return { style }
    }

    const onSelectSlot = ({ action }) => {
        //TODO: Crear una accion cuando sea doble click
    }

    const onSelectEvent = (e) => {
        //TODO: Modificar el estado activo de nota en el reducer
    }

    const usehandleView = (currentView) => {
        localStorage.setItem('view', currentView)
        setview(currentView)
    }

    return (
        <div className='calendar-height-conf'>
            <Calendar
                localizer={localizer}
                events={notes}
                onView={usehandleView}
                view={lastView}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={styleGetter}
                messages={calendar_es}
                selectable={true}
                onSelectSlot={onSelectSlot}
                onSelectEvent={onSelectEvent}
                components={
                    {
                        event: CalendarEventRender
                    }}
            />
            <CalendarModal />,
            <AddEventButton />
        </div>
    )
}