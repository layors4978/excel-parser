import {
  Inject,
  Controller,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { EXCEL_SERVICE, ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('excel')
export class ExcelController {
  constructor(
    @Inject(EXCEL_SERVICE)
    private readonly excelService: ExcelService,
  ) {}

  @UseInterceptors(FileInterceptor('source'))
  @Get('transform')
  async transform(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.excelService.transform(file);
    res
      .set('Access-Control-Expose-Headers', 'Content-Disposition')
      .status(200)
      // customize your filetype here (csv or xlsx)
      .attachment('result.csv')
      .send(buffer);
  }
}
