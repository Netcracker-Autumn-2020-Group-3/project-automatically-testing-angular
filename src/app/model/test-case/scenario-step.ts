import {Compound} from './compound';
import {Action} from './action';

export class ScenarioStep {
  priority: number;
  compound?: Compound;
  actions: Action[];

  constructor(priority: number, compound: Compound, actions: Action[]) {
    this.priority = priority;
    this.compound = compound;
    this.actions = actions;
  }
}
