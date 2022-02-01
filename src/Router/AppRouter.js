import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {useDispatch} from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {
    const dispatch = useDispatch();
    
    //cuando este componente sufrá un cambio vamos a llamar al useEffect el cual usará el dispatch para renovarnos el token solo si el token es válido.
    useEffect(() => {
        dispatch(startChecking());
    
    }, [dispatch]);
    

    return (
        <Router>
            <div>
                <Switch>

                    <Route exact path='/login'>
                        <LoginScreen />
                    </Route>

                    <Route exact path='/'>
                        <CalendarScreen />
                    </Route>
                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    )
}
