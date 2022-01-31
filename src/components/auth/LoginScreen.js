import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [nameValid, setNameValid] = useState(true);

    const [formLoginValues, handleLoginInputChange] = useForm({
        LoginEmail: 'pedroramirezca@hotmail.com',
        LoginPassword: '123456'
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        nombreRegistro: '',
        emailRegistro: '',
        passwordRegistro: '',
        re_passRegistro: '',
    })

    const { LoginEmail, LoginPassword } = formLoginValues;

    const { nombreRegistro,
        emailRegistro,
        passwordRegistro,
        re_passRegistro } = formRegisterValues; 


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(LoginEmail, LoginPassword))
    }
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(passwordRegistro.length);

        if(nombreRegistro.trim().length <=2){
            setNameValid(false); 
        }
        if(passwordRegistro.length < 6){
            return Swal.fire('Error', 'La contraseña debe de ser mayor de 6 caracteres', 'error'); 
        }
        else if(passwordRegistro !== re_passRegistro){
            return Swal.fire('Error', 'Las contraseñas deben de coincidir', 'error');
        }
        setNameValid(true);
        dispatch(startRegister(emailRegistro, passwordRegistro, nombreRegistro));
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="LoginEmail"
                                value={LoginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='LoginPassword'
                                value={LoginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control ${!nameValid && "is-invalid"}`}
                                placeholder="Nombre"
                                name='nombreRegistro'
                                value={nombreRegistro}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='emailRegistro'
                                value={emailRegistro}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='passwordRegistro'
                                value={passwordRegistro}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='re_passRegistro'
                                value={re_passRegistro}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
