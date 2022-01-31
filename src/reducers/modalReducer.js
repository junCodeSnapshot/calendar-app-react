import { types } from "../types/types"

//TODO: Evaluar si se necesita.
const initialState = {
    isOpen: false
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.openModal:
            return{
                ...state,
                isOpen: true
            }
        case types.closeModal:
            return{
                ...state,
                isOpen: false
            }
        default:
            return state
    }
}