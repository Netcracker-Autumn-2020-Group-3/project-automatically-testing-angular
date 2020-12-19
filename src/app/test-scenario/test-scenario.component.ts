import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-scenario',
  templateUrl: './test-scenario.component.html',
  styleUrls: ['./test-scenario.component.css']
})
export class TestScenarioComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

}
