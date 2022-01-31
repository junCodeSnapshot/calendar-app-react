import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';


import './modal.css'
import './datePickerStyle.css'
import { useDispatch, useSelector} from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventActiveCleanAtClose, eventAddNew, eventUpdated } from '../../actions/event';

//Configuration Modal

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}
Modal.setAppElement('#root');
//Configuration Modal

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const dateEnd = now.clone().add(1, "hours")


const eventInit = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: dateEnd.toDate()
}

export const CalendarModal = () => {

    const dispatch = useDispatch()
    const {modalOpen} = useSelector(state => state.ui)
    const {activeNote} = useSelector(state => state.calendar)

    const [dateStart, setdateStart] = useState(now.toDate())
    const [endDate, setEndDate] = useState(dateEnd.toDate())
    const [titleValid, setTitleValid] = useState(true)
    const [formValues, setFormValues] = useState(eventInit)
    const {title, notes, start, end} = formValues
    

    useEffect(() => {
        if(activeNote){
            setFormValues(activeNote)
        }else{
            setFormValues(eventInit)
        }
    }, [activeNote, setFormValues])

    
    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    
    const closeModal = () => {
        dispatch(uiCloseModal())
        setFormValues(eventInit)
        dispatch(eventActiveCleanAtClose())
    }

    const handleStartDateChange = (e) => {
        setdateStart(e)
        setFormValues({
            ...formValues,
            start: e,
        })
    }

    const handleEndDateChange = (e) => {
        setEndDate(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSumitForm = (e) =>{
        e.preventDefault();
        
        const momentStart = moment(start)
        const momentEnd = moment(end)

        if(momentStart.isSameOrAfter(momentEnd)){
            Swal.fire({
                titleText: 'A ocurrido un error.',
                text: 'La fecha de terminación del evento debe de ser mayor a la fecha de inicio',
                icon: 'error',
            })
            return
        }
        if(title.trim().length <2){
            return setTitleValid(false)
        }

        //TODO: relizar base de datos

        if(activeNote){
            dispatch(eventUpdated(formValues))
        }
        else{     
            dispatch(eventAddNew({
                ...formValues, 
                id: new Date().getTime(),
                user: {
                    _id: 'kjhsjkdh23u19u3821',
                    name: 'Juan'
                }
            }
            ))
        }
        
        setTitleValid(true)
        closeModal()

    }
 

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'

        >
            <h1> {(activeNote) ? 'Editar Evento.' : 'Nueva Evento'} </h1>
            <hr />
            <form className="container" onSubmit={handleSumitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={endDate}
                        minDate={dateStart}
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid  && 'is-invalid'}`} 
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
