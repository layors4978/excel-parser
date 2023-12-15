import { Module } from '@nestjs/common';
import { EXCEL_SERVICE, ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';

const modules = [
  {
    provide: EXCEL_SERVICE,
    useClass: ExcelService,
  },
];

@Module({
  providers: modules,
  controllers: [ExcelController],
})
export class ExcelModule {}
