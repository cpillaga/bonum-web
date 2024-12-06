import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import MensajeModal from './MensajeModal';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import IconSearch from "../../../components/Icon/IconSearch";
import IconXCircle from "../../../components/Icon/IconXCircle";
import Dropdown from "../../../components/Dropdown";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import IconTrash from '../../../components/Icon/IconTrash';
import IconEye from '../../../components/Icon/IconEye';
import { NavLink } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

const historialData = [
    {
        codigo: "#AS100-1",
        nombre: "Adelanto de Sueldo $100",
        monto: 100,
        plazo: 1,
        costoPorServicio: 15.22,
        fechaSolicitud: "20-Oct-2024",
        fechaFinalizacion: "1-Nov-2024",
    },
    {
        codigo: "#AS100-2",
        nombre: "Adelanto de Sueldo $100",
        monto: 100,
        plazo: 2,
        costoPorServicio: 18.25,
        fechaSolicitud: "10-Jul-2024",
        fechaFinalizacion: "1-Sep-2024",
    },
    {
        codigo: "#AS100-3",
        nombre: "Adelanto de Sueldo $100",
        monto: 100, // Número
        plazo: 3, // Número
        costoPorServicio: 20.50, // Número
        fechaSolicitud: "5-Abril-2024",
        fechaFinalizacion: "1-Jul-2024",
    },
    {
        codigo: "#AS200-1",
        nombre: "Adelanto de Sueldo $200",
        monto: 200, // Número
        plazo: 1, // Número
        costoPorServicio: 20.35, // Número
        fechaSolicitud: "12-Ene-2024",
        fechaFinalizacion: "1-Feb-2024",
    },
];


const EditarEmpleadoModal = ({
    openModalEdit,
    setOpenModalEdit,
    hideButton,
    setHideButton,
    openMessage,
    setOpenMessage,
}
    :
    {
        openModalEdit: boolean;
        setOpenModalEdit: (isOpen: boolean) => void;
        hideButton: boolean;
        setHideButton: (isOpen: boolean) => void;
        openMessage: boolean;
        setOpenMessage: (isOpen: boolean) => void;
    }
) => {

    const PAGE_SIZES = [8, 16, 23, 32, 40];


    const [isChecked, setIsChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalNew, setOpenModalNew] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(historialData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return historialData.filter((item) => {
                return (
                    item.codigo.toString().includes(search.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    item.monto.toString().includes(search.toLowerCase()) ||
                    item.plazo.toString().includes(search.toLowerCase()) ||
                    item.costoPorServicio.toString().includes(search.toLowerCase()) ||
                    item.fechaSolicitud.toLowerCase().includes(search.toLowerCase()) ||
                    item.fechaFinalizacion.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'firstName', title: 'First Name' },
        { accessor: 'lastName', title: 'Last Name' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'phone', title: 'Phone' },
        { accessor: 'company', title: 'Company' },
        { accessor: 'address.street', title: 'Address' },
        { accessor: 'age', title: 'Age' },
        { accessor: 'dob', title: 'Birthdate' },
        { accessor: 'isActive', title: 'Active' },
    ];

    return (

        <Transition
            appear
            show={openModalEdit}
            as={Fragment}>
            <Dialog
                as="div"
                open={openModalEdit} onClose={() => setOpenModalEdit(false)}>
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
                                width: window.screen.width * 0.577
                            }}
                        >

                            <div
                                style={{
                                    width: '100%',
                                    //backgroundColor: 'red',
                                    paddingTop: 10,
                                    paddingLeft: 22,
                                    color: '#0E1726',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    //textAlign: 'center',
                                    //fontFamily: Nunito,
                                    fontSize: 18,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                <div
                                    style={{
                                        //backgroundColor: 'green', 
                                        width: '80%'
                                    }}
                                >
                                    <p style={{ marginTop: 5 }}> Editar Empleado</p>
                                </div>

                                <div
                                    style={{
                                        //backgroundColor: 'cyan',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '2vw'
                                    }}
                                >

                                    <NavLink
                                        to="/empleados/historial"
                                        state={{ data: historialData }}
                                        style={{
                                            width: window.screen.width * 0.1,
                                            height: window.screen.height * 0.05,
                                            marginLeft: window.screen.width * 0.005,
                                            backgroundColor: '#bf5cf3',
                                            padding: 5,
                                            borderRadius: 5,
                                            color: 'white',
                                            fontSize: 14,
                                            justifyItems: 'center',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        Ver Historial
                                    </NavLink>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10, marginTop: 7 }} onClick={() => { setOpenModalEdit(false) }}>
                                        <path d="M18 6L6 18" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 6L18 18" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>

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
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        <p> Datos Personales</p>

                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02,
                                            // backgroundColor: 'yellow'
                                        }}
                                    >

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Cedula de identidad</label>
                                            <input
                                                //onChange={(e) => setCedula(e.target.value)}
                                                placeholder="Ingresar número de cédula"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Nombres </label>
                                            <input
                                                //onChange={(e) => setNombre(e.target.value)}
                                                placeholder="Ingresar nombres completos"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Apellidos </label>
                                            <input
                                                //onChange={(e) => setApellido(e.target.value)}
                                                placeholder="Ingresar dos apellidos"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
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


                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Fecha de nacimiento </label>
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DatePicker
                                                    //onChange={(newValue) => setFechaNac(newValue)}
                                                    slotProps={{
                                                        textField: {
                                                            placeholder: 'Fecha',
                                                            fullWidth: true,
                                                            InputLabelProps: {
                                                                shrink: true,
                                                            },
                                                            inputProps: {
                                                                readOnly: true,
                                                            },
                                                            sx: {
                                                                width: '222px',
                                                                height: '38px',
                                                                flexShrink: 0,
                                                                '& .MuiInputBase-root': {
                                                                    height: '38px',
                                                                    width: '226px',
                                                                    //height: window.screen.height * 0.05,
                                                                    fontSize: 14,
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 300,
                                                                    lineHeight: 'normal',
                                                                    fontFamily: 'Maven Pro',
                                                                    backgroundColor: 'white',
                                                                    border: '1px solid #E0E6ED',
                                                                    borderRadius: '6px',
                                                                    boxShadow: 'none',
                                                                    transition: 'none',
                                                                    '&:hover': {
                                                                        backgroundColor: 'white',
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                    '&.Mui-focused': {
                                                                        backgroundColor: 'white',
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                },
                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                    border: 'none',
                                                                },
                                                                '& .MuiInputBase-input': {
                                                                    '::placeholder': {
                                                                        //color: '#888EA8',
                                                                        fontSize: 14,
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 400,
                                                                        lineHeight: 'normal',
                                                                        fontFamily: 'Maven Pro',
                                                                        // fontSize: 13,
                                                                        // fontFamily: 'serif',
                                                                        // fontWeight: 400,
                                                                        color: '#0E1726',
                                                                        opacity: 1
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    }}
                                                />

                                            </LocalizationProvider>
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Nivel educativo </label>
                                            <input
                                                onChange={(e) =>{}}
                                                placeholder="Ingresar nivel educativo"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'blue',
                                            marginTop: 36,
                                            marginBottom: 15,
                                            fontSize: 15,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
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

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Correo Electrónico </label>
                                            <input
                                                //onChange={}
                                                placeholder="Ingresar correo electronico"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Teléfono Móvil </label>
                                            <input
                                                //onChange={}
                                                placeholder="Ingresar numero de celular"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Teléfono Fijo </label>
                                            <input
                                                //onChange={()={}}
                                                placeholder="Ingresar numero de teléfono"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div>

                                        <label
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'revert',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                                marginTop: 15
                                            }}
                                        >
                                            Dirección
                                        </label>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 5,
                                                //backgroundColor: 'cyan',
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >


                                            <input
                                                //onChange={(e) => setProvincia(e.target.value)}
                                                placeholder="Provincia"
                                                className="form-input"
                                                style={{
                                                    width: '358px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />

                                            <input
                                                //onChange={(e) => setCiudad(e.target.value)}
                                                placeholder="Ciudad"
                                                className="form-input"
                                                style={{
                                                    width: '358px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: window.screen.height * 0.015,
                                                gap: 27,
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >


                                            <input
                                                //onChange={(e) => setDireccionPrincipal(e.target.value)}
                                                placeholder="Ingresar direccion principal"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />

                                            <input
                                                //onChange={(e) => setNumero(e.target.value)}
                                                placeholder="Número"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
                                                }}
                                            />

                                            <input
                                                //onChange={(e) => setDireccionSecundaria(e.target.value)}
                                                placeholder="Ingresar dirección transversal"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    background: '#FFFFF'
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
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
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

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Código de Empresa </label>
                                                <input
                                                    //onChange={(e) => setCodigoEmpresa(e.target.value)}
                                                    placeholder="Código de Empresa"
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFF'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Fecha de Ingreso </label>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                >
                                                    <DatePicker
                                                        //onChange={(newValue) => setFechaIngreso(newValue)}
                                                        slotProps={{
                                                            textField: {
                                                                placeholder: 'Fecha',
                                                                fullWidth: true,
                                                                InputLabelProps: {
                                                                    shrink: true,
                                                                },
                                                                inputProps: {
                                                                    readOnly: true,
                                                                },
                                                                sx: {
                                                                    width: '222px',
                                                                    height: '38px',
                                                                    flexShrink: 0,
                                                                    '& .MuiInputBase-root': {
                                                                        width: '222px',
                                                                        height: '38px',
                                                                        fontSize: 14,
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 300,
                                                                        lineHeight: 'normal',
                                                                        backgroundColor: 'white',
                                                                        border: '1px solid #E0E6ED',
                                                                        borderRadius: '4px',
                                                                        boxShadow: 'none',
                                                                        transition: 'none',
                                                                        fontFamily: 'Maven Pro',
                                                                        '&:hover': {
                                                                            backgroundColor: 'white',
                                                                            borderColor: '#E0E6ED',
                                                                        },
                                                                        '&.Mui-focused': {
                                                                            backgroundColor: 'white',
                                                                            borderColor: '#E0E6ED',
                                                                        },
                                                                    },
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                        border: 'none',
                                                                    },
                                                                    '& .MuiInputBase-input': {
                                                                        '::placeholder': {
                                                                            //color: '#888EA8',
                                                                            fontSize: 14,
                                                                            fontStyle: 'normal',
                                                                            fontWeight: 400,
                                                                            lineHeight: 'normal',
                                                                            // fontSize: 13,
                                                                            // fontFamily: 'serif',
                                                                            // fontWeight: 400,
                                                                            color: '#0E1726',
                                                                            opacity: 1,
                                                                            fontFamily: 'Maven Pro',
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </LocalizationProvider>
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Cargo </label>
                                                <input
                                                    //onChange={(e) => setCargo(e.target.value)}
                                                    placeholder="Ingresar cargo"
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFF'
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

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Sueldo Bruto </label>
                                                <input
                                                    //onChange={(e) => setSueldoBruto(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFF'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Sueldo Neto
                                                </label>
                                                <input
                                                    //onChange={(e) => setSueldoNeto(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFF'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Otros ingresos </label>
                                                <input
                                                    //onChange={(e) => setOtrosIngresos(e.target.value)}
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFF'
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

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Observaciones </label>
                                                <textarea
                                                    //onChange={(e) => setObservaciones(e.target.value)}
                                                    placeholder="Ingresar observaciones"
                                                    className="form-input"
                                                    style={{
                                                        width: '725px',
                                                        height: '78px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        background: '#FFFFFF'
                                                    }}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </form>

                                {hideButton ?

                                    <div className="flex justify-center items-center mt-2 mb-10">

                                        <button
                                            onClick={() => {
                                                setHideButton(!hideButton)
                                            }}
                                            type="button"
                                            style={{
                                                width: window.screen.width * 0.067,
                                                height: window.screen.height * 0.05,
                                                marginLeft: window.screen.width * 0.005,
                                                backgroundColor: '#bf5cf3',
                                                padding: 5,
                                                borderRadius: 5,
                                                color: 'white',
                                                fontSize: 14,
                                                fontFamily: 'Maven Pro',
                                            }}>
                                            Editar
                                        </button>

                                    </div>

                                    :

                                    <div className="flex justify-center items-center mt-2 mb-10">

                                        <button
                                            onClick={() => {
                                                setOpenModalEdit(!openModalEdit)
                                                setHideButton(!hideButton)
                                            }}
                                            type="button"
                                            className="btn btn-outline-danger"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => {

                                                setHideButton(!hideButton)
                                                setOpenMessage(!openMessage)
                                                setOpenModalEdit(!openModalEdit)
                                            }}
                                            type="button"
                                            style={{
                                                width: window.screen.width * 0.067,
                                                height: window.screen.height * 0.05,
                                                marginLeft: window.screen.width * 0.005,
                                                backgroundColor: '#bf5cf3',
                                                padding: 5,
                                                borderRadius: 5,
                                                color: 'white',
                                                fontSize: 14,
                                                fontFamily: 'Maven Pro',
                                            }}>
                                            Guardar
                                        </button>

                                    </div>

                                }

                            </div>

                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>


        </Transition>

    )

}

export default EditarEmpleadoModal