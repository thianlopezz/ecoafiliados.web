import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePassengerReport = ({ pasajeros }) => {
  try {
    const fileName = moment().format('DDMMYYYHHmmss') + '.pdf';
    // Create a new PDFDocument

    const rows = pasajeros.map(pasajero => {
      return [
        { text: pasajero.nombre },
        { text: pasajero.apellido },
        { text: pasajero.identificacion || '' },
        { text: pasajero.pais || '' },
        {
          text: moment(pasajero.feCreacion).format('ddd DD, MMM YYYY'),
        },
      ];
    });

    const content = [
      {
        // style: "tableExample",
        table: {
          body: [
            [
              'Nombre',
              'Apellido',
              'Identificación',
              'Pais',
              'Fecha de reserva',
            ],
            ...rows,
          ],
        },
      },
    ];

    const documentDefinition = {
      pageSize: 'A4',
      // pageOrientation: 'landscape',
      content,
    };

    // console.log(JSON.stringify(content));
    pdfMake.createPdf(documentDefinition).download(fileName);
  } catch (e) {
    console.log(new Error(e));
  }
};
