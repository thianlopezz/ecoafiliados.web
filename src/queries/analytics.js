import { gql } from 'apollo-boost';

const GET_BI_ACTIVITIES = gql`
  mutation(
    $idAgencia: Int!
    $fechaIni: String!
    $fechaFin: String!
    $action: String!
  ) {
    getBiActivities(
      idAgencia: $idAgencia
      fechaIni: $fechaIni
      fechaFin: $fechaFin
      action: $action
    ) {
      idActividad
      actividad
      total
    }
  }
`;

const GET_BI_COMPRAS_AND_RESERVAS_MONTHLY = gql`
  mutation(
    $idAgencia: Int!
    $fechaIni: String!
    $fechaFin: String!
    $action: String!
  ) {
    getBiComprasAndReservas(
      idAgencia: $idAgencia
      fechaIni: $fechaIni
      fechaFin: $fechaFin
      action: $action
    ) {
      reservas
      compras
      month
      income
    }
  }
`;

export { GET_BI_ACTIVITIES, GET_BI_COMPRAS_AND_RESERVAS_MONTHLY };
