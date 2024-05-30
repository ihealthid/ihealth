import { Injectable } from '@nestjs/common';
import {
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
} from 'docx';

@Injectable()
export class PrescriptionDocument {
  async receipt() {
    const borders = {
      top: {
        style: BorderStyle.SINGLE,
      },
      bottom: {
        style: BorderStyle.SINGLE,
      },
      left: {
        style: BorderStyle.SINGLE,
      },
      right: {
        style: BorderStyle.SINGLE,
      },
    };

    const doc = new Document({
      sections: [
        {
          children: [
            new Table({
              rows: [
                new TableRow({
                  tableHeader: true,
                  children: [
                    new TableCell({
                      borders,
                      children: [
                        new Paragraph({
                          text: 'No',
                          scale: 1,
                        }),
                      ],
                    }),
                    new TableCell({
                      borders,
                      children: [new Paragraph('Nama Obat')],
                    }),
                    new TableCell({
                      borders,
                      children: [new Paragraph('Banyak')],
                    }),
                    new TableCell({
                      borders,
                      children: [new Paragraph('Aturan Pakai')],
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({
                      borders,
                      children: [new Paragraph('1')],
                    }),
                    new TableCell({
                      borders,
                      children: [new Paragraph('Paracetamol')],
                    }),
                    new TableCell({
                      borders,
                      children: [new Paragraph('10 Tablet')],
                    }),
                    new TableCell({
                      borders,
                      children: [new Paragraph('2 x 1 hari (sesudah makan)')],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });
    return Packer.toBuffer(doc);
  }
}
