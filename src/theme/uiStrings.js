import { switchCase } from '@babel/types';

import es from './locales/es.json';

export const fnUiStrings = locale => {
  const uiStrings = {};
  switch (locale) {
    case 'es':
      return es;
    case 'en':
      return es;
    default:
      return es;
  }
};

export function uiCopys() {
  const es = {
    CPY_USER_EXISTS: 'EMAIL ALREADY EXISTS',
    CPY_EXPLORE_WHAT_YOUR_DATA_SAYS: 'Explore what your data says',
    SALES_AND_RESERVATIONS: 'Sales and reservations',
    TOTAL_SALES: 'Total sales',
    BEST_ADVANTURES: 'Your nomaders likes these activities the most',
    SALES: 'Sales',
    BOOKINS: 'Bookings',
    MONTH: 'Month',
    INCOMES: 'Incomes',
    CPY_MONTS_SHORT: {
      1: 'ENE',
      2: 'FEB',
      3: 'MAR',
      4: 'ABR',
      5: 'MAY',
      6: 'JUN',
      7: 'JUL',
      8: 'AGO',
      9: 'SEP',
      10: 'OCT',
      11: 'NOV',
      12: 'DIC',
    },
  };

  return es;
}
