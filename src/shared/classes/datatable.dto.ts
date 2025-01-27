export class DataTableDto<T> {
  draw: number;
  order: any[];
  columns: any[];
  length: number;
  start: number;
  filtros: T;
}
