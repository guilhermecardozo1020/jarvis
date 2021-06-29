import React, { useState, useLayoutEffect } from 'react'
import Banner from '../components/Banner'
import Menu from '../components/Menu'
import ImagemBanner from '../images/banner-gerar-escalas.jpg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Firebase from '../services/FirebaseConnect'
import {v4 as uuidv4} from 'uuid';
import {makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';




const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },

    hideLastBorder: {
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    },
    button: {
        color: '#fff',
        fontWeight: '500',
        textTransform: 'none',
        padding: '24px',
        position: 'relative',
        height: '45px',
        borderRadius: '12px',
        borderColor: "#007F00",
        backgroundColor: "#007F00",
        '&:hover': {
          backgroundColor: "#076d07",
          borderColor: 'none',
        },
      },
      formManha: {
        display: 'flex',
        justifyContent: 'space-between'
      }, 
      formTarde: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      formControl: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width: "50%",
      },
      textField: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(3),
        width: "50%",
      },
      inputLabel: {
          fontSize: '20px',
      },
      dialogActions: {
          display: 'flex',
          justifyContent: 'center',
          margin: theme.spacing(1)
      },
      DialogTitle: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(1)
      },
      contentColaboradores: {
        width: '90%',
        display: 'block',
        margin: 'auto'
      },
      avatarColaborador: {
        marginRight: '15px'
      },
      tituloEscalas: {
        color: '#6D6D72',
        marginBottom: '2em'
      },
      horarioAtendimento: {
        color: '#007F00',
        marginBottom: '2em'
      },
      large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      contentPaperColaboradores: {
          marginBottom: '25px'
      },
      buttonExit:{
        backgroundColor: 'transparent',
        boxShadow: 'none !important',
        '&:hover': {
            backgroundColor: "transparent",
            borderColor: 'none',
          }, 
      }
  }));
  
export default function Escalas() {

    const [lista, setLista] = useState([])
    useLayoutEffect(() => {
        Firebase    
            .database()
            .ref(`/escalas`)
            .on('value', snapchot => {
                //converter objetos em listas
                let dados = snapchot.val()
                const keys = Object.keys(dados)
                const lista = keys.map((key) => {
                    return {...dados[key], id:key}
                })
                setLista(lista)
                console.log(lista)
            })
    }, [])


    const classes = useStyles();
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [atendimentomanhainicio, setAtendimentomanhainicio] = useState(new Date());
    const [atendimentomanhafim, setAtendimentomanhafim] = useState(new Date());
    const [atendimentotardeinicio, setAtendimentotardeinicio] = useState(new Date());
    const [atendimentotardefim, setAtendimentotardefim] = useState(new Date());
    const [botaoModalatendimento, setBotaoModalatendimento] = useState("Incluir Horário")


    const limpar = () => {
        setAtendimentomanhainicio("")
        setAtendimentomanhafim("")
        setAtendimentotardeinicio("")
        setAtendimentotardefim("")
    }

    const salvarHorario = () => {
        let objeto = {
            atendimentomanhainicio: atendimentomanhainicio,
            atendimentomanhafim: atendimentomanhafim,
            atendimentotardeinicio: atendimentotardeinicio,
            atendimentotardefim: atendimentotardefim
        }
        if(botaoModalatendimento === 'Incluir Horário') {
            let code = uuidv4()
            Firebase
                .database()
                .ref(`escalas/${code}`)
                .set(objeto)
                .then(() => {
                    limpar()
                })
                .catch((erro) => {
                    console.log(erro)
                })
            handleClose()
        } else {
            let users = user
            Firebase
                .database()
                .ref(`escalas/${users}`)
                .update(objeto)
                .then(() => {
                    limpar()
                })
            handleClose()
        }

    }
    const editarHorarioAtendimento = (item) => {
        setAtendimentomanhainicio(item.atendimentomanhainicio)
        setAtendimentomanhafim(item.atendimentomanhafim)
        setAtendimentotardeinicio(item.atendimentotardeinicio)
        setAtendimentotardefim(item.atendimentotardefim)
        setUser(item.id);
        setBotaoModalatendimento('Incluir Horário')
        handleClickOpen()
    }
    return (
        <div>
            <Banner
                image={ImagemBanner}
            />
            <Menu tabAtiva={1}/>
            <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-end', alignItems: 'center'}}>
                <div className="item-flex-banner">
                    <Button 
                        variant="contained" 
                        onClick={handleClickOpen} 
                        endIcon={<EditIcon/>} className={classes.button}>
                    Editar
                    </Button>
                </div>
            </div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
            <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-end', alignItems: 'center'}}>
            <div className="item-flex-banner">
                    <Button 
                        variant="contained" 
                        onClick={handleClose} 
                        endIcon={<CloseIcon/>} className={classes.buttonExit}>
                    </Button>
            </div>
            </div>
                <DialogTitle id="form-dialog-title">Horário de Atendimento </DialogTitle>
                
                <DialogContent>
                    
                    <form className={classes.formManha} noValidate>
                    <TextField 
                        id="jornada"
                        label="Horas"
                        type="time"
                        defaultValue="00:00"
                        value={atendimentomanhainicio}
                        onChange={(e) => setAtendimentomanhainicio(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true
                        }}
                        inputProps={{
                        step: 300
                        }}
                    />
                    <TextField 
                        id="time"
                        label="Minutos"
                        type="time"
                        defaultValue="00:00"
                        value={atendimentomanhafim}
                        onChange={(e) => setAtendimentomanhafim(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true
                        }}
                        inputProps={{
                        step: 300
                        }}
                    />

                    </form>

                    <form className={classes.formTarde} noValidate>
                    <TextField 
                            id="jornada"
                            label="Horas"
                            type="time"
                            defaultValue="00:00"
                            value={atendimentotardeinicio}
                            onChange={(e) => setAtendimentotardeinicio(e.target.value)}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true
                            }}
                            inputProps={{
                            step: 300
                            }}
                        />
            
                        <TextField 
                            id="time"
                            label="Minutos"
                            type="time"
                            defaultValue="00:00"
                            value={atendimentotardefim}
                            onChange={(e) => setAtendimentotardefim(e.target.value)}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true
                            }}
                            inputProps={{
                            step: 300
                            }}
                        />
                        </form>

                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button 
                        onClick={salvarHorario} 
                        variant="contained" 
                        startIcon={<SaveIcon style={{fontSize: '25px'}}/>} 
                        className={classes.button}>
                        {botaoModalatendimento}
                    </Button>
                </DialogActions>
            </Dialog>
            
            <div className={classes.contentEscalas} >
                <Typography className={classes.tituloEscalas} variant="h5" component="h3">
                    Painel da Jornada de Trabalho 
                </Typography>
                <Typography className={classes.horarioAtendimento} variant="h5" component="h3">
                    Horário de atendimento
                </Typography>
                <return className={classes.Atendimentotardeinicio}></return>

                { lista.map((item, key) => {
                return <Paper className={classes.contentPaperColaboradores} elevation={2}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <List className={classes.root}>
                        <ListItem key={key} alignItems="flex-start">

                            <ListItemText
                                primary={item.nome}
                                secondary={
                                    <React.Fragment>
                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                        {item.atendimentomanhainicio}
                                         - 
                                        {item.atendimentomanhafim}
                                         /
                                        {item.atendimentotardeinicio}
                                         - 
                                        {item.atendimentotardefim}
                                    </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                    <Button style={{margin: '15px', padding: '0px'}}
                        variant="contained" 
                        className={classes.button}
                        onClick={() => editarHorarioAtendimento(item)}
                        >
                            <VisibilityIcon style={{fontSize: '25px', }}/>
                    </Button>
                    {/* <Button style={{margin: '15px', padding: '0px'}}
                        variant="contained" 
                        className={classes.button}>
                            <VisibilityIcon style={{fontSize: '25px', }}/>
                    </Button> */}
                    </div>
                </Paper>
                })}
        </div>
        </div>
    )}