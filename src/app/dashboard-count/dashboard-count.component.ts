import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-count.component.html',
  styleUrls: ['./dashboard-count.component.css']
})

export class DashboardCountComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {
  }
  userCount = 0;
  adminCount = 0;
  managerCount = 0;
  engineerCount = 0;
  ngOnInit(): void {
    this.dashboardService.getUserCount().subscribe(data => {
      this.userCount = data;
    }, error => {
      console.log(error);
    });

    this.dashboardService.getAdminCount().subscribe(data => {
      this.adminCount = data;
    }, error => {
      console.log(error);
    });

    this.dashboardService.getManagerCount().subscribe(data => {
      this.managerCount = data;
    }, error => {
      console.log(error);
    });

    this.dashboardService.getEngineerCount().subscribe(data => {
      this.engineerCount = data;
    }, error => {
      console.log(error);
    });


}}
