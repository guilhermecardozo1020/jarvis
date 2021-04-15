import React, { useState, useLayoutEffect } from 'react'
import Banner from '../components/Banner'
import Menu from '../components/Menu'
import ImageUpload from "../components/ImageUpload";
import ImagemBanner from '../images/banner_colaboradores_background.jpg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Firebase from '../services/FirebaseConnect'
import {v4 as uuidv4} from 'uuid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    hideLastBorder: {
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    },
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

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

    const limpar = () => {
        setNome("")
        setEmail("")
        setTelefone("")
    }

    const salvarRegistro = () => {
        let objeto = {
            nome: nome,
            email: email,
            telefone: telefone
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
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Cadastrar
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                </DialogContentText>
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
                    <ImageUpload alt="Upload de Imagens" cardName="Input Image"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant = "outlined" color="primary">
                        Cancelar
                </Button>
                    <Button onClick={salvarRegistro} variant = "outlined" color="primary">
                        Salvar
                </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Telefone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {lista.map((item, key) => {
                return <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {item.nome}
                </TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.telefone}</TableCell>
              </TableRow>
            })}
            
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}