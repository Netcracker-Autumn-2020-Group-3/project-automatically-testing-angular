export class CompoundAction{
  id: number;
  compoundId: number;
  actionId: number;
  priority: number;

  constructor(compoundId: number, actionId: number, priority: number) {
    this.compoundId = compoundId;
    this.actionId = actionId;
    this.priority = priority;
  }

}
