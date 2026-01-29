import { ConfigType, ManipulateType, OpUnitType } from 'dayjs';

export abstract class IDayJsProvider {
  abstract add(value: number, unit?: ManipulateType): Date;
  abstract isBefore(date?: ConfigType, unit?: OpUnitType): boolean;
}
