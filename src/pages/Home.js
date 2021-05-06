import React, { useState, useLayoutEffect } from 'react'
import Banner from '../components/Banner'
import Search from '../components/Search'
import Menu from '../components/Menu'
import ImagemBanner from '../images/banner_colaboradores_background.jpg';
import Firebase from '../services/FirebaseConnect'
import {makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ImagemAvatar from '../images/imagem-colaborador.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
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
      }
  }));
  
export default function Colaboradores() {
    const [lista, setLista] = useState([])
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
    }, [])

    const classes = useStyles();
    return (
        <div>
            <Banner title="Seja Bem Vindo "
                description="ao Painel da Jornada de Trabalho !"
                image={ImagemBanner}
                imageText="Imagem ilustrativa pessoa usando notebook" />
            <Menu tabAtiva={0}/>
            <div className={classes.contentColaboradores} >
                <Typography className={classes.tituloColaboradores} variant="h5" component="h3">                    
                </Typography>
                <Typography className={classes.tituloColaboradores} variant="h5" component="h3">           
                Seus colaboradores          
                </Typography>
                <Search></Search>
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

        