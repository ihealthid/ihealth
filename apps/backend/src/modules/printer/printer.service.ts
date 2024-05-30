import { Injectable } from '@nestjs/common';
import { exec, spawn } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { convertToHtml } from 'mammoth';
import * as htmlPdf from 'html-pdf';

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
        const cmd = spawn('lp', ['-d', printerName, res.filename, '-o', 'media=a5', '-o', 'orientation-requested=4']);
        cmd.stdout.on('close', () => {
          fs.rmSync(fileName);
        });
      });
  }
}
