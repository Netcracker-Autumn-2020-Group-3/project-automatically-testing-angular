export class VariableValue {
  actionInstanceId: number;
  variableId: number;
  dataEntryId: number;
  testScenarioId: number;

  constructor(actionInstId: number, variableId: number, testScenarioId: number) {
    this.actionInstanceId = actionInstId;
    this.variableId = variableId;
    this.dataEntryId = -1;
    this.testScenarioId = testScenarioId;
  }
}
