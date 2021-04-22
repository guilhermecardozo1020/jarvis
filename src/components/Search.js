import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "6px 8px",
    display: "block",
    marginBottom: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  flexSearch: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
  }
}));

export default function Search() {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.root}>
    <div className={classes.flexSearch}>
      <InputBase
        className={classes.input}
        placeholder="Pesquisar colaborador"
        inputProps={{ "aria-label": "Pesquisar colaborador" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      </div>
    </Paper>
  );
}