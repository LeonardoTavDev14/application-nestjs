import { ConfigType, Dayjs, ManipulateType, OpUnitType } from 'dayjs';

export abstract class IDayJsProvider {
  abstract add(value: number, unit?: ManipulateType): Dayjs;
  abstract isBefore(date?: ConfigType, unit?: OpUnitType): boolean;
}
