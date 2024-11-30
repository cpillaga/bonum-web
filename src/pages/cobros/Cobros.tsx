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
import CobrosTable from './components/CobrosTable';



const cobrosData = [
    {
        idAnticipo: "#000001",
        nombre: "Santiago Efraín Vásquez Carreño",
        identificacion: "0917319337",
        fechaAnticipo: "15-Nov-2024",
        anticipoActivo: 300.00, // Valor monetario como float
        cuota: "2/3",
        saldo: 200.00,
        valorCuota: 100.00,
        tasaUnica: 0.00,
        totalDebitar: 100.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000002",
        nombre: "Alexander Gray",
        identificacion: "0924842339",
        fechaAnticipo: "20-Nov-2024",
        anticipoActivo: 500.00,
        cuota: "1/5",
        saldo: 500.00,
        valorCuota: 100.00,
        tasaUnica: 40.00,
        totalDebitar: 140.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000003",
        nombre: "James Taylor",
        identificacion: "0198832922",
        fechaAnticipo: "27-Nov-2024",
        anticipoActivo: 300.00,
        cuota: "2/6",
        saldo: 250.00,
        valorCuota: 50.00,
        tasaUnica: 0.00,
        totalDebitar: 50.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000004",
        nombre: "Grace Roberts",
        identificacion: "0192033910",
        fechaAnticipo: "30-Nov-2024",
        anticipoActivo: 200.00,
        cuota: "3/3",
        saldo: 66.67,
        valorCuota: 66.67,
        tasaUnica: 0.00,
        totalDebitar: 66.67,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000005",
        nombre: "Donna Rogers",
        identificacion: "0123928392",
        fechaAnticipo: "03-Sep-2024",
        anticipoActivo: 100.00,
        cuota: "4/4",
        saldo: 25.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000006",
        nombre: "Amy Diaz",
        identificacion: "0182938910",
        fechaAnticipo: "14-Oct-2024",
        anticipoActivo: 300.00,
        cuota: "1/4",
        saldo: 300.00,
        valorCuota: 75.00,
        tasaUnica: 20.00,
        totalDebitar: 95.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000007",
        nombre: "Nia Hillyer",
        identificacion: "0118290093",
        fechaAnticipo: "20-Oct-2024",
        anticipoActivo: 100.00,
        cuota: "3/4",
        saldo: 50.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000008",
        nombre: "Mary McDonald",
        identificacion: "0104566578",
        fechaAnticipo: "25-Nov-2024",
        anticipoActivo: 100.00,
        cuota: "2/3",
        saldo: 66.67,
        valorCuota: 33.33,
        tasaUnica: 0.00,
        totalDebitar: 33.33,
        acciones: "Ver"
    }
];


const Cobros = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(cobrosData, 'idSolicitud'));
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
            return cobrosData.filter((item) => {
                return (
                    item.idAnticipo.toString().includes(search.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    item.identificacion.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.fechaAnticipo.toLowerCase().includes(search.toLowerCase()) ||
                    item.anticipoActivo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.cuota.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.saldo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.valorCuota.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.tasaUnica.toString().toLowerCase().includes(search.toLowerCase())
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
                    width: '100%',
                    padding: 15,
                    color: '#0E1726',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal'
                }}
            >

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        //paddingTop: 15,
                        //paddingLeft: 15,
                        paddingRight: 15,
                        
                        //gap: '5px',
                        //backgroundColor: 'purple'
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
                                        Periodo
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

                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        //backgroundColor: 'cyan',
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
                        <p> Guardar </p>
                    </button>

                </div>

            </div>

            <CobrosTable
                isChecked={isChecked}
                page={page}
                pageSize={pageSize}
                initialRecords={initialRecords}
                cobrosData={cobrosData}
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
    );

};

export default Cobros;

