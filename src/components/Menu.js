import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    boxShadow: '5px 2px 8px rgb(0 0 0 / 15%) !important',
  },
});

const CssTab = withStyles({
  root: {
      '& .MuiTab-textColorSecondary.Mui-selected': {
          color: '#007f00',
      },
      '& [data-info~="PrivateTabIndicator-colorSecondary"]': {
        backgroundColor: '#007f00',
      },
      '& .MuiTab-textColorSecondary': {
        color: 'rgba(0, 127, 0, 0.74)',
      },
      '& .MuiTab-wrapper': {
        textTransform: 'capitalize',
        fontSize: '1.14em',
      },
      '& .MuiPaper-elevation1': {
        boxShadow: '0 3px 10px rgb(0 0 0 / 16%) !important'
      }
  },
})(Tabs);

export default function Menu(props) {
  const classes = useStyles();
  let history = useHistory();
  const [value, setValue] = React.useState(props.tabAtiva);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const colaboradores = () => {
    history.push("/colaboradores")
  }

  const home = () => {
    history.push("/home")
  }

  const escalas = () => {
    history.push("/escalas")
  }

  return (
    <Paper square className={classes.root}>
      <CssTab
        TabIndicatorProps={{
          style: { background: "#007f00"}
        }}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab onClick={home} icon={<HomeIcon />} label="Home"/>
        <Tab onClick={escalas} icon={<QueryBuilderIcon />} label="Gerar Escalas"/>
        <Tab onClick={colaboradores} icon={<PeopleIcon />} label="Colaboradores" />
      </CssTab>
    </Paper>
  );
}
