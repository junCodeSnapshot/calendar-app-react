import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import moment from 'moment'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

import '../../styles/CalendarModal/style.css'
import '../../styles/CalendarDatePicker/style.css'

import DateTimePicker from 'react-datetime-picker'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../actions/modal'
import { cleanActiveNoteAction, createNoteAction } from '../../actions/notes'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const initialDate = moment().minutes(0).seconds(0).add(1, 'hours')
const endDate = initialDate.clone().add(1, 'hours')
const initialState = {
    title: '',
    note: '',
    start: initialDate.toDate(),
    end: endDate.toDate()
}


export const CalendarModal = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(state => state.modal);
    const { activeNote } = useSelector(state => state.notes);

    //CONJUNTO DE LOS USESTATES
    const [startDateForm, onStartChange] = useState(initialDate.toDate());
    const [endDateForm, onEndChange] = useState(endDate.toDate());
    const [formValues, handleInputChange] = useState(initialState);




    //VERIFICAR EL ESTADO DE NOTA ACTIVA PARA SABER QUE DEBEMOS DESPLEGAR COMO INITIAL STATE EN EL MODAL
    useEffect(() => {
        if (activeNote) {
            handleInputChange(activeNote);
            onStartChange(activeNote.start);
            onEndChange(activeNote.end);

        } else {
            handleInputChange(initialState);
        }
    }, [activeNote, handleInputChange, onStartChange, onEndChange]);


    //MANEJAR LOS CAMBIOS DE FECHA Y DEL FORMULARIO
    const handleStartDateChange = (e) => {
        onStartChange(e);
        handleInputChange({
            ...formValues,
            start: e
        });
    };


    const handleEndDateChange = (e) => {
        onEndChange(e);
        handleInputChange({
            ...formValues,
            end: e
        });
    };

    const formValuesChange = ({ target }) => {
        handleInputChange({
            ...formValues,
            [target.name]: target.value
        });
    };

    const { title, note, start, end } = formValues;
    //MANEJAR EL SUBMIT DEL FORMULARIO        
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNoteAction(formValues));
        dispatch(closeModal());

    };

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(cleanActiveNoteAction());
    };


    return (
        <div>

            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
                className="modal"
                contentLabel="Example Modal"
                overlayClassName="modal-fondo"
                shouldCloseOnOverlayClick={true}
            >
                <button className='closeBTN' onClick={handleCloseModal}>x</button>
                <form className='formModal' onSubmit={handleSubmit}>
                    <h2 className='modal-title'>Create a note</h2>
                    <div className="mb-3">
                        <h5 >Title:</h5>
                        <input type="text" name="title" value={title} className="form-control" placeholder='Add a title' aria-describedby="title" onChange={formValuesChange} />
                    </div>
                    <div className="mb-3 modal-datepicker">
                        <h5>Start:</h5>
                        <DateTimePicker value={startDateForm} onChange={handleStartDateChange} />
                    </div>
                    <div className="mb-3 modal-datepicker">
                        <h5>End:</h5>
                        <DateTimePicker value={endDateForm} onChange={handleEndDateChange} minDate={start} />
                    </div>
                    <div className="mb-3">
                        <h5>Note:</h5>
                        <input name="note" value={note} type="text" placeholder='Add a note' className="form-control" onChange={formValuesChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </Modal>
        </div>
    );
}