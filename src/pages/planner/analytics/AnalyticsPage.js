import React, { useState, useEffect } from 'react';
import Container from '../../../components/common/wrappers/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import TodayIcon from '@material-ui/icons/Today';
import LoadieWrap from '../../../components/common/wrappers/LoadieWrap';
import { palette, CSS_HELPERS_REACT } from '../../../theme';
import CardHeader from '@material-ui/core/CardHeader';
import { uiCopys } from '../../../theme/uiStrings';
import ConsolidadoChart from '../../../components/analytics/ConsolidadoChart';
import Grid from '@material-ui/core/Grid';
import RangePicker from '../../../components/common/inputs/RangePicker';
import moment from 'moment';
import {
  ComprasChart,
  ActivitiesChart,
} from '../../../components/analytics/ComprasCharts';

import JSONTree from 'react-json-tree';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {
  GET_BI_ACTIVITIES,
  GET_BI_COMPRAS_AND_RESERVAS_MONTHLY,
} from '../../../queries/analytics';
import { getSesion } from '../../../helpers/sesion';
import DateRangePicker from '../../../components/common/inputs/DateRangePicker';

const AnalyticsPage = props => {
  const classes = useStyles();

  //METODOS GQL
  const [
    getBiComprasAndReservas,
    {
      data: biComprasYreservas,
      loading: biComprasYreservasLoad,
      error: biComprasYreservasError,
    },
  ] = useMutation(GET_BI_COMPRAS_AND_RESERVAS_MONTHLY);

  const [
    getBiActivities,
    { data: biActivities, loading: biActivitiesLoad, error: biActivitiesError },
  ] = useMutation(GET_BI_ACTIVITIES);

  const [fechaIni, setFechaIni] = useState(moment().subtract(1, 'months'));
  const [fechaFin, setFechaFin] = useState(moment());

  //TRIGGER METODOS
  const handleChange = ({ fechaIni, fechaFin }) => {
    setFechaIni(fechaIni);
    setFechaFin(fechaFin);

    const ini = moment(fechaIni).format('DD/MM/YYYY');
    const fin = moment(fechaFin).format('DD/MM/YYYY');
    const sesion = getSesion();

    const { idPlanner } = sesion.agencia;

    const payload2 = {
      idAgencia: idPlanner,
      fechaIni: ini,
      fechaFin: fin,
      action: 'bi_activities_per_agency',
    };
    const payload1 = {
      idAgencia: idPlanner,
      fechaIni: ini,
      fechaFin: fin,
      action: 'bi_compras_and_reservas_monthly',
    };

    getBiComprasAndReservas({ variables: payload1 })
      .then(({ data }) => {})
      .catch(err => console.log(err));
    getBiActivities({ variables: payload2 })
      .then(({ data }) => {})
      .catch(err => console.log(err));
  };

  // useEffect(() => {
  //   handleChange({ fechaIni, fechaFin });
  // });

  const data1 =
    biComprasYreservas && biComprasYreservas.getBiComprasAndReservas
      ? [
          {
            id: uiCopys().BOOKINS,
            color: palette.primary.main,
            data: biComprasYreservas.getBiComprasAndReservas.map((item, i) => ({
              x: uiCopys().CPY_MONTS_SHORT[item.month],
              y: item.reservas,
            })),
          },
          {
            id: uiCopys().SALES,
            color: palette.secondary.main,
            data: biComprasYreservas.getBiComprasAndReservas.map((item, i) => ({
              x: uiCopys().CPY_MONTS_SHORT[item.month],
              y: item.compras,
            })),
          },
        ]
      : [];

  const data2 =
    biActivities && biActivities.getBiActivities
      ? biActivities.getBiActivities.map((item, i) => ({
          id: item.actividad,
          label: item.actividad,
          value: item.total,
        }))
      : [];

  const data3 =
    biComprasYreservas && biComprasYreservas.getBiComprasAndReservas
      ? biComprasYreservas.getBiComprasAndReservas.map((item, i) => ({
          [uiCopys().MONTH]: uiCopys().CPY_MONTS_SHORT[item.month],
          total: item.income,
        }))
      : [];

  return (
    <Container title="Observa lo que dicen tus datos">
      {/* {idAgencia && <JSONTree data={idAgencia} />} */}
      {/* <RangePicker handleChange={handleChange}></RangePicker> */}
      <div className="row">
        <div className="col-sm-12 col-md-5 col-lg-3">
          <DateRangePicker
            label="Rango de fechas"
            autoOk
            value={[fechaIni, fechaFin]}
            onChange={value =>
              handleChange({ fechaIni: value[0], fechaFin: value[1] })
            }
          />
        </div>
      </div>

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6}>
          <LoadieWrap mini loading={biComprasYreservasLoad}>
            <Card className={classes.card}>
              <CardActions disableSpacing>
                <CardHeader
                  title="Ventas y pasajeros"
                  subheader={`Desde: ${moment(fechaIni).format(
                    'DD/MM/YYYY'
                  )} hasta: ${moment(fechaFin).format('DD/MM/YYYY')}`}
                />
                {/* <IconButton
                  className={classes.floatRight}
                  onClick={() => {}}
                  aria-label="show more"
                >
                  <TodayIcon />
                </IconButton> */}
              </CardActions>
              <CardContent>
                <ConsolidadoChart data={data1} />
              </CardContent>
            </Card>
          </LoadieWrap>
        </Grid>

        <Grid item xs={6}>
          <LoadieWrap mini loading={biComprasYreservasLoad}>
            <Card className={classes.card}>
              <CardActions disableSpacing>
                <CardHeader
                  title="Total ventas"
                  subheader={`Desde: ${moment(fechaIni).format(
                    'DD/MM/YYYY'
                  )} hasta: ${moment(fechaFin).format('DD/MM/YYYY')}`}
                />
              </CardActions>
              <CardContent>
                <ComprasChart
                  colors={palette.secondary.main}
                  labelTextColor={palette.secondary.contrastText}
                  ejeX={'Meses'}
                  ejeY={'Ganancias'}
                  keys={['total']}
                  data={data3}
                />
              </CardContent>
            </Card>
          </LoadieWrap>
        </Grid>

        <Grid item xs={6}>
          <LoadieWrap mini loading={biActivitiesLoad}>
            <Card className={classes.card}>
              <CardActions disableSpacing>
                <CardHeader
                  title="Actividades que gustan más"
                  subheader={`Desde: ${moment(fechaIni).format(
                    'DD/MM/YYYY'
                  )} hasta: ${moment(fechaFin).format('DD/MM/YYYY')}`}
                />
                {/* <IconButton
                  className={classes.floatRight}
                  onClick={() => {}}
                  aria-label="show more"
                >
                  <TodayIcon />
                </IconButton> */}
              </CardActions>
              <CardContent>
                <ActivitiesChart data={data2} />
              </CardContent>
            </Card>
          </LoadieWrap>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    ...CSS_HELPERS_REACT.BOX_SHADOW,
    borderRadius: '.6em',
  },
  floatRight: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginLeft: '2em',
  },
}));

export default AnalyticsPage;
