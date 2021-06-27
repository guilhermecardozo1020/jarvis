import React, { useState, useLayoutEffect } from 'react'
import Banner from '../components/Banner'
import Search from '../components/Search'
import Menu from '../components/Menu'
import ImagemBanner from '../images/banner_colaboradores_background.jpg';
import Firebase from '../services/FirebaseConnect'
import {makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ImagemAvatar from '../images/imagem-colaborador.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import 'date-fns';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(hour, func_um, func_dois, func_tres, func_quatro) {
    return { hour, func_um, func_dois, func_tres, func_quatro};
  }
  
  const rows = [
    createData('8h', "Não", "Sim", "Não", "Sim"),
    createData('9h',  "Não", "Sim", "Não", "Sim"),
    createData('10h',  "Sim", "Sim", "Não", "Sim"),
    createData('11h',  "Sim", "Sim", "Não", "Sim"),
    createData('12h',  "Sim", "Não", "Não", "Sim"),
    createData('13h', "Não", "Parcial", "Sim", "Parcial"),
    createData('14h',  "Sim", "Sim", "Sim", "Sim"),
    createData('15h',  "Sim", "Sim", "Sim", "Sim"),
    createData('16h',  "Sim", "Sim", "Sim", "Sim"),
    createData('17h',  "Sim", "Sim", "Sim", "Sim"),
    createData('18h',  "Sim", "Sim", "Sim", "Sim"),
  ];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
      contentColaboradores: {
        width: '90%',
        display: 'block',
        margin: 'auto'
      },
      avatarColaborador: {
        marginRight: '15px'
      },
      tituloColaboradores: {
        color: '#6D6D72',
        marginBottom: '2em'
      },
      large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      contentPaperColaboradores: {
          marginBottom: '25px'
      },
      table: {
        maxWidth: '90%',
        margin: 'auto'
      },
      table_head: {
        color: '#000',
        backgroundColor: '#bababa'
      },
      table_row: {
          backgroundColor: "#007f00",
          color: "#fff",
          textAlign: 'center',
          width: "10%"
      }
  }));
  
export default function Colaboradores() {
    const [lista, setLista] = useState([])
    const [horarios, setHorarios] = useState([])
    useLayoutEffect(() => {
        Firebase    
            .database()
            .ref(`/colaboradores`)
            .on('value', snapchot => {
                //converter objetos em listas
                if (snapchot.val()) {
                    let dados = snapchot.val()
                    const keys = Object.keys(dados)
                    const lista = keys.map((key) => {
                        return {...dados[key], id:key}
                    })
                    setLista(lista)
                }
            })

        Firebase    
            .database()
            .ref(`/horarios`)
            .on('value', snapchot => {
                //converter objetos em listas
                if (snapchot.val()) {
                    let dados = snapchot.val()
                    const keys = Object.keys(dados)
                    const lista = keys.map((key) => {
                        return {...dados[key], id:key}
                    })
                    setHorarios(lista)
                }
            })
        
    }, [])
    const classes = useStyles();
    return (
        <div>
            <Banner title="Seja Bem-Vindo "
                description="ao Painel da Jornada de Trabalho Jarvis!"
                image={ImagemBanner}
                imageText="Imagem ilustrativa pessoa usando notebook" />
            <Menu tabAtiva={0}/>
            <div className={classes.contentColaboradores}>
            <Typography className={classes.tituloColaboradores} variant="h5" component="h3">                    
                </Typography>
                <Typography className={classes.tituloColaboradores} variant="h5" component="h3">           
                    Jornada de Trabalho Atual         
                </Typography>
                <Typography className={classes.tituloColaboradores} variant="h6" component="h6">           
                    Período: 31/05/2021 a 31/07/2021         
                </Typography>
                </div>
            <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                    <StyledTableCell className={classes.table_row}>Horários</StyledTableCell>
                    { lista.map((item) => {
                        return item.statusColaborador == 'Ativo' ? <StyledTableCell className={classes.table_head}>
                            <ListItemAvatar className={classes.avatarColaborador}>
                                    <Avatar alt="Remy Sharp" src={ImagemAvatar}  />
                            </ListItemAvatar>
                                {item.nome}
                            </StyledTableCell>:null
                    })}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {horarios.map((row) => (
                            <StyledTableRow>
                            <StyledTableCell className={classes.table_row} component="th" scope="row">
                                {row.horario}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.colaborador1}</StyledTableCell>
                            <StyledTableCell align="left">{row.colaborador2}</StyledTableCell>
                            <StyledTableCell align="left">{row.colaborador3}</StyledTableCell>
                            <StyledTableCell align="left">{row.colaborador4}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>

            <div className={classes.contentColaboradores} >
                <Typography className={classes.tituloColaboradores} variant="h5" component="h3">                    
                </Typography>
                <Typography className={classes.tituloColaboradores} variant="h5" component="h3">           
                Seus colaboradores ativos         
                </Typography>
                { lista.map((item, key) => {
                    return item.statusColaborador == 'Ativo' ? <Paper className={classes.contentPaperColaboradores} elevation={2}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <List className={classes.root}>
                            <ListItem key={key} alignItems="flex-start">
                                <ListItemAvatar className={classes.avatarColaborador}>
                                    <Avatar alt="Remy Sharp" src={ImagemAvatar} className={classes.large} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.nome}
                                    secondary={
                                        <React.Fragment>
                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                            Jornada de {item.jornada}
                                        </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </List>
                    </div>
                </Paper>:
                <div></div>
                })}
            </div>
        </div>
    )
}

        