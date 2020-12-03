export class DataEntry {
  id: number;
  value: string;
  data_set_id: number;

  constructor(id: number, value: string, data_set_id: number) {
    this.id = id;
    this.value = value;
    this.data_set_id = data_set_id;
  }

}
