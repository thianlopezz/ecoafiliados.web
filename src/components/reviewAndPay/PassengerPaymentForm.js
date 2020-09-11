import React, { useState } from 'react';
import Select from '../common/inputs/Select';
import UsuarioAvatar from '../usuario/UsuarioAvatar';
import Input from '../common/inputs/Input';
import { email } from '../../helpers/validations';
import Button from '../common/inputs/Button';
import Section from '../common/wrappers/Section';
import Container from '../common/wrappers/Container';
import { DialogActions } from '@material-ui/core';
import { uiCopys } from '../../theme/uiStrings';

import SelectFilter from '../common/inputs/SelectFilter';

const PassengerPaymentForm = ({
  title,
  description,
  loading,
  reserva = {},
  onReservaChange,
  numberOptions = [],
  usuario,
  onSubmit,
  isAgency,
  onDelete,
  paisesOption,
}) => {
  let [errors, setErrors] = useState({});
  let [showNotas, setShowNotas] = useState(false);

  const submit = e => {
    e.preventDefault();
    setErrors({});
    let errors = {};
    let valid = true;
    // if (!reserva.tarjeta) {
    //   errors = { ...errors, tarjeta: 'Payment method is required' };
    //   valid = false;
    // }

    errors.pasajeros = reserva.pasajeros.map((pasajero, index) => {
      let nombre;
      let apellido;
      let correo;
      let idPais;

      if (!pasajero.nombre || pasajero.nombre.length == 0) {
        nombre = 'El nombre es requerido';
        valid = false;
      }

      if (!pasajero.apellido || pasajero.apellido.length == 0) {
        apellido = 'El apellido es requerido';
        valid = false;
      }

      // if (index == 0 && !pasajero.idPais) {
      //   idPais = 'El país es requerido';
      //   valid = false;
      // }

      // VALIDACION DE CORREO DE PASAJERO MAIN
      // if (index == 0 && !new RegExp(email).test(pasajero.correo)) {
      //   correo = 'Ingresa un correo válido';
      //   valid = false;
      // } else

      if (
        pasajero.correo &&
        pasajero.correo.length > 0 &&
        !new RegExp(email).test(pasajero.correo)
      ) {
        correo = 'Ingresa un correo válido';
        valid = false;
      }

      return { nombre, apellido, correo, idPais };
    });
    if (!valid) {
      setErrors({ ...errors });
      return;
    }

    if (!showNotas) reserva.notas = undefined;

    onSubmit(reserva);
  };

  let pasajerosAux = !isAgency ? 0 : 0;
  let indexAux = !isAgency ? 1 : 1;

  const onChange = e => {
    const auxPasajeros = reserva.pasajeros;

    reserva[e.target.name] = e.target.value;
    if (e.target.name == 'cupos') {
      reserva.total = undefined;

      if (+e.target.value > 0) {
        let noPasajeros = +e.target.value + pasajerosAux;
        reserva.pasajeros = [];
        for (let i = 0; i < noPasajeros; i++) {
          const auxPasajero = auxPasajeros[i];
          reserva.pasajeros.push(auxPasajero ? auxPasajero : {});
        }
      } else {
        reserva.pasajeros = [];
      }
    }
    onReservaChange(reserva);
  };

  const onChangePasajeros = (e, index) => {
    reserva.pasajeros[index][e.target.name] = e.target.value;
    onReservaChange(reserva);
  };

  return (
    <Section title={title} description={description}>
      <h3>¿Quién viene?</h3>
      <form onSubmit={submit} noValidate>
        <Section>
          <Select
            disabled={reserva.idCompra}
            label="Número de pasajeros"
            name="cupos"
            variant="outlined"
            value={reserva.cupos}
            options={numberOptions}
            onChange={onChange}
            error={errors.cupos}
          />

          <div className="form-group">
            <h5>Detalle de pasajeros</h5>
            {/* <p>
              The info entered will be used to add people to this reservation.
            </p> */}
            <p>
              La información ingresada será utilizada para ingresar pasajeros a
              esta reserva.
            </p>
          </div>
          <hr className="w-100 my-1 mb-2" />

          {usuario && (
            <>
              {/* <hr className="w-100 my-1 mb-2" /> */}

              <div className="col-12 px-0">
                <div className="d-flex">
                  <p className="font-weight-bold my-auto">{`${usuario.nombre} ${usuario.apellido}`}</p>
                  <div className="ml-auto">
                    <UsuarioAvatar usuario={usuario} />
                  </div>
                </div>
              </div>
              <hr className="w-100 my-1 mb-3" />
            </>
          )}

          {reserva.pasajeros &&
            reserva.pasajeros.map((pasajero, index) => (
              <div className="w-100 mb-3">
                <div className="form-group">
                  {index != 0 ? (
                    <h5>Pasajero {index + indexAux}</h5>
                  ) : (
                    isAgency && <h5>Pasajero principal</h5>
                  )}
                  {index == 0 && (
                    <p>
                      Mantén a tus pasajeros informados. Ingresa su información
                      y les enviaremos un correo con el itinerario.
                    </p>
                    // <p>
                    //   Keep your passengers in the loop. Add their email and
                    //   we'll send them the itinerary.
                    // </p>
                  )}
                </div>
                {index != 0 ? (
                  <div className="form-row">
                    <div className="col-6">
                      <Input
                        disabled={reserva.idCompra}
                        label="Nombre"
                        name={`nombre`}
                        value={pasajero.nombre}
                        onChange={e => onChangePasajeros(e, index)}
                        variant="outlined"
                        error={
                          errors.pasajeros && errors.pasajeros[index]
                            ? errors.pasajeros[index].nombre
                            : null
                        }
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        disabled={reserva.idCompra}
                        label="Apellido"
                        name={`apellido`}
                        value={pasajero.apellido}
                        onChange={e => onChangePasajeros(e, index)}
                        variant="outlined"
                        error={
                          errors.pasajeros && errors.pasajeros[index]
                            ? errors.pasajeros[index].apellido
                            : null
                        }
                      />
                    </div>
                    <div className="col-4">
                      <Input
                        disabled={reserva.idCompra}
                        label="Indentificación (Opcional)"
                        name={`identificacion`}
                        value={pasajero.identificacion}
                        onChange={e => onChangePasajeros(e, index)}
                        variant="outlined"
                        error={
                          errors.pasajeros && errors.pasajeros[index]
                            ? errors.pasajeros[index].identificacion
                            : null
                        }
                      />
                    </div>

                    <div className="col-4">
                      <SelectFilter
                        disabled={reserva.idCompra}
                        className="mt-2"
                        label="País (Opcional)"
                        name="idPais"
                        variant="outlined"
                        value={pasajero.idPais}
                        options={paisesOption}
                        onChange={(e, value) =>
                          onChangePasajeros(
                            {
                              target: { name: 'idPais', value: value.value },
                            },
                            index
                          )
                        }
                        error={
                          errors.pasajeros && errors.pasajeros[index]
                            ? errors.pasajeros[index].idPais
                            : null
                        }
                      />
                    </div>
                    <div className="col-4">
                      <Input
                        disabled={reserva.idCompra}
                        label="Correo electrónico (Opcional)"
                        name={`correo`}
                        value={pasajero.correo}
                        onChange={e => onChangePasajeros(e, index)}
                        variant="outlined"
                        error={
                          errors.pasajeros && errors.pasajeros[index]
                            ? errors.pasajeros[index].correo
                            : null
                        }
                      />
                    </div>
                  </div>
                ) : (
                  isAgency && (
                    <div className="form-row">
                      <div className="col-6">
                        <Input
                          disabled={reserva.idCompra}
                          label="Nombre"
                          name={`nombre`}
                          value={pasajero.nombre}
                          onChange={e => onChangePasajeros(e, index)}
                          variant="outlined"
                          error={
                            errors.pasajeros && errors.pasajeros[index]
                              ? errors.pasajeros[index].nombre
                              : null
                          }
                        />
                      </div>
                      <div className="col-6">
                        <Input
                          disabled={reserva.idCompra}
                          label="Apellido"
                          name={`apellido`}
                          value={pasajero.apellido}
                          onChange={e => onChangePasajeros(e, index)}
                          variant="outlined"
                          error={
                            errors.pasajeros && errors.pasajeros[index]
                              ? errors.pasajeros[index].apellido
                              : null
                          }
                        />
                      </div>
                      <div className="col-4">
                        <Input
                          disabled={reserva.idCompra}
                          label="Indentificación (Opcional)"
                          name={`identificacion`}
                          value={pasajero.identificacion}
                          onChange={e => onChangePasajeros(e, index)}
                          variant="outlined"
                          error={
                            errors.pasajeros && errors.pasajeros[index]
                              ? errors.pasajeros[index].identificacion
                              : null
                          }
                        />
                      </div>
                      <div className="col-4">
                        <SelectFilter
                          disabled={reserva.idCompra}
                          className="mt-2"
                          label="País (Opcional)"
                          name="idPais"
                          variant="outlined"
                          value={pasajero.idPais}
                          options={paisesOption}
                          onChange={(e, value) =>
                            onChangePasajeros(
                              {
                                target: { name: 'idPais', value: value.value },
                              },
                              index
                            )
                          }
                          error={
                            errors.pasajeros && errors.pasajeros[index]
                              ? errors.pasajeros[index].idPais
                              : null
                          }
                        />
                      </div>
                      <div className="col-4">
                        <Input
                          disabled={reserva.idCompra}
                          label="Correo electrónico (Opcional)"
                          name={`correo`}
                          value={pasajero.correo}
                          onChange={e => onChangePasajeros(e, index)}
                          variant="outlined"
                          error={
                            errors.pasajeros && errors.pasajeros[index]
                              ? errors.pasajeros[index].correo
                              : null
                          }
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}

          <div className="form-group">
            <div className="form-row">
              {!reserva.idCompra && (
                <div className="col-12 mb-2">
                  <a
                    href="javascript:;"
                    onClick={() => setShowNotas(!showNotas)}
                  >
                    {!showNotas ? 'Agregar notas' : 'Cancelar'}
                  </a>
                </div>
              )}
              {(showNotas || reserva.idCompra) && (
                <div className="col-12">
                  <Input
                    disabled={reserva.idCompra}
                    label="Notas"
                    name="notas"
                    variant="outlined"
                    multiline={true}
                    rows={3}
                    placeholder="Ingresa notas adicionales para tu reserva"
                    value={reserva.notas}
                    onChange={onChange}
                  />
                </div>
              )}
            </div>
          </div>
        </Section>
        <DialogActions>
          {!reserva.idCompra ? (
            <Button
              type="submit"
              loading={loading}
              color="primary"
              variant="contained"
              right
            >
              Confirmar reserva
            </Button>
          ) : (
            <Button
              loading={loading}
              color="secondary"
              variant="contained"
              onClick={onDelete}
              right
            >
              Eliminar reserva
            </Button>
          )}
        </DialogActions>
      </form>
    </Section>
  );
};

export default PassengerPaymentForm;
