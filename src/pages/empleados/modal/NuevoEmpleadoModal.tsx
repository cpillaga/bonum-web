
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

const NuevoEmpleadoModal = (
    {
        openModal,
        setOpenModal,
    }
    :
    {
        openModal: boolean;
        setOpenModal: (isOpen: boolean) => void;
    }
) => {

    

    return (

        <Transition
            appear
            show={openModal}
            as={Fragment}>
            <Dialog
                as="div"
                open={openModal} onClose={() => setOpenModal(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div id="fadein_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-start justify-center min-h-screen px-4">
                        <Dialog.Panel
                            style={{
                                backgroundColor: 'white',
                                margin: window.screen.height * 0.025,
                                //borderRadius: 10,
                                width: window.screen.width * 0.577,

                            }}
                        >
                            <div
                                style={{
                                    //backgroundColor: 'red',
                                    paddingTop: 10,
                                    paddingLeft: 22,
                                    color: '#0E1726',
                                    //fontFamily: Nunito,
                                    fontSize: 18,
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: 'normal',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignContent: 'space-between'
                                }}
                            >
                                <p> Agregar Empleado</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }} onClick={() => { setOpenModal(false) }}>
                                    <path d="M18 6L6 18" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 6L18 18" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>

                            <div
                                style={{
                                    //padding: 20,
                                    paddingTop: 10,
                                    paddingLeft: 20,
                                    paddingRight: 10,
                                    paddingBottom: 10
                                    //backgroundColor: 'green'
                                }}
                            >

                                <form>

                                    <div
                                        style={{
                                            //backgroundColor: 'blue',
                                            marginTop: 10,
                                            marginBottom: 15,
                                            fontSize: 15,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                        }}
                                    >
                                        <p> Datos Personales</p>

                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02,
                                            //backgroundColor: 'yellow'
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <label> Cedula de identidad</label>
                                            <input
                                                placeholder="Ingresar número de cédula"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <label> Nombres </label>
                                            <input
                                                placeholder="Ingresar nombres completos"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <label> Apellidos </label>
                                            <input
                                                placeholder="Ingresar dos apellidos"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'pink',
                                            marginTop: window.screen.height * 0.01,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02
                                        }}
                                    >


                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <label> Fecha de nacimiento </label>
                                            <input
                                                placeholder="Ingresar número de cédula"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <label> Nivel educativo </label>
                                            <input
                                                placeholder="Ingresar nivel educativo"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'blue',
                                            marginTop: 20,
                                            marginBottom: 10,
                                            //marginBottom: window.screen.height * 0.01,
                                            fontSize: 15,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                        }}
                                    >
                                        <p> Datos de Contacto</p>

                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02,
                                            //background: 'yellow'
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <label> Correo Electrónico </label>
                                            <input
                                                placeholder="Ingresar correo electronico"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <label> Teléfono Móvil </label>
                                            <input
                                                placeholder="Ingresar numero de celular"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <label> Teléfono Fijo </label>
                                            <input
                                                placeholder="Ingresar numero de teléfono"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'orange',
                                            fontSize: 14,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                        }}
                                    >

                                        <label
                                            style={{
                                                marginTop: 5
                                            }}
                                        >
                                            Dirección
                                        </label>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                //backgroundColor: 'cyan',
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >


                                            <input
                                                placeholder="Provincia"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.265,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                placeholder="Ciudad"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.265,
                                                    height: '5vh'
                                                    //marginLeft: window.screen.width * 0.015
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'red',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: window.screen.height * 0.015,
                                                gap: window.screen.width * 0.01,
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >


                                            <input
                                                placeholder="Ingresar direccion principal"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.24,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                placeholder="Número"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.07,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                placeholder="Ingresar dirección transversal"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.22,
                                                    height: '5vh'
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'blue',
                                                marginTop: 20,
                                                marginBottom: 10,
                                                fontSize: 15,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            <p> Datos Laborales </p>

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                //backgroundColor: 'yellow'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                }}
                                            >
                                                <label> Código de Empresa </label>
                                                <input
                                                    placeholder="Código de Empresa"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                }}
                                            >
                                                <label> Fecha de Ingreso </label>
                                                <input
                                                    placeholder="Fecha de Ingreso"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                }}
                                            >
                                                <label> Cargo </label>
                                                <input
                                                    placeholder="Ingresar cargo"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'purple',
                                                marginTop: window.screen.height * 0.01,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                }}
                                            >
                                                <label> Sueldo Bruto </label>
                                                <input
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                }}
                                            >
                                                <label> Sueldo Neto </label>
                                                <input
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                }}
                                            >
                                                <label> Otros ingresos </label>
                                                <input
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                marginTop: window.screen.height * 0.01,
                                                //backgroundColor: 'cyan'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                }}
                                            >
                                                <label> Observaciones </label>
                                                <textarea
                                                    placeholder="Ingresar observaciones"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.55,
                                                        height: window.screen.height * 0.11,
                                                    }}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </form>

                                <div className="flex justify-center items-center mt-2 mb-10">
                                    <button
                                        onClick={() => setOpenModal(false)}
                                        type="button"
                                        className="btn btn-outline-danger"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => setOpenModal(false)}
                                        type="button"
                                        style={{
                                            width: window.screen.width * 0.067,
                                            height: window.screen.height * 0.05,
                                            marginLeft: window.screen.width * 0.005,
                                            backgroundColor: '#bf5cf3',
                                            padding: 5,
                                            borderRadius: 5,
                                            color: 'white',
                                            fontSize: 14
                                        }}>
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>

            

        </Transition>




    )

}

export default NuevoEmpleadoModal;