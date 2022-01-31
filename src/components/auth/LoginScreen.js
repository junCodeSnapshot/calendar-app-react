import React from 'react'
import '../../styles/LoginScreen/style.css'
import 'bootstrap/dist/css/bootstrap.css';

// TODO: Arreglar apariencia


export const LoginScreen = () => {
    return (
        <div className='content-login'>
            <div className='container-per'>
                <form>
                    <h2>Register</h2>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" aria-describedby="register-name"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="register-email"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <form>
                    <h2>Login</h2>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}