import {ScenarioStep} from './scenario-step';

export interface TestCase {
  id: number;
  name: string;
  userId: number;
  projectId: number;
  dataSetId: number;
  testScenarioId: number;
  scenarioStepsWithData: ScenarioStep[];
}
