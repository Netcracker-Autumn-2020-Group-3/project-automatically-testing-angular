import {DataEntry} from './data-entry';

export class Variable {
  id: number;
  name: string;
  dataEntry: DataEntry;

  constructor(id: number, name: string, dataEntry: DataEntry) {
    this.id = id;
    this.name = name;
    this.dataEntry = dataEntry;
  }
}
