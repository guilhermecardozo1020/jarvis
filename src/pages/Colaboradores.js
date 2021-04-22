import React, { useState, useLayoutEffect } from 'react'
import Banner from '../components/Banner'
import Search from '../components/Search'
import Menu from '../components/Menu'
import ImageUpload from "../components/ImageUpload";
import ImagemBanner from '../images/banner_colaboradores_background.jpg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Firebase from '../services/FirebaseConnect'
import {v4 as uuidv4} from 'uuid';
import {makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import Imagem from '../images/background-cadastro-colaborador.jpg';
import ImagemAvatar from '../images/imagem-colaborador.png';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';


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
      buttonCancelar: {
        color: '#fff',
        fontWeight: '500',
        textTransform: 'none',
        padding: '24px',
        position: 'relative',
        height: '45px',
        borderRadius: '12px',
        borderColor: "#F76566",
        backgroundColor: "#F76566",
        '&:hover': {
          backgroundColor: "#F76566",
          borderColor: 'none',
        },
      },
      formJornada: {
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
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [jornada, setJornada] = useState()
    const [intervalo, setIntervalo] = useState()
    const [statusColaborador, setStatusColaborador] = useState("")
    const limpar = () => {
        setNome("")
        setEmail("")
        setTelefone("")
        setJornada()
        setIntervalo()
        setStatusColaborador("")
    }

    const salvarRegistro = () => {
        let objeto = {
            nome: nome,
            email: email,
            telefone: telefone,
            jornada: jornada,
            intervalo: intervalo,
            statusColaborador: statusColaborador,
        }
        let code = uuidv4()
        Firebase
            .database()
            .ref(`colaboradores/${code}`)
            .set(objeto)
            .then(() => {
                limpar()
            })
            .catch((erro) => {
                console.log(erro)
            })
        handleClose()
    }
    return (
        <div>
            <Banner title="Olá, "
                description="Gerencie as jornadas de trabalho dos colaboradores com o Jarvis!"
                image={ImagemBanner}
                imageText="Imagem ilustrativa pessoa usando notebook" />
            <Menu tabAtiva={2}/>
            <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-end', alignItems: 'center'}}>
                <div className="item-flex-banner">
                    <Button 
                        variant="contained" 
                        onClick={handleClickOpen} 
                        endIcon={<PersonAddIcon/>} className={classes.button}>
                    Cadastrar
                    </Button>
                </div>
            </div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <div style={{height: '200px', maxWidth: '100%', margin: 'auto', zIndex: '6', overflow: 'hidden'}}>
                <img src={Imagem} style={{width: '100%'}}
                    alt="Imagem ilustrativa de um relógio em funcionamento."/>
                </div>
                <DialogTitle id="form-dialog-title">Cadastrar colaborador</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        label="Nome completo"
                        fullWidth
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email_user"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="E-mail"
                        type="email"
                        name="email_user"
                        autoComplete="E-mail"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="telefone_user"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        label="Telefone"
                        name="telefone_user"
                        autoComplete="Telefone"
                    />
                    <form className={classes.formJornada} noValidate>
                    <TextField 
                        id="jornada"
                        label="Jornada"
                        type="time"
                        defaultValue="00:00"
                        value={jornada}
                        onChange={(e) => setJornada(e.target.value)}
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
                        label="Intervalo"
                        type="time"
                        defaultValue="00:00"
                        value={intervalo}
                        onChange={(e) => setIntervalo(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true
                        }}
                        inputProps={{
                        step: 300
                        }}
                    />
                    </form>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.inputLabel} shrink>
                            Status
                        </InputLabel>
                        <Select
                            value={statusColaborador}
                            onChange={(e) => setStatusColaborador(e.target.value)}
                            id="demo-simple-select-placeholder-label"
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem select value="">
                                <em>Selecione</em>
                            </MenuItem>
                            <MenuItem value="Ativo">Ativo</MenuItem>
                            <MenuItem value="Inativo">Inativo</MenuItem>
                        </Select>
                    </FormControl>
                    <InputLabel className={classes.inputLabel} shrink>
                        Foto do colaborador
                    </InputLabel>
                    <ImageUpload alt="Upload de Imagens" cardName="Input Image"/>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button 
                        onClick={handleClose} 
                        variant="contained" 
                        startIcon={<CloseIcon style={{fontSize: '25px'}}/>} 
                        className={classes.buttonCancelar}>
                        Cancelar
                    </Button>
                    <Button 
                        onClick={salvarRegistro} 
                        variant="contained" 
                        startIcon={<SaveIcon style={{fontSize: '25px'}}/>} 
                        className={classes.button}>
                        Cadastrar
                    </Button>
                </DialogActions>
            </Dialog>
            
            <div className={classes.contentColaboradores} >
                <Typography className={classes.tituloColaboradores} variant="h5" component="h3">
                    Colaboradores ativos
                </Typography>
                <Search></Search>
                { lista.map((item, key) => {
                return <Paper className={classes.contentPaperColaboradores} elevation={2}>
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
                    <Button style={{margin: '15px', padding: '0px'}}
                        variant="contained" 
                        className={classes.button}>
                            <VisibilityIcon style={{fontSize: '25px', }}/>
                    </Button>
                    </div>
                </Paper>
                })}
            </div>
        </div>
    )
}

        