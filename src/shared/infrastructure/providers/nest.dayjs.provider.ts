import { Injectable } from '@nestjs/common';
import { IDayJsProvider } from 'src/shared/application/providers/dayjs.provider';
import dayjs from 'dayjs';

@Injectable()
export class NestDayJsProvider implements IDayJsProvider {
  add(value: number, unit?: dayjs.ManipulateType): dayjs.Dayjs {
    return dayjs().add(value, unit);
  }

  isBefore(date?: dayjs.ConfigType, unit?: dayjs.OpUnitType): boolean {
    return dayjs().isBefore(date, unit);
  }
}
