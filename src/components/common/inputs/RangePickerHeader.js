import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import UndoIcon from '@material-ui/icons/Undo';
import FilterListIcon from '@material-ui/icons/FilterList';
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RangePickerHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={props.handleBack ? props.handleBack : () => {}}
        >
          {props.handleBack ? <UndoIcon /> : <FilterListIcon />}
        </IconButton>

        <Typography>{props.title}</Typography>

        <IconButton
          aria-label="share"
          className={classes.expand}
          onClick={props.handleClose}
        >
          <CloseIcon />
        </IconButton>
      </CardActions>
    </div>
  );
}
