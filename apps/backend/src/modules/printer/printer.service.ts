import { Injectable } from '@nestjs/common';
import { exec, spawn } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as htmlPdf from 'html-pdf';
import gs from 'ghostscript-js';

@Injectable()
export class PrinterService {
  public async getPrinter() {
    return new Promise<string>((resolve, reject) => {
      exec('lpstat -p -d', (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }

        if (stderr) {
          reject(stderr);
        }

        if (!stdout.includes('is idle')) {
          reject('Printer not found');
        }

        const [_, printerName] = stdout.split(' ');
        if (!printerName) {
          reject('Printer Name not found');
        }

        resolve(printerName);
      });
    });
  }

  public async printData(buffer: Buffer) {
    const printerName = await this.getPrinter();
    // const html = await convertToHtml({ buffer });
    const fileName = path.join(os.tmpdir(), Date.now().toString() + '.pdf');
    htmlPdf
      .create(buffer.toString('utf8'), {
        format: 'A4',
      })
      .toFile(fileName, (err, res) => {
        const cmd = spawn('lp', [
          '-d',
          printerName,
          res.filename,
          '-o',
          'media=a5',
          '-o',
          'orientation-requested=4',
        ]);
        cmd.stdout.on('close', () => {
          fs.rmSync(fileName);
        });
      });
  }

  async printToThermal(buffer: Buffer) {
    const data = [
      '      KLINIK MENTARI MEDIKA     ',
      '',
      'KONSULTASI DOKTER',
      '          50000',
      'PARACETAMOL 5MG x1 TAB',
      '           5000',
      '',
      '',
      '      HUBUNGI LAYANAN KAMI',
      '        08 222 111 01 45',
      '',
      '      SEMOGA LEKAS SEMBUH',
      '         TERIMA KASIH',
      '',
      ''
    ];

    data.forEach((line) => {
      exec(`echo "${line}" >> /dev/usb/lp0`, (err) => {
        if (err) console.log(err.message);
      });
    });
  }
}
