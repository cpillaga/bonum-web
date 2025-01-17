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
import InfiniteScroll from "react-infinite-scroll-component";

const CobrosTable = (
    {
        isChecked,
        openModal,
        page,
        pageSize,
        initialRecords,
        recordsData,
        cobrosData,
        search,
        searchData,
        sortStatus,
        hideCols,
        setIsChecked,
        setOpenModal,
        setPage,
        setPageSize,
        setSearch,
        setSearchData,
        setSortStatus,
        setHideCols,
        PAGE_SIZES,
        setStateModal
    }: {
        isChecked: boolean;
        openModal: boolean;
        page: number;
        pageSize: number;
        initialRecords: any[];
        recordsData: any[];
        cobrosData: any[];
        search: string;
        searchData: boolean;
        sortStatus: DataTableSortStatus;
        hideCols: any;
        setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
        setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
        setPage: React.Dispatch<React.SetStateAction<number>>;
        setPageSize: React.Dispatch<React.SetStateAction<number>>;
        setSearch: React.Dispatch<React.SetStateAction<string>>;
        setSearchData: React.Dispatch<React.SetStateAction<boolean>>;
        setSortStatus: React.Dispatch<React.SetStateAction<DataTableSortStatus>>;
        setHideCols: React.Dispatch<React.SetStateAction<any>>;
        PAGE_SIZES: any[];
        setStateModal: React.Dispatch<React.SetStateAction<boolean>>;
    }
) => {

    const [cobrosDataInf, setCobrosDataInf] = useState(cobrosData.slice(0, pageSize));
    const [addData, setAddData] = useState(cobrosData.length > pageSize);

    const moreData = () => {

        const nextIndex = cobrosDataInf.length;
        const newPageData = cobrosData.slice(nextIndex, nextIndex + pageSize);

        if (newPageData.length === 0) {
            setAddData(false);
        }
        else {
            setCobrosDataInf((prevData) => [...prevData, ...newPageData]);
        }

    };

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

            recordsData.forEach((item) => {
                initialSums.anticipoActivo += item.anticipoActivo;
                initialSums.saldo += item.saldo;
                initialSums.valorCuota += item.valorCuota;
                initialSums.tasaUnica += item.tasaUnica;
                initialSums.totalDebitar += item.totalDebitar;
            });

            setTotales(initialSums);
        };

        calculateSums();
    }, [recordsData]);

    return (

        <div
            className="datatables"
            style={{
                margin: '1.5vh'
            }}
        >
            <TableContainer
                component={Paper}
            >

                <Table
                    size="small"
                >
                    <TableHead >
                        <TableRow sx={{  backgroundColor: '#e9efff' }}>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    width: '8%',
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontFamily: 'Maven Pro',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> ID Cobro </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontFamily: 'Maven Pro',
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
                                    fontFamily: 'Maven Pro',
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
                                    fontFamily: 'Maven Pro',
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
                                    fontFamily: 'Maven Pro',
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
                                    fontFamily: 'Maven Pro',
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
                                    fontFamily: 'Maven Pro',
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
                                    fontFamily: 'Maven Pro',
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
                                    fontFamily: 'Maven Pro',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Costo por Servicio </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontFamily: 'Maven Pro',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Total a Debitar </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontFamily: 'Maven Pro',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Acciones </p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {recordsData.map((row, index) => (
                            <TableRow key={row.idAnticipo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        color: '#BF5CF3',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.idAnticipo} </p>
                                </TableCell>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.nombre} </p>
                                </TableCell>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.identificacion} </p>
                                </TableCell>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.fechaAnticipo} </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.anticipoActivo} </p>
                                </TableCell>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.cuota} </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.saldo} </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.valorCuota} </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.tasaUnica} </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.totalDebitar} </p>
                                </TableCell>

                                <TableCell
                                    align='center'
                                >

                                    <button
                                        style={{
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            if (row.estado === true) {
                                                setOpenModal(true)
                                                setStateModal(true)
                                            }
                                            else {
                                                setOpenModal(true)
                                                setStateModal(false)
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M0.833496 10C0.833496 10 4.16683 3.33337 10.0002 3.33337C15.8335 3.33337 19.1668 10 19.1668 10C19.1668 10 15.8335 16.6667 10.0002 16.6667C4.16683 16.6667 0.833496 10 0.833496 10Z" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter
                        sx={{
                            position: 'sticky',
                            bottom: 0,
                            backgroundColor: 'white',
                            zIndex: 2,
                            width: '100%'
                        }}
                    >
                        <TableRow>
                            <TableCell
                                //align='center'
                                size='medium'
                                colSpan={4}
                                style={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    paddingLeft: 30,
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                Total
                            </TableCell>
                            <TableCell
                                size='medium'
                                align="right"
                                style={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                {totales.anticipoActivo.toFixed(2)}
                            </TableCell>
                            <TableCell
                                size='medium'
                                align="right"
                                style={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',

                                }}>

                            </TableCell>
                            <TableCell
                                size='medium'
                                align="right"
                                style={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                {totales.saldo.toFixed(2)}
                            </TableCell>

                            <TableCell
                                size='medium'
                                align="right"
                                style={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                }}>
                                {totales.valorCuota.toFixed(2)}
                            </TableCell>
                            <TableCell
                                size='medium'
                                align="right"
                                style={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                }}>
                                {totales.tasaUnica.toFixed(2)}
                            </TableCell>
                            <TableCell
                                size='medium'
                                align="right"
                                style={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
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
                            fontFamily: 'Maven Pro',
                        }}
                    >
                        Mostrando {recordsData!.length} de {initialRecords!.length} registros
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
                            borderColor: 'gray',
                            fontFamily: 'Maven Pro',
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
                            fontFamily: 'Maven Pro',
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
                                backgroundColor: page === index + 1 ? '#BF5CF3' : '#f5f5f5',
                                color: page === index + 1 ? '#ffffff' : '#000',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: page === index + 1 ? 'bold' : 'normal',
                                fontFamily: 'Maven Pro',
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
                            fontFamily: 'Maven Pro',
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