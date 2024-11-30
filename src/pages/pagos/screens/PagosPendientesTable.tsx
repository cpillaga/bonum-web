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
import { NavLink } from 'react-router-dom';

const PagosPendientesTable = ({
    estadoPagoNav,
    isChecked,
    page,
    pageSize,
    initialRecords,
    pagosPendientes,
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
    estadoPagoNav: boolean;
    isChecked: boolean;
    page: number;
    pageSize: number;
    initialRecords: any[];
    pagosPendientes: any[];
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
}) => {

    return (
        <div
            className="datatables"
            style={{
                //margin: '1.5vh'
            }}
        >
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    width: '14%',
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    //backgroundColor: 'red'
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

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pagosPendientes.map((row, index) => (
                            <TableRow key={row.idAnticipo}>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        width: '10%',
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
                                    size='small'
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
                                    size='small'
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
                                    size='small'
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
                                    size='small'
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
                                    size='small'
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
                                    size='small'
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
                                    size='small'
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


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>


    )

}

export default PagosPendientesTable;