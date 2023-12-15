import { Injectable } from '@nestjs/common';
import { read, utils } from 'xlsx';

export const EXCEL_SERVICE = Symbol('EXCEL_SERVICE');

@Injectable()
export class ExcelService {
  async transform(file: Express.Multer.File): Promise<Buffer> {
    // write your code for transforming
    return;
  }

  async read(fileBuffer: Buffer): Promise<any[]> {
    const workbook = read(fileBuffer);
    // customize your sheet name here
    const sheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[sheetName];
    const rawData = utils.sheet_to_json(workSheet, { header: 2 });
    return rawData;
  }
}
