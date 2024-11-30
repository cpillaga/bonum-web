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
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconArrowLeft from '../../../components/Icon/IconArrowLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Paper } from '@mantine/core';
import IconEye from '../../../components/Icon/IconEye';

const AnticiposTable = ({
    isChecked,
    openModal,
    page,
    pageSize,
    initialRecords,
    solicitudesData,
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
    solicitudesData: any[];
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
    PAGE_SIZES: any[],
    setStateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

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
                                    width: '12%',
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> ID Solicitud </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                size='small'
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
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Sueldo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Antiguedad </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Monto Solicitado </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Plazo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Estado </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                size='small'
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
                        {solicitudesData.map((row, index) => (
                            <TableRow key={row.idSolicitud} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        color: '#BF5CF3',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.idSolicitud} </p>
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
                                    <p> {row.sueldo} </p>
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
                                    <p> {row.antiguedad} </p>
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
                                    <p> {row.montoSolicitado} </p>
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
                                    <p> {row.plazo} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        justifyContent: 'center',
                                        justifyItems: 'center',
                                        alignContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >

                                    <div
                                        style={{
                                            width: '88.201px',
                                            height: '22px',
                                            flexShrink: 0,
                                            //height: window.screen.height * 0.04,
                                            backgroundColor: row.estado ? '#00AB55' : '#E7515A',
                                            color: 'white',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            borderRadius: 4,
                                            boxShadow: '4px 10px 15px 0px rgba(0, 0, 0, 0.12)',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            textAlign: 'left',
                                            paddingLeft: 10
                                        }}
                                    >
                                        {row.estado ? 'Aprobado' : 'Rechazado'}
                                    </div>
                                </TableCell>
                                <TableCell
                                    align='center'
                                >
                                    <button
                                        style={{
                                            backgroundColor: 'transparent',
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
                                        <IconEye />
                                    </button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
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
                        Mostrando {solicitudesData!.length} de {initialRecords!.length} registros
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

export default AnticiposTable;