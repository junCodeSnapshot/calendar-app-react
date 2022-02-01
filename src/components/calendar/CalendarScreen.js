import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { CalendarEventRender } from './CalendarEventRender'
import { calendar_es } from '../../helpers/calendar-es'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../styles/CalendarScreen/style.css'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { AddEventButton } from '../ui/AddEventButton'
import { momentConfEs } from '../../helpers/momentConfEs'
import { activeNoteAction, cleanActiveNoteAction } from '../../actions/notes'
import { DeleteFloatingButton } from '../ui/DeleteFloatingButton'
import { openModal } from '../../actions/modal'



momentConfEs()
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
    const dispatch = useDispatch();


    const [view, setview] = useState('month');
    let lastView = localStorage.getItem('view');
    //TODO: Manejar el si hay nota selecta renderizar un boton para borrarla

    const { notes, activeNote } = useSelector(state => state.notes);

    const styleGetter = () => {
        const style = {
            backgroundColor: 'rgba(70,90,190)',
            display: 'flex',
            // height: 'fit-content'
        }
        return { style }
    };

    const onSelectSlot = ({ action }) => {
        console.log(action);
        // TODO:Hacer evento de doble click en fecha cree un modal con la fecha seleccionada solo para agregar titulo
        if (action === "click") {
            dispatch(cleanActiveNoteAction());
        }
    };

    const onSelectEvent = (selectedNote) => {
        //TODO: Modificar el estado activo de nota en el reducer
        dispatch(activeNoteAction(selectedNote));
        dispatch(openModal());
    };

    const usehandleView = (currentView) => {
        localStorage.setItem('view', currentView);
        setview(currentView);
    };

    return (
        <div className='calendar-height-conf'>

            <Calendar
                localizer={localizer}
                events={notes}
                onView={usehandleView}
                view={lastView || 'month'}
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
            <AddEventButton />
            {activeNote && <DeleteFloatingButton />}
            <CalendarModal />,

        </div>
    );
}