export class VariableValue {
  actionInstanceId: number;
  variableId: number;
  dataEntryId: number;

  constructor(actionInstId: number, variableId: number, dataEntryId: number) {
    this.actionInstanceId = actionInstId;
    this.variableId = variableId;
    this.dataEntryId = dataEntryId;
  }
}
