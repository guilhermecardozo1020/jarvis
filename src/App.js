import React from 'react'
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
  makeStyles, 
  Container 
} 
from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link target='_blank' color="inherit" href="https://www.grazziotin.com.br/">
        Grupo Grazziotin
      </Link>{' '}
      - Todos os direitos reservados
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
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
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
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
          <TextField
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
          <FormControlLabel
            control={<Checkbox value="lembrar" color="primary" />}
            label="Lembre-me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{backgroundColor: "#007F00", padding: "14px 16px"}}
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default App;
