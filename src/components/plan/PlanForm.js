import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BasicInfoForm from './BasicInfoForm';
import MainPictureForm from './MainPictureForm';
import IncluidosForm from './IncluidosForm';
import ItineraryForm from './ItineraryForm';
import LugaresForm from './LugaresForm';
import ActividadesForm from './ActividadesForm';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// import LocationForm from './LocationForm';
// import BrandInfoForm from './BrandInfoForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      className="w-100"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    className: 'p-4',
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const PlanForm = ({
  loading,
  plan,
  step,
  lugares,
  incluidosOption,
  diasOption,
  lugaresOption,
  actividadesOption,
  onPlanChange,
  onChangeStepForm,
  onSubmitBasicInfo,
  onSubmitMainPicture,
  onSubmitIncluidos,
  onSubmitItinerario,
  onSubmitLugares,
  onSubmitActividades,
  onFileTooBig,
}) => {
  // const [tabValue, setTabVAlue] = useState(step || 0);

  const classes = useStyles();

  const handleTabChange = (event, newValue) => {
    // setTabVAlue(newValue);
    onChangeStepForm(newValue);
  };

  return (
    <div className="w-100">
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={step}
          onChange={handleTabChange}
          aria-label="Vertical tabs"
          className={classes.tabs}
        >
          <Tab label="Información básica" {...a11yProps(0)} />
          {/* <Tab hidden={!plan.idPlan} label="Itinerary" {...a11yProps(1)} /> */}
          <Tab hidden={!plan.idPlan} label="¿Qué haremos?" {...a11yProps(1)} />
          <Tab hidden={!plan.idPlan} label="¿Qué incluye?" {...a11yProps(2)} />
          <Tab
            hidden={!plan.idPlan}
            label="¿Dónde estaremos?"
            {...a11yProps(3)}
          />
          <Tab
            hidden={!plan.idPlan}
            label="Foto de portada"
            {...a11yProps(4)}
          />
        </Tabs>
        <TabPanel value={step} index={0}>
          <BasicInfoForm
            loading={loading}
            onSubmit={onSubmitBasicInfo}
            plan={plan}
            onPlanChange={onPlanChange}
          />
        </TabPanel>
        {/* <TabPanel value={tabValue} index={1}>
          <ItineraryForm
            onSubmit={onSubmitItinerario}
            loading={loading}
            diasOption={diasOption}
            plan={plan}
            onPlanChange={onPlanChange}
          />
        </TabPanel> */}
        <TabPanel value={step} index={1}>
          <ActividadesForm
            onSubmit={onSubmitActividades}
            actividadesOption={actividadesOption}
            loading={loading}
            plan={plan}
            onPlanChange={onPlanChange}
          />
        </TabPanel>
        <TabPanel value={step} index={2}>
          <IncluidosForm
            onSubmit={onSubmitIncluidos}
            incluidosOption={incluidosOption}
            loading={loading}
            plan={plan}
            onPlanChange={onPlanChange}
          />
        </TabPanel>
        <TabPanel value={step} index={3}>
          <LugaresForm
            onSubmit={onSubmitLugares}
            loading={loading}
            lugares={lugares}
            lugaresOption={lugaresOption}
            plan={plan}
            onPlanChange={onPlanChange}
          />
        </TabPanel>
        <TabPanel value={step} index={4}>
          <MainPictureForm
            onSubmit={onSubmitMainPicture}
            loading={loading}
            plan={plan}
            onPlanChange={onPlanChange}
            onFileTooBig={onFileTooBig}
          />
        </TabPanel>
      </div>
    </div>
  );
};

PlanForm.propTypes = {
  usuario: PropTypes.object,
  onPlanChange: PropTypes.func,
  onSubmitBasicInfo: PropTypes.func,
  onCancel: PropTypes.func,
  IncluidosOption: PropTypes.array,
  step: PropTypes.number,
};

export default PlanForm;
