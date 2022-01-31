import { fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2"

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('fecha-inicio-token', new Date().getTime())//Guardar el tiempo en el que se creo el token

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }
        else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/register', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('uid', body.uid);
            localStorage.setItem('name', body.name);
            localStorage.setItem('token', body.token);
            localStorage.setItem('fecha-token', new Date().getTime());
            console.log('OK');
            dispatch(registeredUser({ uid: body.uid, name: body.name }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const registeredUser = (user) => ({
    type: types.authStartregister,
    payload: user
})