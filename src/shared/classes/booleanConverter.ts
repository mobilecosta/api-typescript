import { ConvertBoolean } from '../@types/convert-boolean.type';

export class BooleanConverter {
  static convertBooleanToDataBase(viewValue?: boolean | string) {
    return Object.entries(ConvertBoolean).find(
      (value) => value[0] === String(!!viewValue),
    )[1];
  }

  static convertBooleanToView(dbValue: string | null) {
    if (!dbValue) return false;

    return (
      Object.entries(ConvertBoolean)
        .find((value) => value[1] === dbValue)[0]
        .toString() === 'true'
    );
  }
}
