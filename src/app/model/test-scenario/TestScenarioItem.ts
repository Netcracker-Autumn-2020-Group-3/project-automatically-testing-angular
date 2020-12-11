export class TestScenarioItem {
  id: number;
  type: string;
  priority: number;
  contextInstanceName: string | null;
  items: TestScenarioItem[];
}
