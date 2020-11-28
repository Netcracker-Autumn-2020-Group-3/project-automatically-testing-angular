export class VariableValue {
  actionInstId: number;
  variableId: number;
  dataEntryId: number;

  constructor(actionInstId: number, variableId: number) {
    this.actionInstId = actionInstId;
    this.variableId = variableId;
    this.dataEntryId = -1;
  }
}
