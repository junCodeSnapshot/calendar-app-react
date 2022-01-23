import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './Router/AppRouter'
import { store } from './store/store'
import './styles/style.css'

// TODO: Importar el Provider

export const CalendarApp = () => {
    return (
    <Provider store={store}>
        <AppRouter /> 
    </Provider>
    )
}