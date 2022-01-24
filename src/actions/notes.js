//TODO: Crear el almacenamiento de las notas y active note

import { types } from "../types/types"

export const createNoteAction = (note) => ({
    type: types.createNote,
    payload: {note}
})

export const deleteNoteAction = (id) => ({
    type: types.deleteNote,
    payload: id
})

export const activeNoteAction = (note) => ({
    type: types.activeNote,
    payload: {...note}
})

export const actualizeNoteAction = (note) => ({
    type: types.actualizeNote,
    payload: note
})

export const cleanActiveNoteAction = () => ({
    type: types.cleanActiveNote
})