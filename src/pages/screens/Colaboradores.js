import React, {useState, useLayoutEffect} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Firebase from '../../services/FirebaseConnect'

export default function ColaboradoresLista() {
    useLayoutEffect(() => {
        Firebase    
            .database()
            .ref(`/colaboradores`)
            .on('values', (snapchot) => {
                let dados = snapchot.val()
            })
    })
    return (
        <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Telefone</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell component="th" scope="row">
                    54545
                </TableCell>
                <TableCell align="right">66</TableCell>
                <TableCell align="right">66</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    )
}