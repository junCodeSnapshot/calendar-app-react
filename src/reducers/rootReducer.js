//TODO: Evaliar si se maneja el estado del modal en los reducers
import { combineReducers } from "redux"
import { modalReducer } from "./modalReducer"
import { notesReducer } from "./notesReducer"

export const rootReducer = combineReducers({
    notes: notesReducer,
    modal: modalReducer
})

