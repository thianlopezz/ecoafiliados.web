import React, { useState } from 'react';
import FullModal from '../common/modals/FullModal';
import OrderDetailTable from './OrderDetailTable';
import Section from '../common/wrappers/Section';
import Button from '../common/inputs/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Avatar, CircularProgress } from '@material-ui/core';
import TitleDescription from '../common/TitleDescription';

export default function OrderDetailModal({
  isOpen,
  loading,
  order,
  onClose,
  onChangeOrderState,
  showConfirm,
}) {
  const { productos } = order;

  return (
    <FullModal isOpen={isOpen} onClose={onClose}>
      <div className="container">
        <Section
          title="Detalle del pedido"
          description="Estos son los productos que debes preparar"
        >
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <h4>Cliente</h4>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex mb-4">
                    <Avatar
                      src={order.fotoUsuario}
                      style={{ width: '120px', height: '120px' }}
                    />
                    <div className="mr-auto" style={{ display: 'flex' }}>
                      <div className="m-auto">
                        {order.nombre && (
                          <h5 className="text-muted">{order.nombre}</h5>
                        )}
                        {order.contactoUsuario && (
                          <p className="text-muted">
                            <span className="mx-1">
                              <i class="fas fa-phone-square-alt"></i>
                            </span>
                            <a
                              href={`https://wa.me/${order.contactoUsuario}?text=Hola`}
                            >
                              {order.contactoUsuario}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <h4>Datos de facturación</h4>
              <TitleDescription
                title="Nombre"
                description={order.invoice?.nombre}
              />
              <TitleDescription
                title="Identificación"
                description={order.invoice?.identificacion}
              />
              <TitleDescription
                title="Correo"
                description={order.invoice?.correo}
              />
              {order.invoice?.contacto && (
                <TitleDescription
                  title="Teléfono"
                  description={order.invoice?.contacto}
                />
              )}
              {order.invoice?.direccion && (
                <TitleDescription
                  title="Dirección"
                  description={order.invoice?.direccion}
                />
              )}
            </div>
            <div className="col-sm-12 col-md-4">
              <h4>Estado</h4>
              <p>{order.status}</p>
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  {order.estado == 'pending' && (
                    <>
                      <Button
                        type="button"
                        onClick={() =>
                          showConfirm({
                            titulo: 'Aceptar pedido',
                            mensaje: '¿Estás seguro de aceptar el pedido?',
                            confirmText: 'Aceptar',
                            cancelText: 'Cerrar',
                            onConfirm: () =>
                              onChangeOrderState({
                                idOrden: order.idOrden,
                                idWoo: order.idWoo,
                                idUsuario: order.idUsuario,
                                idComercio: order.idComercio,
                                estado: 'processing',
                              }),
                          })
                        }
                        variant="contained"
                        color="primary"
                      >
                        <CheckIcon />
                      </Button>{' '}
                      <Button
                        type="button"
                        onClick={() =>
                          showConfirm({
                            titulo: 'Cancelar pedido',
                            mensaje: '¿Estás seguro de cancelar el pedido?',
                            confirmText: 'Aceptar',
                            cancelText: 'Cerrar',
                            onConfirm: () =>
                              onChangeOrderState({
                                idOrden: order.idOrden,
                                idWoo: order.idWoo,
                                idUsuario: order.idUsuario,
                                idComercio: order.idComercio,
                                estado: 'cancelled',
                              }),
                          })
                        }
                        variant="contained"
                        color="accent"
                      >
                        <CloseIcon />
                      </Button>
                      <hr className="w-100"></hr>
                      <h4>Lugar de entrega</h4>
                      <p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${order.location.latitud},${order.location.longitud}`}
                          target="_blank"
                        >
                          {order.location.referencia}
                        </a>
                      </p>
                    </>
                  )}
                  {order.estado == 'processing' && (
                    <Button
                      type="button"
                      onClick={() =>
                        showConfirm({
                          titulo: 'Pedido listo',
                          mensaje: '¿El pedido se encuentra listo?',
                          confirmText: 'Sí',
                          cancelText: 'Cerrar',
                          onConfirm: () =>
                            onChangeOrderState({
                              idOrden: order.idOrden,
                              idWoo: order.idWoo,
                              idUsuario: order.idUsuario,
                              idComercio: order.idComercio,
                              estado: 'order-ready',
                            }),
                        })
                      }
                      variant="contained"
                      color="primary"
                      startIcon={<CheckIcon />}
                    >
                      Pedido listo
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          <Section title="Productos">
            <OrderDetailTable
              productos={productos}
              totalOrden={order.totalOrden}
            />
          </Section>

          <Section
            title="Notas del pedido"
            description="Pon atención a las notas de tu cliente"
          >
            {order.notas ? (
              <p>{order.notas}</p>
            ) : (
              <div className="text-center">
                <h5>
                  <i className="far fa-sticky-note" />
                </h5>
                <p>No hay notas.</p>
              </div>
            )}
          </Section>
        </Section>
      </div>
    </FullModal>
  );
}
