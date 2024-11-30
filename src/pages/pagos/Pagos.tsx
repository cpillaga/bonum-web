import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from "react";
import IconSearch from "../../components/Icon/IconSearch";
import IconXCircle from "../../components/Icon/IconXCircle";
import Dropdown from "../../components/Dropdown";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NavLink } from 'react-router-dom';
import TablePagosMain from './components/TablePagosMain';

const pagosData = [
    {
        idPago: "#PG100",
        descripcion: "Pago mes 1",
        fechaPago: "15-Mar-2024",
        tarifaCapital: "$2500",
        metodoPago: "Transferencia",
        estado: true,
    },
    {
        idPago: "#PG200",
        descripcion: "Pago mes 2",
        fechaPago: "15-Abr-2024",
        tarifaCapital: "$3000",
        metodoPago: "Transferencia",
        estado: true,
    },
    {
        idPago: "#PG300",
        descripcion: "Pago mes 3",
        fechaPago: "15-May-2024",
        tarifaCapital: "$1500",
        metodoPago: "Cheque",
        estado: true,
    },
    {
        idPago: "#PG400",
        descripcion: "Pago mes 4",
        fechaPago: "15-Jun-2024",
        tarifaCapital: "$10500",
        metodoPago: "Tarjeta de Crédito",
        estado: true,
    },
    {
        idPago: "#PG500",
        descripcion: "Pago mes 5",
        fechaPago: "15-Jul-2024",
        tarifaCapital: "$8000",
        metodoPago: "Efectivo",
        estado: false,
    },
];

const Pagos = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(pagosData, 'idSolicitud'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'idSolicitud', direction: 'asc' });

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');

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
            return pagosData.filter((item) => {
                return (
                    item.idPago.toString().includes(search.toLowerCase()) ||
                    item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
                    item.fechaPago.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.tarifaCapital.toLowerCase().includes(search.toLowerCase()) ||
                    item.metodoPago.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.estado.toString().toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

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

        <div>

            <div
                style={{
                    //backgroundColor: 'cyan',
                    //fontFamily: Nunito;
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    //padding: 15,
                    paddingTop: 15,
                    paddingLeft: 15,
                    //paddingBottom: 15,
                    color: '#0E1726',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal'
                }}
            >

                <div
                    style={{
                        //background: 'blue',
                        width: '6vw',
                    }}
                >
                    <p> Pagos </p>
                </div>

            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    margin: window.screen.width * 0.01,
                    borderRadius: 5
                }}
            >


                <div
                    style={{
                        //backgroundColor: 'green',
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 15
                    }}
                >

                    <div
                        style={{
                            //backgroundColor: 'pink',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.5vw',
                        }}
                    >

                        <button
                            style={{
                                width: '161px',
                                height: window.screen.height * 0.05,
                                backgroundColor: '#bf5cf3',
                                borderRadius: 5,
                                border: 'none',
                                outline: 'none',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                justifyItems: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                gap: '0.5vw',
                                fontSize: 14,
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                            }}
                        >
                            <p> Todos los Pagos </p>
                        </button>

                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            //backgroundColor: 'blue',
                            width: '100%',
                            justifyContent: 'flex-end',
                            justifyItems: 'flex-end',
                            alignContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}
                    >

                        <div
                            className="dropdown"
                            style={{
                                //backgroundColor: 'orange',
                                justifySelf: 'center'
                            }}
                        >
                            <Dropdown
                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-1.5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                button={
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            //backgroundColor: 'green',
                                        }}
                                    >
                                        {/* <span className="ltr:mr-1 rtl:ml-1">Filtros</span> */}

                                        <p
                                            style={{
                                                color: '#0E1726',
                                                fontSize: 13,
                                                fontStyle: 'normal',
                                                fontWeight: 600,
                                                lineHeight: 'normal',
                                                justifySelf: 'center',
                                                alignSelf: 'center',
                                                paddingRight: 5
                                            }}
                                        >
                                            Filtros
                                        </p>
                                        <FilterAltOutlinedIcon />
                                    </div>
                                }
                            >
                                <ul className="!min-w-[140px]">
                                    {cols.map((col, i) => {
                                        return (
                                            <li
                                                key={i}
                                                className="flex flex-col"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <div
                                                    className="flex items-center px-4 py-1"
                                                    style={{
                                                        color: '#0E1726',
                                                        fontSize: 13,
                                                        fontStyle: 'normal',
                                                        fontWeight: 600,
                                                        lineHeight: 'normal',
                                                    }}
                                                >
                                                    <label className="cursor-pointer mb-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={!hideCols.includes(col.accessor)}
                                                            className="form-checkbox"
                                                            defaultValue={col.accessor}
                                                            onChange={(event: any) => {
                                                                setHideCols(event.target.value);
                                                                showHideColumns(col.accessor, event.target.checked);
                                                            }}
                                                        />
                                                        <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                    </label>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Dropdown>
                        </div>

                        <div
                            className="dropdown"
                            style={{
                                //backgroundColor: 'pink',
                                //paddingBottom: 1
                            }}
                        >

                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                            >
                                <DatePicker
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
                                                width: window.screen.width * 0.1,
                                                '& .MuiInputBase-root': {
                                                    height: window.screen.height * 0.05,
                                                    marginTop: window.screen.height * 0.0005,
                                                    fontSize: 14,
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    lineHeight: 'normal',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #E0E6ED',
                                                    borderRadius: '4px',
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
                                                        fontWeight: 600,
                                                        lineHeight: 'normal',
                                                        // fontSize: 13,
                                                        // fontFamily: 'serif',
                                                        // fontWeight: 600,
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

                        <form
                            className={`${searchData && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                            onSubmit={() => setSearchData(false)}
                        >
                            <div
                                className="relative flex items-center"
                                style={{
                                    width: 219,
                                    height: 38,
                                }}
                            >

                                <input
                                    type="text"
                                    className="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-1.5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    placeholder="Buscar..."
                                    style={{
                                        //backgroundColor: 'red',
                                        //marginTop: window.screen.height * 0.007,
                                        width: 219,
                                        height: 38,
                                        color: '#888EA8',
                                        //fontFamily: Nunito;
                                        fontSize: 14,
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        lineHeight: 'normal',
                                        outline: 'none',
                                    }}
                                />

                                <div
                                    className="absolute right-2 flex items-center justify-center cursor-pointer"
                                    onClick={() => { }}
                                >
                                    <IconSearch className="w-5 h-5 text-gray-500" />
                                </div>

                            </div>
                        </form>

                    </div>
                </div>


                <TablePagosMain
                    isChecked={isChecked}
                    page={page}
                    pageSize={pageSize}
                    initialRecords={initialRecords}
                    pagosData={pagosData}
                    search={search}
                    searchData={searchData}
                    sortStatus={sortStatus}
                    hideCols={hideCols}
                    setIsChecked={setIsChecked}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    setSearch={setSearch}
                    setSearchData={setSearchData}
                    setSortStatus={setSortStatus}
                    setHideCols={setHideCols}
                    PAGE_SIZES={PAGE_SIZES}
                />

            </div>

        </div>

    )

}

export default Pagos;
