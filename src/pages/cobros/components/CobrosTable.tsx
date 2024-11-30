import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from "react";
import IconSearch from "../../../components/Icon/IconSearch";
import IconXCircle from "../../../components/Icon/IconXCircle";
import Dropdown from "../../../components/Dropdown";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconArrowLeft from '../../../components/Icon/IconArrowLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Paper } from '@mantine/core';
import IconEye from '../../../components/Icon/IconEye';

const CobrosTable = (
    {
        isChecked,
        page,
        pageSize,
        initialRecords,
        cobrosData,
        search,
        searchData,
        sortStatus,
        hideCols,
        setIsChecked,
        setPage,
        setPageSize,
        setSearch,
        setSearchData,
        setSortStatus,
        setHideCols,
        PAGE_SIZES
    }: {
        isChecked: boolean;
        page: number;
        pageSize: number;
        initialRecords: any[];
        cobrosData: any[];
        search: string;
        searchData: boolean;
        sortStatus: DataTableSortStatus;
        hideCols: any;
        setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
        setPage: React.Dispatch<React.SetStateAction<number>>;
        setPageSize: React.Dispatch<React.SetStateAction<number>>;
        setSearch: React.Dispatch<React.SetStateAction<string>>;
        setSearchData: React.Dispatch<React.SetStateAction<boolean>>;
        setSortStatus: React.Dispatch<React.SetStateAction<DataTableSortStatus>>;
        setHideCols: React.Dispatch<React.SetStateAction<any>>;
        PAGE_SIZES: any[];
    }
) => {

    const [totales, setTotales] = useState({
        anticipoActivo: 0,
        saldo: 0,
        valorCuota: 0,
        tasaUnica: 0,
        totalDebitar: 0,
    });

    useEffect(() => {

        const calculateSums = () => {

            const initialSums = {
                anticipoActivo: 0,
                saldo: 0,
                valorCuota: 0,
                tasaUnica: 0,
                totalDebitar: 0,
            };

            cobrosData.forEach((item) => {
                initialSums.anticipoActivo += item.anticipoActivo;
                initialSums.saldo += item.saldo;
                initialSums.valorCuota += item.valorCuota;
                initialSums.tasaUnica += item.tasaUnica;
                initialSums.totalDebitar += item.totalDebitar;
            });

            setTotales(initialSums);
        };

        calculateSums();
    }, []);

    return (

        <div
            className="datatables"
            style={{
                margin: '1.5vh'
            }}
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    width: '8%',
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> ID Anticipo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Nombre </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Identificación </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Fecha Anticipo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Anticipo Activo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Cuota </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Saldo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Valor Cuota  </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Tasa Única </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Total a Debitar </p>
                            </TableCell>
                            {/* <TableCell
                                align='center'
                                size='small'
                            >
                                <p> Estado </p>
                            </TableCell> */}
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Acciones </p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cobrosData.map((row, index) => (
                            <TableRow key={row.idAnticipo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#BF5CF3',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.idAnticipo} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.nombre} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.identificacion} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.fechaAnticipo} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.anticipoActivo} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.cuota} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.saldo} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.valorCuota} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.tasaUnica} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.totalDebitar} </p>
                                </TableCell>
                                {/* <TableCell
                                    align='center'
                                    size='small'
                                    style={{ width: '10%' }}
                                >
                                    <Checkbox
                                        onChange={() => setIsChecked(!isChecked)}
                                    />
                                </TableCell> */}

                                <TableCell
                                    align='center'
                                // sx={{
                                //     backgroundColor: 'cyan'
                                // }}
                                >

                                    <button
                                        style={{
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => console.log(`View: ${row.idAnticipo}`)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M0.833496 10C0.833496 10 4.16683 3.33337 10.0002 3.33337C15.8335 3.33337 19.1668 10 19.1668 10C19.1668 10 15.8335 16.6667 10.0002 16.6667C4.16683 16.6667 0.833496 10 0.833496 10Z" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>

                                    <button
                                        style={{
                                            border: 'none',
                                            cursor: 'pointer',
                                            marginLeft: window.screen.width * 0.01
                                        }}
                                        onClick={() => console.log(`View: ${row.idAnticipo}`)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M2.5 5H4.16667H17.5" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.8332 4.99996V16.6666C15.8332 17.1087 15.6576 17.5326 15.345 17.8451C15.0325 18.1577 14.6085 18.3333 14.1665 18.3333H5.83317C5.39114 18.3333 4.96722 18.1577 4.65466 17.8451C4.3421 17.5326 4.1665 17.1087 4.1665 16.6666V4.99996M6.6665 4.99996V3.33329C6.6665 2.89127 6.8421 2.46734 7.15466 2.15478C7.46722 1.84222 7.89114 1.66663 8.33317 1.66663H11.6665C12.1085 1.66663 12.5325 1.84222 12.845 2.15478C13.1576 2.46734 13.3332 2.89127 13.3332 3.33329V4.99996" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.3335 9.16663V14.1666" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.6665 9.16663V14.1666" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} style={{ fontWeight: "bold" }}>
                                Totales (Visibles)
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: "bold" }}>
                                {totales.anticipoActivo.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: "bold" }}>
                                {totales.saldo.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: "bold" }}>
                                {totales.valorCuota.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: "bold" }}>
                                {totales.tasaUnica.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: "bold" }}>
                                {totales.totalDebitar.toFixed(2)}
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <div
                style={{
                    display: 'flex',
                    marginTop: '1rem',
                    alignItems: 'center',
                    //backgroundColor: 'blue',
                    width: '100%',
                    gap: '2px'
                }}
            >

                <div
                    style={{
                        //width: '25px',
                        width: '25%',
                        //width: window.screen.width * 0.15,
                        marginLeft: '1vw',
                        //backgroundColor: 'yellow'
                    }}
                >
                    <Typography
                        style={{
                            fontWeight: 'initial',
                            fontSize: 14,
                        }}
                    >
                        Mostrando {cobrosData!.length} de {initialRecords!.length} registros
                    </Typography>
                </div>

                <div
                    style={{
                        display: 'flex',
                        //marginLeft: window.screen.width * 0.01,
                        alignItems: 'center',
                        //backgroundColor: 'green'
                    }}
                >
                    <select
                        value={pageSize!}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        style={{
                            padding: '5px',
                            borderRadius: '4px',
                            borderWidth: '0.5px',
                            borderColor: 'gray'
                        }}
                    >
                        {PAGE_SIZES!.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>


                <div
                    style={{
                        width: '100%',
                        //backgroundColor: 'cyan',
                        display: 'flex',
                        alignItems: 'right',
                        justifyContent: 'right',
                        gap: '10px',
                        //marginLeft: window.screen.width * 0.37
                    }}
                >
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        style={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            backgroundColor: page === 1 ? '#f5f5f5' : '#ffffff',
                            color: page === 1 ? '#ccc' : '#000',
                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {'<'}
                    </button>

                    {[...Array(Math.ceil(initialRecords.length / pageSize)).keys()].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                            style={{
                                width: '40px',
                                height: '40px',
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                backgroundColor: page === index + 1 ? '#4e78f4' : '#f5f5f5',
                                color: page === index + 1 ? '#ffffff' : '#000',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: page === index + 1 ? 'bold' : 'normal',
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={page * pageSize >= initialRecords.length}
                        onClick={() => setPage(page + 1)}
                        style={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            backgroundColor: page * pageSize >= initialRecords.length ? '#f5f5f5' : '#ffffff',
                            color: page * pageSize >= initialRecords.length ? '#ccc' : '#000',
                            cursor: page * pageSize >= initialRecords.length ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div>

    )

}

export default CobrosTable;