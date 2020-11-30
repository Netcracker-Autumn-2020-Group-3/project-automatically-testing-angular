import {Variable} from './variable';

export class ActionDto {
  id: number;
  name: string;
  variables: Variable[];

  constructor(id: number, name: string, variables: Variable[]) {
    this.id = id;
    this.name = name;
    this.variables = variables;
  }
}
