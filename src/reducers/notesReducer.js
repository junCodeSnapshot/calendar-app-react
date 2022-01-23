//TODO: Crear los otros casos y evaluarlos

import { types } from "../types/types";

const initialState = {
    notes: [],
    activeNote: null
}


export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.createNote:
            return{
                ...state,
                notes: [action.payload.note, ...state.notes]
            }
        
    
        default:
            return state
    }
}