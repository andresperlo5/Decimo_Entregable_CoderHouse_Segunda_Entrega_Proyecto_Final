import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function NavbarHome() {

    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    const handleSubmitReg = () => {
        axios.post('http://localhost:3001/api/v1/usuarios/register', { usuario, contrasenia })
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        const res = await axios.post('http://localhost:3001/api/v1/usuarios/login', { usuario, contrasenia })
        if (res.data.msg) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...Error',
                text: res.data.msg,
            })
        } else {
            console.log(res.data);
            localStorage.setItem('idUser', res.data.id)
            localStorage.setItem('idCart', res.data.carritoID)
            localStorage.setItem('admin', res.data.admin)
            localStorage.setItem('token', res.data.token)
            let reSetData = res.data.admin
             if (reSetData == true) {
                window.location.href = '/admin'
            } else {
                window.location.href = '/loginUser'
            }  
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand" href="/">E-Commerce</a>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active text-center" href="/">Inicio</a>

                        {/* Boton Modal Inicio de Sesion */}
                        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                            Iniciar Sesion
                        </button>

                        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel1">Inicio de Sesion</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Formulario de Inicio de Sesion */}
                                        <form onSubmit={handleSubmitLogin}>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1a" class="form-label">Usuario</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1a" aria-describedby="emailHelp" onChange={(e) => { setUsuario(e.target.value) }} required />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputPassword1a" class="form-label">Contraseña</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1a" onChange={(e) => { setContrasenia(e.target.value) }} required />
                                            </div>

                                            <button type="submit" class="btn btn-outline-primary">Iniciar Sesion</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Boton Modal Registrarse */}
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            Registrarse
                        </button>

                        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel2">Registrarse</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    {/* Formulario de Registrarse */}
                                    <div class="modal-body">
                                        <form onSubmit={handleSubmitReg}>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1b" class="form-label">Usuario</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1b" aria-describedby="emailHelp" onChange={(e) => { setUsuario(e.target.value) }} required />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputPassword1b" class="form-label">Contraseña</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1b" onChange={(e) => { setContrasenia(e.target.value) }} required />
                                            </div>

                                            <button type="submit" class="btn btn-outline-primary">Enviar Datos</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarHome;