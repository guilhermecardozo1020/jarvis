import { React}  from 'react'
import oi from './App.css'
import {
  withStyles,
  makeStyles,
} 
from '@material-ui/core/styles';
import { 
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Link,  
  Box, 
  Typography, 
  Container 
} 
from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
  return (
    <Typography style={{color: "#6D6D72"}} variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link target='_blank' style={{color: "#6D6D72"}} href="https://www.grazziotin.com.br/">
        Grupo Grazziotin
      </Link>{' '}
      - Todos os direitos reservados
    </Typography>
  );
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#007f00',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#007f00',
      border: '2px solid #007f00'
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#007f00',
        border: '2px solid #007f00'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#007f00',
        border: '2px solid #007f00'
      },
    },
    width: '100%',
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 3px 10px rgb(0 0 0 / 16%)',
    color: '#6D6D72',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#007F00',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#007F00", 
    '&:hover': {
      backgroundColor: "#076d07",
    },
    padding: "14px 16px",
  },
  root: {
    "&$checked": {
      color: "#007F00"
    }
  },
  checked: {

  }
}));

function App() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Jarvis
        </Typography>
        <form className={classes.form} noValidate>
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="usuario_codigo"
            label="Usuário"
            name="usuario_codigo"
            autoComplete="usuario_codigo"
            autoFocus
          />
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            style={{borderColor: "#007F00"}}
          />
          <FormControlLabel style={{color: "#6D6D72"}}
            control={<Checkbox value="lembrar" classes={{
              root: classes.root,
              checked: classes.checked
            }}/>}
            label="Lembre-me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
        <Box mt={2}>
        <Copyright />
      </Box>
      </div>
    </Container>
  );
}

export default App;