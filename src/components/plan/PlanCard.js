import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Right from '@material-ui/icons/ChevronRight';
import { status } from '../../theme';

import {
  CardActions,
  Avatar,
  CardHeader,
  IconButton,
  FormControlLabel,
  Switch,
  Chip,
  withStyles,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ImageCard from '../common/cards/ImageCard';
import { PLACEDEF } from '../../constants';

const useStyles = makeStyles({
  card: {
    width: '100%',
  },
  media: {
    height: 140,
  },
});

const PlanCard = ({
  idPlan,
  plan,
  descripcion,
  idPlanner,
  agencia,
  ciudad,
  logoAgencia,
  isInfoCompleted,
  urlFoto,
  onClick,
  onClickPlanner,
  onNewDate,
  onEdit,
  onWatch,
  onDelete,
  showCardHeader = true,
  showStatus = false,
}) => {
  return (
    <div className="w-100">
      {showCardHeader && (
        <CardHeader
          className="px-1 py-2"
          style={onClickPlanner && { cursor: 'pointer' }}
          onClick={() => (onClickPlanner ? onClickPlanner(idPlanner) : null)}
          avatar={
            logoAgencia ? (
              <Avatar aria-label="recipe" src={logoAgencia}></Avatar>
            ) : (
              <Avatar aria-label="recipe" src={logoAgencia}>
                {agencia && agencia[0]}
              </Avatar>
            )
          }
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIcon /> */}
            </IconButton>
          }
          title={agencia}
          subheader={ciudad}
        />
      )}
      <ImageCard
        id={idPlan}
        title={plan}
        description={descripcion}
        image={urlFoto || PLACEDEF}
        imgclassName="card-img-20"
        onClick={() => onClick(idPlan)}
      />
      {showStatus &&
        (isInfoCompleted ? (
          <>
            <Chip
              // icon={<FaceIcon />}
              label="Disponible"
              clickable
              className="mb-1 mt-2"
              size="small"
              color="primary"
              // onDelete={handleDelete}
              // deleteIcon={<DoneIcon />}
              variant="outlined"
            />
            <p>Listo para añadir fechas</p>
          </>
        ) : (
          <>
            <DangerChip
              // icon={<FaceIcon />}
              label="En progreso"
              clickable
              className="mb-1"
              size="small"
              // onDelete={handleDelete}
              // deleteIcon={<DoneIcon />}
              variant="outlined"
            />
            <p>Continua con la creación de tu plan</p>
          </>
        ))}
      {onNewDate && (
        <>
          <hr className="mt-2 mb-3"></hr>
          <div
            onClick={e => onNewDate(idPlan)}
            style={{ cursor: 'pointer' }}
            className="d-flex"
          >
            <p>
              <Link to="#">Agrega una nueva fecha</Link>
            </p>
            <IconButton
              aria-label="go"
              style={{ borderRadius: 'unset', backgroundColor: 'unset' }}
              className="h-100 ml-auto p-0"
              size="medium"
            >
              <Right fontSize="inherit" />
            </IconButton>
          </div>
          <hr className="mt-3 mb-1"></hr>
        </>
      )}
      {(onEdit || onWatch || onDelete) && (
        <CardActions className="px-0">
          {onEdit && (
            <Link
              color="default"
              className="mr-2"
              onClick={e => onEdit(idPlan)}
            >
              {isInfoCompleted ? 'Editar' : 'Continuar'}
            </Link>
          )}
          {isInfoCompleted == 1 && onWatch && (
            <Link
              color="default"
              className="mr-2"
              onClick={e => onWatch(idPlan)}
            >
              Ver
            </Link>
          )}
          {onDelete && (
            <Link
              color="default"
              className="mr-2"
              onClick={e => onDelete(idPlan)}
            >
              Eliminar
            </Link>
          )}
        </CardActions>
      )}
    </div>
  );
};

const DangerChip = withStyles(theme => ({
  root: {
    color: status.danger,
    backgroundColor: theme.palette.getContrastText(status.danger),
    borderColor: status.danger,
  },
}))(Chip);

PlanCard.propTypes = {
  idPlan: PropTypes.number,
  plan: PropTypes.string,
  descripcion: PropTypes.string,
  agencia: PropTypes.string,
  ciudad: PropTypes.string,
  logoAgencia: PropTypes.string,
  foto: PropTypes.string,
  onClick: PropTypes.func,
};

export default PlanCard;
