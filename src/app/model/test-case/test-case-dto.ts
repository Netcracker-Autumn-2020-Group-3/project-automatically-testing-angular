import {ScenarioStep} from './scenario-step';
import {TestCase} from './test-case';

export interface TestCaseDto {
  testCase: TestCase;
  scenarioStepsWithData: ScenarioStep[];
}
