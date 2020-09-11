import React from 'react';
import styled from 'styled-components';
import Button from '../common/inputs/Button';
import { purple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Terminal from '../displays/Terminal';

const useStyles = makeStyles(theme => ({
  googleBtn: {
    margin: theme.spacing(1),
    justifyContent: 'flex-start',
    border: 'none',
    color: '#ffffff',
    padding: '14px 28px',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    minWidth: '273px',
    backgroundColor: '#DB4437',
    borderColor: '#DB4437',
    '&:hover': {
      backgroundColor: '#dc493d',
      borderColor: '#c23023',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#dc493d',
      borderColor: '#97251b',
    },
    '&:focus': {
      boxShadow: '#f3c2be',
    },
  },

  facebookBtn: {
    margin: theme.spacing(1),
    justifyContent: 'flex-start',
    border: 'none',
    color: '#ffffff',
    padding: '14px 28px',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    minWidth: '273px',

    backgroundColor: '#4267B2',
    borderColor: '#4267B2',
    '&:hover': {
      backgroundColor: '#3e61a7',
      borderColor: '#304b82',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#22365d',
      borderColor: '#a2b5dd',
    },
    '&:focus': {
      boxShadow: '#c7d3ea',
    },
  },
}));

export default function SocialLogin(props) {
  const classes = useStyles();

  return (
    <div
      style={{
        marginTop: '1.5em',
        marginBottom: '3em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '1.5em',
        paddingBottom: '1.5em',
      }}
    >
      <Button
        startIcon={<i className="fab fa-facebook-square fa-lg"></i>}
        type="submit"
        text="Login with Facebook"
        loading={false}
        className={classes.facebookBtn}
      />

      <Button
        startIcon={<i className="fab fa-google fa-lg"></i>}
        type="submit"
        text="Login with Google"
        loading={false}
        className={classes.googleBtn}
      />

      <Terminal
        userData={"passport.authenticate('faccebook)"}
        selected="All"
      ></Terminal>

      <p style={{ fontSize: 28 }}>Popular Strategies</p>
    </div>
  );
}
