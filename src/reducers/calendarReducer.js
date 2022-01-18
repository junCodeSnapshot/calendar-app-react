import moment from "moment";
import { types } from "../types/types";


const initialState = {
    events: [
        {
            id: new Date().getTime(),
            title: 'Un evento importante',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            notes: ' Comprar jugo',
            user: {
                _id: '123',
                name: 'Pipo'
            }
        }
    ],
    activeNote: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.eventSetActive:
            return {
                ...state,
                activeNote: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        case types.eventCleanActiveNote:
            return {
                ...state,
                activeNote: null
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(event => 
                   ( event.id === action.payload.id) ? action.payload : event
                )
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(event => 
                   ( event.id !== state.activeNote.id) 
                ),
                activeNote: null
            }
        default:
            return state
    }
}