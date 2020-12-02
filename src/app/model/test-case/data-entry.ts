export class DataEntry {
  id: number;
  value: string;
  dataSetId: number;

  constructor(id: number, value: string, dataSetId: number) {
    this.id = id;
    this.value = value;
    this.dataSetId = dataSetId;
  }

}
