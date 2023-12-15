import { BadRequestException, Injectable } from '@nestjs/common';
import { read, utils, write } from 'xlsx';

export const EXCEL_SERVICE = Symbol('EXCEL_SERVICE');

enum excelType {
  CSV = 'csv',
  XLSX = 'xlsx',
}

@Injectable()
export class ExcelService {
  async transform(file: Express.Multer.File): Promise<Buffer> {
    // write your code for transforming
    const rawData = await this.read(file.buffer);
    const buffer = await this.write(rawData, excelType.CSV);
    return buffer;
  }

  async read(fileBuffer: Buffer): Promise<any[]> {
    const workbook = read(fileBuffer);
    // customize your sheet name here
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = utils.sheet_to_json(worksheet, { header: 2 });
    return rawData;
  }

  async write(transformedData: any[], type: excelType): Promise<Buffer> {
    switch (type) {
      case excelType.CSV:
        return this.writeToCsvBuffer(transformedData);
      case excelType.XLSX:
        return this.writeToXlsxBuffer(transformedData);
      default:
        throw new BadRequestException(`${type} is not supported`);
    }
  }

  async writeToCsvBuffer(data: any[]): Promise<Buffer> {
    const worksheet = utils.json_to_sheet(data);
    return Promise.resolve(
      Buffer.from('\uFEFF' + utils.sheet_to_csv(worksheet)),
    );
  }

  async writeToXlsxBuffer(data: any[]): Promise<Buffer> {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet);
    const buffer = write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });
    return Promise.resolve(buffer);
  }
}
