import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Background from '../images/banner_home_background.jpg'
import Button from '@material-ui/core/Button';
import ExitToApp from "@material-ui/icons/ExitToApp";
import Imagem from '../images/icone_banner.svg'
import { useHistory } from 'react-router-dom'
import Firebase from '../services/FirebaseConnect'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '0px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    paddingTop: '5px',
    },
  },
  imagem: {
    maxWidth: '80px',
    maxHeight: '80px',
  },
  button: {
    color: '#fff',
    fontWeight: '500',
    textTransform: 'none',
    padding: '24px',
    height: '50px',
    borderRadius: '8px',
    borderColor: "#007F00",
    backgroundColor: "#007f00",
    '&:hover': {
      backgroundColor: "#076d07",
    },
  },
  grid: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  item: {
    flex: '0 1 auto',
    padding: '24px',
  }
}));

export default function Home(props) {
  const classes = useStyles();

  let history = useHistory();

  const logoff = () => {
    sessionStorage.removeItem('uid')
    Firebase
        .auth()
        .signOut()
        .then(() => {
          history.push("/")
        }).catch ( () => {
          history.push("/")
        })
  }
  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${props.image})` }}>
      <div className={classes.overlay} />
      <div className={classes.grid}>
        <div className={classes.item}>
          <img src={Imagem} 
          alt="Imagem ilustrativa de um relógio em funcionamento." 
          className={classes.imagem}/>
        </div>
        <div className={classes.item}>
          <Button 
            onClick={logoff}
            startIcon={<ExitToApp/>} 
            variant="contained" 
            className={classes.button}>
            Sair
          </Button>
        </div>
      </div>
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" 
              variant="h3" 
              color="inherit" 
              gutterBottom>
              {props.title}
            </Typography>
            <Typography 
              variant="h5" 
              color="inherit" 
              paragraph>
              {props.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}