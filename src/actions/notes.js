//TODO: Crear el almacenamiento de las notas y active note

import { types } from "../types/types"

export const createNote = (note) => ({
    type: types.createNote,
    payload: note
})

export const deleteNote = (id) => ({
    type: types.deleteNote,
    payload: id
})

export const activeNote = (note) => ({
    type: types.activeNote,
    payload: note
})

export const actualizeNote = (note) => ({
    type: types.actualizeNote,
    payload: note
})