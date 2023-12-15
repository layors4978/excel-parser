import { Injectable } from '@nestjs/common';
import { read } from 'xlsx';

export const EXCEL_SERVICE = Symbol('EXCEL_SERVICE');

@Injectable()
export class ExcelService {
  async transform(file: Express.Multer.File): Promise<Buffer> {
    // write your code for transforming
    return;
  }
}
