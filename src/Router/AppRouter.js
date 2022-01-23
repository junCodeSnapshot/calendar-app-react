

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";



export const AppRouter = () => {

    return(
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<CalendarScreen />}/>
                
                <Route path='/login' element={<LoginScreen />}/>
                
                {/*TODO: Investigar como cambiar el URL al path '/' cuando no se encuentra la opción*/ }
                <Route path='*' element={<CalendarScreen />}/>      

            </Routes>
        
        </BrowserRouter>
    )
}